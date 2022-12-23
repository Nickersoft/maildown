import type { Renderer } from 'marked';

export const renderer: Partial<Renderer> = {
  heading: (text, level) => `
    <mj-text line-height="48px" font-family="Montserrat, Helvetica, Arial, sans-serif">
      <h${level}>${text}</h${level}>
    </mj-text>
  `,
  paragraph: (text) => {
    if (text.trim().startsWith('<mj-image')) return text;
    return `<mj-text line-height="27px"><p>${text}</p></mj-text>`;
  },
  hr: () => {
    return '<mj-divider />';
  },
  image: (src, _, title) => {
    const [alt, w, h] = title.split(',').map((x) => x.trim());

    let attributes: {
      src: string | null;
      alt: string;
      width?: string;
      height?: string;
    } = { src, alt };

    if (w) {
      attributes['width'] = `${w}px`;
    }

    if (h) {
      attributes['height'] = `${h}px`;
    }

    const attrStr = Object.entries(attributes)
      .map(([k, v]) => `${k}="${v}"`)
      .join(' ');

    return `<mj-image ${attrStr}></mj-image>`;
  },
};
