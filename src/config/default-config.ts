import type { ConfigSchema } from "./schema/mod.ts";

export const defaultConfig: ConfigSchema = {
  layouts: "layouts",
  theme: {
    fontSize: 16,
    divider: {},
    headings: {
      h1: {
        color: "#FF0000",
      },
      h2: {},
      h3: {},
      h4: {},
      h5: {},
      h6: {},
    },
  },
};
