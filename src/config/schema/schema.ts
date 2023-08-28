import { z } from "zod";

import { Divider } from "./divider.ts";
import { Headings } from "./headings.ts";
import { px } from "./utils.ts";

const BaseSize = z.number().transform(px);

const Layouts = z.string().default("layouts");

export const schema = z.object({
  layouts: Layouts,
  fonts: z.array(z.object({
    name: z.string(),
    url: z.string().url(),
  })).default([]),
  theme: z.object({
    baseSize: BaseSize.default(16),
    divider: Divider.default({}),
    headings: Headings.default({}),
  }).default({}),
});

export type ConfigSchema = z.infer<typeof schema>;
