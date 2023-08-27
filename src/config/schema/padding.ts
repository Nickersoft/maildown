import { z } from "zod";

export const Padding = z.object({
  top: z.number(),
  bottom: z.number(),
  left: z.number(),
  right: z.number(),
}).or(z.number());

export type Padding = z.infer<typeof Padding>;
