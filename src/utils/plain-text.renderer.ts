import type { Renderer } from 'marked';

const whitespaceDelimiter = '\n';

export const renderer: Renderer = {
  options: {},
  checkbox: (checked) => (checked ? '[X]' : '[ ]'),
  heading: (text) => text,
  paragraph: (text) => whitespaceDelimiter + text + whitespaceDelimiter,
  hr: () => whitespaceDelimiter + whitespaceDelimiter,
  image: (src, _, title) => title,
  code: (code, lang, escaped) =>
    whitespaceDelimiter + whitespaceDelimiter + code + whitespaceDelimiter + whitespaceDelimiter,
  blockquote: (quote) => '\t' + quote + whitespaceDelimiter,
  html: (html) => html,
  list: (body, ordered) => body,
  listitem: (text) => '\t' + text + whitespaceDelimiter,
  table: (header, body) => whitespaceDelimiter + header + whitespaceDelimiter + body + whitespaceDelimiter,
  tablerow: (content) => content + whitespaceDelimiter,
  tablecell: (content, flags) => content + '\t',
  strong: (text) => text,
  em: (text) => text,
  codespan: (text) => text,
  br: () => whitespaceDelimiter + whitespaceDelimiter,
  del: (text) => text,
  link: (href, title, text) => text,
  text: (text) => text,
};
