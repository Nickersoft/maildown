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
