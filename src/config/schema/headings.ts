import { z } from "zod";

import { Typography } from "./typography.ts";

export const Headings = z.object({
  h1: Typography.default({
    font: {
      family: ["Inter", "sans-serif"],
      size: "4xl",
    },
    padding: {
      top: 0,
      bottom: 3,
    },
  }),
  h2: Typography.default({
    font: {
      family: ["Inter", "sans-serif"],
      size: "4xl",
    },
    padding: {
      top: 0,
      bottom: 3,
    },
  }),
  h3: Typography.default({
    font: {
      family: ["Inter", "sans-serif"],
      size: "4xl",
    },
    padding: {
      top: 0,
      bottom: 3,
    },
  }),
  h4: Typography.default({
    font: {
      family: ["Inter", "sans-serif"],
      size: "4xl",
    },
    padding: {
      top: 0,
      bottom: 3,
    },
  }),
  h5: Typography.default({
    font: {
      family: ["Inter", "sans-serif"],
      size: "4xl",
    },
    padding: {
      top: 0,
      bottom: 3,
    },
  }),
  h6: Typography.default({
    font: {
      family: ["Inter", "sans-serif"],
      size: "4xl",
    },
    padding: {
      top: 0,
      bottom: 3,
    },
  }),
});
