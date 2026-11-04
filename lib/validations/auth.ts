import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "errorEmailRequired" })
    .email({ message: "errorInvalidEmail" }),
  password: z
    .string()
    .min(1, { message: "errorPasswordRequired" })
    .min(6, { message: "errorPasswordTooShort" }),
})

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || val.length >= 2, {
      message: "errorNameTooShort",
    }),
  email: z
    .string()
    .trim()
    .min(1, { message: "errorEmailRequired" })
    .email({ message: "errorInvalidEmail" }),
  password: z
    .string()
    .min(1, { message: "errorPasswordRequired" })
    .min(6, { message: "errorPasswordTooShort" }),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
