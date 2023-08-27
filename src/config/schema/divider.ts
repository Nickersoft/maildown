import { z } from "zod";

import { Color } from "./color.ts";
import { Padding } from "./padding.ts";
import { Border } from "./border.ts";

export const Divider = z.object({
  align: z.enum(["left", "right", "center"]).default("center"),
  containerBackgroundColor: Color,
  border: Border,
  padding: Padding,
  width: z.union([z.number(), z.string()]).default("100%"),
}).partial();
