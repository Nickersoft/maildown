import { LilconfigResult, lilconfig } from 'lilconfig';

import { defaultConfig } from './default-config';

export interface MailDownConfig {
  layoutDir: string;
  headFile: string;
  extension: string;
  fileHeader: string;
}

let config: LilconfigResult | null;

export async function getConfigRaw() {
  if (!config) {
    config = await lilconfig('maildown').search();
  }
  return config;
}

export async function getConfig(): Promise<MailDownConfig> {
  const result = await getConfigRaw();
  return { ...defaultConfig, ...(result?.config ?? {}) };
}

export function getConfigPath() {
  return getConfigRaw().then((result) => result?.filepath ?? null);
}
