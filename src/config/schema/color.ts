import { z } from "zod";

const rgbaRegex = /^rgba?\((\s*\d+%?\s*,){3}\s*(\d+(\.\d+)?%?)\s*\)$/i;

const hexRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/i;

export const Color = z.string().regex(hexRegex).or(z.string().regex(rgbaRegex));
