import z from "zod";

export const LoginSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .transform((email) => email.toLowerCase()),

  password: z.string(),
});

export type LoginData = z.infer<typeof LoginSchema>;
