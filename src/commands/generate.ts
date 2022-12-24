import { writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';

import { Command } from 'commander';
import glob from 'glob';
import ora from 'ora';
import prettier from 'prettier';
import { camel as camelCase, group } from 'radash';

import { MailDownConfig, getConfig } from '../config';
import { mdTemplateToHTML } from '../utils/md-to-html';

const { format, resolveConfig: resolvePrettierConfig, resolveConfigFile: resolvePrettierConfigFile } = prettier;

const functionRegex = /function anonymous\(([\s\SA-Za-z]+?)\)/gim;

function getEmails() {
  // Glob all .email.md files in the codebase
  const files = glob.sync(join('**', '*.email.md'));
  // Group these files by their secondary parent directory (parent -> parent)
  return group(files, (f) => dirname(dirname(f)));
}

async function generateCodeFromPath(path: string) {
  // Create compiler functions
  const { html: htmlFunc, text: textFunc, subject, templates } = await mdTemplateToHTML(path);

  // Stringify them
  const htmlFuncStr = htmlFunc.toString().replace(functionRegex, '($1) =>');
  const textFuncStr = textFunc.toString().replace(functionRegex, '($1) =>');

  // Extract the language code from the path
  const lang = basename(dirname(path));

  // Throw an error if we found an invalid language code
  if (lang.length !== 2) {
    const errMsg = `Invalid language identifier: ${lang}. Make sure every template is in a language-specific directory (en, fr, ja, etc.)`;
    throw new Error(errMsg);
  }

  return `${lang}: { html: ${htmlFuncStr}, text: ${textFuncStr}, ${subject ? `subject: "${subject}"` : ''} },`;
}

async function writeIndexFile(dir: string, fileContents: string) {
  const outFile = join(dir, 'index.js');

  const prettierConfigFile = await resolvePrettierConfigFile();

  let content = fileContents;

  if (prettierConfigFile !== null) {
    const prettierConfig = resolvePrettierConfig(prettierConfigFile);
    content = format(fileContents, { parser: 'typescript', ...prettierConfig });
  }

  await writeFile(outFile, content);
}

async function generateIndex(dir: string, files: string[], config: MailDownConfig) {
  // Group each file by name, where the value is an array of all localized versions
  // of the file
  const fileGroups = group(files, (f) => camelCase(basename(f, config.extension)));

  let js = '';

  // For each file in our map
  for (const file in fileGroups) {
    js += `const ${file} = {`;

    // Iterate through each localized file
    for (const path of fileGroups[file] ?? []) {
      js += await generateCodeFromPath(path);
    }

    js += '};\n\n';
  }

  js += `\n\nexport { ${Object.keys(fileGroups).join(',')} }`;

  const fileContent = [config.fileHeader, js].join('\n\n');

  await writeIndexFile(dir, fileContent);
}

const Generate = new Command('generate').action(async function () {
  const loader = ora('Generating templates...').start();

  // Find and load the config file
  const config = await getConfig();

  // Retrieve the emails as a map of their parent directories to their children
  const emails = getEmails();

  // Traverse over each email in the map
  await Promise.all(
    Object.entries(emails).map(async ([parentDir, files = []]) => {
      return generateIndex(parentDir, files, config);
    }),
  );

  loader.succeed('Finished!');
});

export { Generate };
