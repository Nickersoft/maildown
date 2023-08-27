import { z } from "zod";

import { Typography } from "./typography.ts";
import { Divider } from "./divider.ts";

export const schema = z.object({
  layouts: z.string(),
  theme: z.object({
    fontSize: z.number(),
    divider: Divider,
    headings: z.object({
      h1: Typography,
      h2: Typography,
      h3: Typography,
      h4: Typography,
      h5: Typography,
      h6: Typography,
    }),
  }),
});

export type ConfigSchema = z.infer<typeof schema>;
