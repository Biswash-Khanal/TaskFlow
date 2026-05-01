import z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" })
      .max(25, { message: "Name must be at most 25 characters long" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Name can only contain letters, numbers, and underscores",
      }),

    email: z
      .email({ message: "Invalid email address" })
      .transform((email) => email.toLowerCase()),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(128, { message: "Password must be at most 128 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),

    confirmPassword: z.string(),
  })
  .superRefine((formObject, ctx) => {
    if (formObject.password !== formObject.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords dont match",
        path: ["password"],
      });
      ctx.addIssue({
        code: "custom",
        message: "Passwords dont match",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterData = z.infer<typeof registerSchema>;
