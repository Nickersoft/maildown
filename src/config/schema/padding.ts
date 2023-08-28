import { z } from "zod";

import { px } from "./utils.ts";

export const PaddingValue = z
  .number()
  .transform(px)
  .default(0);

export const PaddingShorthand = z
  .number()
  .default(0)
  .transform((value) => ({
    top: px(value),
    bottom: px(value),
    left: px(value),
    right: px(value),
  }));

export const Padding = z
  .object({
    top: PaddingValue,
    bottom: PaddingValue,
    left: PaddingValue,
    right: PaddingValue,
  })
  .default({})
  .or(PaddingShorthand);

export type Padding = z.infer<typeof Padding>;
