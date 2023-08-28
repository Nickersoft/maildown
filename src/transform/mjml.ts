import { DEFAULT_TEMPLATE } from "../constants.ts";

// @deno-types="npm:@types/mjml@^4"
import parseMJML from "mjml";

import { mjmlProcessor } from "../processors/mod.ts";
import { ConfigSchema } from "../config/mod.ts";
import { createHead } from "./head.ts";

export function renderLayout(layout: string, content: string) {
  const slots = /<slot\s*\/>/g.exec(layout);

  if (!slots) {
    return layout;
  }

  if (slots.length > 1) {
    throw new Error("Only one slot is allowed");
  }

  return layout.replace(slots[0], content);
}

export function renderMJML(content: string, config: ConfigSchema) {
  const rendered = renderLayout(
    DEFAULT_TEMPLATE,
    mjmlProcessor.processSync(content).toString(),
  );

  const mjml = `
  <mjml>
    <mj-head>
      ${createHead(config)}
    </mj-head>
    <mj-body>
      ${rendered}
    </mj-body>
  </mjml>
`;

  return mjml.replace(/\n\s*/g, "").trim();
}

export function mjmlToHTML(mjml: string) {
  return parseMJML(mjml).html;
}
