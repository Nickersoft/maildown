import { Handlers, State } from "mdast-util-to-hast";

// @deno-types="npm:@types/mdast@^3"
import { Heading, Image, Paragraph, ThematicBreak } from "mdast";

export const handlers: Handlers = {
  heading: (state: State, node: Heading) => ({
    type: "element",
    tagName: "mj-text",
    properties: {
      "mj-class": `h${node.depth}`,
      "line-height": "48px",
      "font-family": "Montserrat",
    },
    children: [{
      type: "element",
      tagName: `h${node.depth}`,
      properties: {},
      children: state.all(node),
    }],
  }),
  paragraph: (state: State, node: Paragraph) => ({
    type: "element",
    tagName: "mj-text",
    properties: {
      "line-height": "27px",
    },
    children: state.all(node),
  }),
  thematicBreak: (state: State, node: ThematicBreak) => ({
    type: "element",
    tagName: "mj-divider",
    properties: {},
    children: state.all(node),
  }),
  image: (state: State, node: Image) => {
    const title = node.url;
    const [alt, w, h] = title.split(",").map((x) => x.trim());

    // console.log(node);

    return {
      type: "element",
      tagName: "mj-divider",
      properties: {
        "line-height": "27px",
      },
      children: state.all(node),
    };
  },
};
