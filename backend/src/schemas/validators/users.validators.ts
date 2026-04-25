import z, { minLength, nonoptional } from "zod";

export const userSchema = z.object({
  name: z
    .string({ error: "Needs to be a string" })
    .min(3, "please enter at least 3 characters")
    .max(25, "username cant be larger tan 25 characters"),
  email: z.email(),
  password: z.string().max(255),
});

export type User = z.infer<typeof userSchema>;
