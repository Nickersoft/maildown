import { unified } from "unified";

import remarkRehype from "remark-rehype";
import parse from "remark-parse";
import frontmatter from "remark-frontmatter";
import emoji from "remark-emoji";
import stringify from "rehype-stringify";

import { handlers } from "./handlers.ts";

export const mjmlProcessor = unified()
  .use(parse)
  .use(emoji)
  // @ts-ignore: For some reason remark-emoji causes a type error here even though it runs fine?
  .use(frontmatter)
  .use(remarkRehype, { handlers })
  .use(stringify);
