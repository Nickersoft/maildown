import { lilconfig } from "lilconfig";

import { schema } from "./mod.ts";

export async function getConfig() {
  const result = await lilconfig("maildown").search();
  return schema.parse(result?.config ?? {});
}
