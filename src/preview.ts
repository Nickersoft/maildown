import open from "open";

import { mjmlToHTML, renderMJML } from "./transform/mjml.ts";
import { getConfig } from "./config/mod.ts";

export async function preview(markdown: string) {
  console.log(await getConfig());
  const html = mjmlToHTML(renderMJML(markdown, await getConfig()));
  // const outputPath = await Deno.makeTempFile({ suffix: ".html" });
  // const encoder = new TextEncoder();

  // await Deno.writeFile(outputPath, encoder.encode(html));

  // await open(outputPath, { wait: true });

  // console.log(html);
}
