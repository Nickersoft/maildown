import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { compile, config as etaConfig } from 'eta';

import { getConfig, resolvePathValue } from '../config';

export async function getLayout(name: string | undefined) {
  const { layoutDir, headFile } = await getConfig();

  const absoluteHeadFile = await resolvePathValue(headFile);
  const absoluteLayoutDir = await resolvePathValue(layoutDir);

  let layout = '{{=it.body}}';

  if (name) {
    layout = await readFile(join(absoluteLayoutDir, `${name}.mjml`), 'utf-8');
  }

  const template = `
    <mjml>
      <mj-head>
        ${existsSync(absoluteHeadFile) ? `<mj-include path="${absoluteHeadFile}" />` : ''}
      </mj-head>
      <mj-body>
        ${layout}
      </mj-body>
    </mjml>
      `;

  return compile(template, { ...etaConfig, autoEscape: false });
}
