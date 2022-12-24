import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

import { compile, config as etaConfig } from 'eta';

import { getConfig, getConfigPath } from '../config';

export async function getLayout(name: string | undefined) {
  const configPath = await getConfigPath();

  const { layoutDir, headFile } = await getConfig();

  let absoluteHeadFile: string | undefined;

  if (configPath && headFile) {
    absoluteHeadFile = resolve(dirname(configPath), headFile);

    if (!existsSync(absoluteHeadFile)) {
      throw new Error(`Could not find specified head file: "${absoluteHeadFile}"!`);
    }
  }

  try {
    let layout = '{{it.body}}';

    if (name) {
      layout = await readFile(join(layoutDir, `${name}.mjml`), 'utf-8');
    }

    const template = `
    <mjml>
      <mj-head>
        ${absoluteHeadFile ? `<mj-include path="${absoluteHeadFile}" />` : ''}
      </mj-head>
      <mj-body>
        ${layout}
      </mj-body>
    </mjml>
      `;

    return compile(template, { ...etaConfig, autoEscape: false });
  } catch (e) {
    throw new Error(`Couldn't find layout file with name "${name}.mjml"!`);
  }
}
