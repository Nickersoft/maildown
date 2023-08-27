import { z } from "zod";

import { Color } from "./color.ts";

export const Border = z.object({
  color: Color,
  style: z.enum(["dashed", "dotted", "solid"]).default("solid"),
  width: z.number(),
});

export const Borders = z.object({
  left: Border,
  right: Border,
  top: Border,
  bottom: Border,
});
