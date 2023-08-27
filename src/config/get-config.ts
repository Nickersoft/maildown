import { deepMerge } from "@std/collections/deep_merge.ts";
import { lilconfig } from "lilconfig";

import { defaultConfig } from "./default-config.ts";

export async function getConfig() {
  const result = await lilconfig("maildown").search();
  return deepMerge(defaultConfig, result?.config ?? {});
}
