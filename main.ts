// @deno-types="npm:@types/mjml@^4"
import mjml from "mjml";

import { renderMJML } from "./src/transform/mjml.ts";
import { mjmlProcessor } from "./src/transform/processors.ts";
import { preview } from "./src/preview.ts";

const md = `
# Hello there
## poop
Bitch 

:tada:

---

![sdf](google.com/hi.jpg "w=")
`;

await preview(md);
