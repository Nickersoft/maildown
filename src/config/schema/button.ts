import { z } from "zod";

import { Alignment } from "./alignment.ts";
import { Color } from "./color.ts";
import { Border, Borders } from "./border.ts";
import { Font } from "./font.ts";
import { Padding } from "./padding.ts";

export const Button = z.object({
  align: Alignment.default("center"),
  backgroundColor: Color.default("#414141"),
  rounding: z.number().default(3),
  color: Color.default("#ffffff"),
  containerBackgroundColor: Color,
  font: Font,
  height: z.number(),
  href: z.string().url(),
  borders: Borders,
  padding: Padding,
  rel: z.enum(["none", "nofollow", "noreferrer", "noopener"]).default("none"),
  target: z.enum(["_blank", "_self", "_parent", "_top"]).default("_blank"),
  textDecoration: z.enum(["underline", "overline", "line-through", "none"])
    .default("none"),
  title: z.string(),
  width: z.number(),
  textAlign: z.enum(["left", "right", "center", "justify-left"]),
  textTransform: z.enum(["uppercase", "lowercase", "capitalize", "none"]),
});
