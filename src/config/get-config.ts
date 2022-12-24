import { lilconfig } from 'lilconfig';
import { assign } from 'radash';

export interface MarkMailConfig {
  layoutDir: string;
  headFile?: string;
  extension: string;
  fileHeader: string;
}

const defaultConfig: MarkMailConfig = {
  layoutDir: 'layouts',
  extension: '.email.md',
  fileHeader: `
/*******************************
    THIS FILE IS GENERATED
        DO NOT MODIFY!!!!
*******************************/
`,
};

export function getConfig() {
  return lilconfig('markmail')
    .search()
    .then((r) => ({
      ...defaultConfig,
      ...(r?.config ?? {}),
    }));
}
