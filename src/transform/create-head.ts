import { ConfigSchema, Padding, Typography } from "../config/mod.ts";

function parsePadding(padding: Padding) {
  if (!padding) {
    return null;
  }

  let p = padding;

  if (Number.isInteger(padding)) {
    const str = `${padding}px`;

    return {
      top: str,
      bottom: str,
      left: str,
      right: str,
    };
  }
}

function createHeaderClass(depth: number, config: Typography) {
  //   color	color	text color	#000000
  // font-family	string	font	Ubuntu, Helvetica, Arial, sans-serif
  // font-size	px	text size	13px
  // font-style	string	normal/italic/oblique	n/a
  // font-weight	number	text thickness	n/a
  // line-height	px	space between the lines	1
  // letter-spacing	px,em	letter spacing	none
  // height	px	The height of the element	n/a
  // text-decoration	string	underline/overline/line-through/none	n/a
  // text-transform	string	uppercase/lowercase/capitalize	n/a
  // align	string	left/right/center/justify	left
  // container-background-color	color	inner element background color	n/a
  // padding	px	supports up to 4 parameters	10px 25px
  // padding-top	px	top offset	n/a
  // padding-bottom	px	bottom offset	n/a
  // padding-left	px	left offset	n/a
  // padding-right	px	right offset	n/a
  // css-class	string	class name, added to the root HTML element created
  const {
    color,
    font,
    leading,
    tracking,
    height,
    textDecoration,
    textTransform,
    align,
    containerBackgroundColor,
    padding,
  } = config;

  const properties = {
    color,
    align,
    height,
    "font-family": font?.family,
    "font-size": font?.size,
    "font-style": font?.style,
    "font-weight": font?.weight,
    "line-height": leading,
    "letter-spacing": tracking,
    "text-decoration": textDecoration,
    "text-transform": textTransform,
    "container-background-color": containerBackgroundColor,
  };
}
export function createHead(config: ConfigSchema) {
}
