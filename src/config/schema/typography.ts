import { z } from "zod";

import { Color } from "./color.ts";
import { Padding } from "./padding.ts";
import { Font } from "./font.ts";
import { rem } from "./utils.ts";

const TextTransform = z.enum([
  "uppercase",
  "lowercase",
  "capitalize",
  "none",
]);

const TextDecoration = z.enum([
  "underline",
  "overline",
  "line-through",
  "none",
]);

export const Typography = z.object({
  color: Color.default("#000000"),
  font: Font,
  leading: z.number().default(1).transform(rem),
  tracking: z.number().default(1),
  height: z.number().optional(),
  textDecoration: TextDecoration.default("none"),
  textTransform: TextTransform.default("none"),
  align: z.enum(["left", "right", "center", "justify-left"]).default("left"),
  containerBackgroundColor: Color.optional(),
  padding: Padding.default(0),
});

export type Typography = z.infer<typeof Typography>;
