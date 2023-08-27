import * as z from "zod";

export const Alignment = z.enum(["left", "right", "center"]);
