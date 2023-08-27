import { deepMerge } from "@std/collections/deep_merge.ts";
import { lilconfig } from "lilconfig";

import { defaultConfig } from "./default-config.ts";
import { schema } from "./mod.ts";

export async function getConfig() {
  const result = await lilconfig("maildown").search();
  return schema.parse(deepMerge(defaultConfig, result?.config ?? {}));
}
