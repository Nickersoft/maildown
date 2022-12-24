import { MarkMailConfig } from './get-config';

export const defaultConfig: MarkMailConfig = {
  layoutDir: 'layouts',
  extension: '.email.md',
  headFile: 'head.mjml',
  fileHeader: `
/*******************************
    THIS FILE IS GENERATED
        DO NOT MODIFY!!!!
*******************************/
`,
};
