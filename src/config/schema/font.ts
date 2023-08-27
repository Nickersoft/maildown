import { z } from "zod";

export const Font = z.object({
  family: z.array(z.string()),
  size: z.number(),
  style: z.enum(["normal", "italic", "oblique", "none"]).default("none"),
  weight: z.number(),
});
