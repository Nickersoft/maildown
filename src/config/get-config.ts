import { defaultConfig } from './default-config';
import { LilconfigResult, lilconfig } from 'lilconfig';

export interface MarkMailConfig {
  layoutDir: string;
  headFile: string;
  extension: string;
  fileHeader: string;
}

let config: LilconfigResult | null;

export async function getConfigRaw() {
  if (!config) {
    config = await lilconfig('markmail').search();
  }
  return config;
}

export async function getConfig() {
  const result = await getConfigRaw();
  return { ...defaultConfig, ...(result?.config ?? {}) };
}

export function getConfigPath() {
  return getConfigRaw().then((result) => result?.filepath ?? null);
}
