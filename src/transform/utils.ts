import { filterValues } from "@std/collections/filter_values.ts";

export function compact(obj: Record<string, unknown>) {
  return filterValues(obj, (v) => !!v);
}

export function isNumber(value: any): value is number {
  return Number.isInteger(value);
}

export function convertValue(value: number, unit: "px" | "em" | "rem") {
  if (unit === "px") {
    return `${value}${unit}`;
  }
  return `${value / 4}${unit}`;
}

export function range(min: number, max: number) {
  return new Array(max - min + 1).fill(0).map((_, i) => i + min);
}
