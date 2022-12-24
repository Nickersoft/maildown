
import { dirname, resolve } from "node:path";
import {   getConfigPath } from ".";

export async function resolvePathValue(path:string) {
  const configPath = await getConfigPath();  
  return resolve(dirname(configPath??''), path);
}
