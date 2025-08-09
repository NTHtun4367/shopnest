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

export const passwordUpdateSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: "Old password must have at least 6 characters." }),
    newPassword: z
      .string()
      .min(6, { message: "New password must have at least 6 characters." }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Please enter new password again." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password are don't match.",
    path: ["confirmPassword"],
  });
