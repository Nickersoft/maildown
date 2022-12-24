import { MailDownConfig } from './get-config';

export const defaultConfig: MailDownConfig = {
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
