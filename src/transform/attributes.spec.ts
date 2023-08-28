import { describe, it } from "@std/testing/bdd.ts";
import { assertSnapshot } from "@std/testing/snapshot.ts";

import { createHeaderClass } from "./attributes.ts";

describe("createHeaderClass", () => {
  it("creates a header class correctly", async (t) => {
    await assertSnapshot(
      t,
      createHeaderClass(1, {
        color: "red",
        font: {
          family: "sans-serif, monospace",
          size: {
            fontSize: "1rem",
            lineHeight: "2rem",
          },
          style: "italic",
          weight: 600,
        },
        leading: "2rem",
        tracking: 12,
        height: 1.5,
        textDecoration: "underline",
        textTransform: "uppercase",
        align: "left",
        containerBackgroundColor: "blue",
        padding: {
          top: "1rem",
          bottom: "1rem",
          left: "1rem",
          right: "1rem",
        },
      }),
    );
  });
});
