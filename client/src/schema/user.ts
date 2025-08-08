import * as z from "zod";

export const emailUpdateSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }).nonempty(),
});

export const nameUpdateSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must have at least 3 characters." })
    .max(6, { message: "Name must have maximum 6 characters." }),
});
