import * as z from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must have at least 3 characters." })
    .max(6, { message: "Username must have maximum 6 characters." }),
  email: z.email().nonempty(),
  password: z
    .string()
    .min(6, { message: "Password must have at least 6 characters." }),
});

export const loginSchema = z.object({
  email: z.email().nonempty(),
  password: z
    .string()
    .min(6, { message: "Password must have at least 6 characters." }),
});
