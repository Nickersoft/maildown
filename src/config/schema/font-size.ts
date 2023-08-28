import { z } from "zod";

import { rem } from "./utils.ts";

const fontPresentMap = {
  "xs": [0.75, 1],
  "sm": [0.875, 1.25],
  "base": [1, 1.5],
  "xl": [1.25, 1.75],
  "2xl": [1.5, 2],
  "3xl": [1.875, 2.25],
  "4xl": [2.25, 2.5],
  "5xl": [3, 1],
  "6xl": [3.75, 1],
  "7xl": [4.5, 1],
  "8xl": [6, 1],
  "9xl": [8, 1],
};

export const FontSize = z
  .enum([
    "xs",
    "sm",
    "base",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "7xl",
    "8xl",
    "9xl",
  ])
  .transform((preset) => {
    const [fontSize, lineHeight] = fontPresentMap[preset];

    return {
      fontSize: rem(fontSize),
      lineHeight: rem(lineHeight),
    };
  });

export type FontSize = z.infer<typeof FontSize>;
