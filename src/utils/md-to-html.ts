import { readFile, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { promisify } from 'node:util';

import { compile, configure as configureEta, config as etaConfig, getConfig as getEtaConfig, parse } from 'eta';
import type { TemplateFunction } from 'eta/dist/types/compile.js';
import glob from 'glob';
import matter from 'gray-matter';
import { marked } from 'marked';
import mjml from 'mjml';
import emoji from 'node-emoji';

import { getConfig } from '../config';

import { getLayout } from './get-layout';
import { renderer } from './mjml.renderer';
import { renderer as plainText } from './plain-text.renderer';

const read = promisify(readFile);

marked.use({ renderer });
configureEta({
  tags: ['{{', '}}'],
  parse: {
    interpolate: '',
    exec: '!',
    raw: '~',
  },
});

export async function mdTemplateToHTML(file: string, isPreview: boolean = false) {
  const { layoutDir } = await getConfig();

  const contents = await read(file, 'utf-8');
  const frontmatter = matter(contents);
  const layoutName = frontmatter.data?.layout ?? 'default';
  const layout = await getLayout(layoutName);
  const toMJML = marked(emoji.emojify(frontmatter.content));
  const text = marked(emoji.emojify(frontmatter.content), { renderer: plainText });
  const toTemplate = await layout({ ...(frontmatter.data ?? {}), body: toMJML }, etaConfig);
  const toHTML = mjml(toTemplate, { filePath: layoutDir }).html;
  const subjectLine = frontmatter?.data?.subject;

  return {
    html: compile(toHTML, etaConfig),
    text: compile(text, etaConfig),
    subject: subjectLine ? emoji.emojify(subjectLine) : undefined,
    preview: frontmatter.data?.preview ?? {},
    templates: {
      html: toHTML,
      text,
    },
  };
}
