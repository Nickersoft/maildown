import { z } from "zod";

import { Color } from "./color.ts";
import { Padding } from "./padding.ts";
import { Border } from "./border.ts";

export const Divider = z.object({
  align: z.enum(["left", "right", "center"]).default("center"),
  containerBackgroundColor: Color.optional(),
  border: Border.default({
    style: "solid",
    color: "#000000",
    width: 1,
  }),
  padding: Padding.default(0),
  width: z.union([z.number(), z.string()]).default("100%"),
});
