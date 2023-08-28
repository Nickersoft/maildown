import { ConfigSchema } from "../config/mod.ts";
import { createAttributes } from "./attributes.ts";

export function createHead(config: ConfigSchema) {
  return `
    <mj-attributes>
      ${createAttributes(config)}
    </mj-attributes>
  `;
}
