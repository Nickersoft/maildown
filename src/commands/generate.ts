import { readFile, writeFile } from 'node:fs';
import { basename, dirname, join } from 'node:path';

import { Command } from 'commander';
import glob from 'glob';
import { format } from 'prettier';
import { camel as camelCase } from 'radash';
import { promisify } from 'util';

import { mdTemplateToHTML } from '../utils/md-to-html';

const write = promisify(writeFile);
const read = promisify(readFile);

async function action() {
  // Glob all .email.md files in the codebase
  const files = glob.sync(join('..', '{apps,libs}', '**', '*.email.md'));

  // Group these files by their secondary parent directory (parent -> parent)
  const grouped = files.reduce((acc, v) => {
    const parentDir = dirname(dirname(v));
    acc[parentDir] = [...(acc[parentDir] ?? []), v];
    return acc;
  }, {} as Record<string, string[]>);

  // Traverse over each entry in the map
  const traverse = Object.entries(grouped).map(async ([parentDir, files]) => {
    // Group each file by name, where the value is an array of all localized versions of the file
    const fileGroups = files.reduce((acc, v) => {
      const file = camelCase(basename(v, '.email.md'));
      acc[file] = [...(acc[file] ?? []), v];
      return acc;
    }, {} as Record<string, string[]>);

    let js = '';

    // For each file in our map
    for (const file in fileGroups) {
      let fileMap = `const ${file} = {`;

      // Iterate through each localized version
      for (const path of fileGroups[file]) {
        // Create compiler functions
        const { html: htmlFunc, text: textFunc, subject } = await mdTemplateToHTML(path);

        // Stringify them
        const htmlFuncStr = htmlFunc.toString().replace(/function anonymous\(([\s\SA-Za-z]+?)\)/gim, '($1) =>');
        const textFuncStr = textFunc.toString().replace(/function anonymous\(([\s\SA-Za-z]+?)\)/gim, '($1) =>');

        // Extract the language code from the path
        const lang = basename(dirname(path));

        if (lang.length !== 2) {
          throw new Error(
            `Invalid language identifier: ${lang}. Make sure every template is in a language-specific directory (en, fr, ja, etc.)`,
          );
        }

        fileMap += `${lang}: {html: ${htmlFuncStr}, text: ${textFuncStr}, ${subject ? `subject: "${subject}"` : ''} }`;
      }

      fileMap += '};\n\n';
      js += fileMap;
    }

    js += `\n\nexport { ${Object.keys(fileGroups).join(',')} }`;

    const fileHeader = `
/*******************************
    THIS FILE IS GENERATED
        DO NOT MODIFY!!!!
*******************************/
        `;

    const fileContent = [fileHeader, js].join('\n\n');
    const outFile = join(parentDir, 'index.ts');
    const prettierConfig = JSON.parse(await read(join('..', '.prettierrc.json'), 'utf-8'));

    await write(outFile, format(fileContent, { parser: 'typescript', ...prettierConfig }));
  });

  await Promise.all(traverse);

  console.log('Generated HTML email templates!');
}

export const Generate = new Command('generate').action(action);
