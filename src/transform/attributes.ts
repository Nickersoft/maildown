import { mapKeys } from "@std/collections/map_keys.ts";
import { paramCase } from "case";

import { ConfigSchema, Typography } from "../config/mod.ts";
import { compact, range } from "./utils.ts";

export function createHeaderClass(depth: number, config: Typography) {
  const {
    color,
    font,
    leading,
    tracking,
    height,
    textDecoration,
    textTransform,
    align,
    containerBackgroundColor,
    padding,
  } = config;

  const properties = compact({
    ...mapKeys(font.size, paramCase),
    ...mapKeys(padding, (v) => `padding-${v}`),
    color,
    align,
    height,
    "font-family": font.family,
    "font-style": font.style,
    "font-weight": font.weight,
    "line-height": leading,
    "letter-spacing": tracking,
    "text-decoration": textDecoration,
    "text-transform": textTransform,
    "container-background-color": containerBackgroundColor,
  });

  const className = `h${depth}`;

  const propertyString = Object.entries(properties).map(([key, value]) =>
    `${key}="${value}"`
  ).join(" ");

  return `<mj-class name="${className}" ${propertyString} />`;
}

export function createAttributes(config: ConfigSchema) {
  // Header classes
  const headerClasses = range(1, 6).map((i) =>
    createHeaderClass(
      i,
      config.theme.headings[`h${i}` as keyof typeof config.theme.headings],
    )
  );

  return [headerClasses].join("\n");
}
