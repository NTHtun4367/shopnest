import * as z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must have at least 3 characters." })
    .max(6, { message: "Name must have maximum 6 characters." }),
  email: z.email({ message: "Please enter a valid email address." }).nonempty(),
  password: z
    .string()
    .min(6, { message: "Password must have at least 6 characters." }),
});

export const loginSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }).nonempty(),
  password: z
    .string()
    .min(6, { message: "Password must have at least 6 characters." }),
});
