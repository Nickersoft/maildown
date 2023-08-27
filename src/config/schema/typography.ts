import { z } from "zod";

import { Color } from "./color.ts";
import { Padding } from "./padding.ts";
import { Font } from "./font.ts";

export const Typography = z.object({
  color: Color,
  font: Font,
  leading: z.number(),
  tracking: z.string(),
  height: z.number(),
  textDecoration: z.enum(["underline", "overline", "line-through", "none"])
    .default("none"),
  textTransform: z.enum(["uppercase", "lowercase", "capitalize", "none"])
    .default(
      "none",
    ),
  align: z.enum(["left", "right", "center", "justify-left"]),
  containerBackgroundColor: Color,
  padding: z.union([z.number(), Padding]),
}).partial();

export type Typography = z.infer<typeof Typography>;
