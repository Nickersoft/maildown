import { z } from "zod";

import { FontSize } from "./font-size.ts";

export const Font = z.object({
  family: z.array(z.string()).transform((v) => v.join(", ")),
  size: FontSize,
  style: z.enum(["normal", "italic", "oblique", "none"]).default("none"),
  weight: z.number().default(400),
});

export type Font = z.infer<typeof Font>;
