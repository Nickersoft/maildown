import { readFile, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { promisify } from 'node:util';

import { compile, configure as configureEta, config as etaConfig, getConfig as getEtaConfig } from 'eta';
import type { TemplateFunction } from 'eta/dist/types/compile.js';
import glob from 'glob';
import matter from 'gray-matter';
import { marked } from 'marked';
import mjml from 'mjml';
import emoji from 'node-emoji';

import { renderer } from './mjml.renderer';
import { renderer as plainText } from './plain-text.renderer';
import { getConfig } from '../config';


const read = promisify(readFile);

marked.use({ renderer });

configureEta({ autoEscape: false, tags: ['(((', ')))'] });


export async function mdTemplateToHTML(file: string, isPreview: boolean = false) {
  const {layoutDir} = await getConfig();

  const layouts: Record<string, TemplateFunction> = glob.sync(join(layoutDir, '*')).reduce(
    (acc, file) => ({
      ...acc,
      [basename(file, '.mjml')]: compile(readFileSync(file, 'utf-8'), etaConfig),
    }),
    {},
  );

  const contents = await read(file, 'utf-8');
  const frontmatter = matter(contents);
  const layoutName = frontmatter.data?.layout ?? 'default';
  const template = layouts[layoutName];
  const toMJML = marked(emoji.emojify(frontmatter.content));
  const text = marked(emoji.emojify(frontmatter.content), { renderer: plainText });
  const toTemplate = template({ ...(frontmatter.data ?? {}), body: toMJML }, etaConfig);
  const toHTML = mjml(toTemplate, { filePath: layoutDir }).html;
  const subjectLine = frontmatter?.data?.subject;
  const compilationConfig: ReturnType<typeof getEtaConfig> = { ...etaConfig, tags: ['{{', '}}'], async: true };

  return {
    html: compile(toHTML, compilationConfig),
    text: compile(text, compilationConfig),
    subject: subjectLine ? emoji.emojify(subjectLine) : undefined,
    preview: frontmatter.data?.preview ?? {},
  };
}
