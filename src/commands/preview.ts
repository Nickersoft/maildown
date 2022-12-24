import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, extname, join } from 'node:path';

import { Command } from 'commander';
import { config as etaConfig } from 'eta';
import open from 'open';
import ora from 'ora';

import { getConfig } from '../config';
import { mdTemplateToHTML } from '../utils/md-to-html';

async function preview(path: string, options: Record<string, string[]>) {
  const config = await getConfig();

  let vars = {};

  if (options.var) {
    vars = options.var.reduce((acc, v) => {
      const s = v.split('=');
      return { ...acc, [s[0]]: s[1] };
    }, {});
  }

  if (path && path.endsWith(config.extension)) {
    const loader = ora('Compiling template for preview...').start();

    const tmpDir = mkdtempSync(join(tmpdir(), 'markmail'));
    const compiler = await mdTemplateToHTML(path);
    const html = await compiler.html(vars, etaConfig);
    const bn = basename(path, extname(path));
    const output = join(tmpDir, `${bn}.html`);

    writeFileSync(output, html, 'utf-8');

    loader.text = 'Opening preview...';

    open(output);

    loader.succeed('Preview opened!');
  } else {
    console.log('Please specify a path to a markdown file');
  }
}

export const Preview = new Command('preview')
  .option('--var <pairs...>', 'variable to pass to the template')
  .arguments('<path>')
  .action(preview);
