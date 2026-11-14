"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import bcrypt from "bcryptjs"
import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"
import { loginSchema, registerSchema } from "@/lib/validations/auth"
import { TranslationKey } from "@/lib/i18n/resources"

type LoginField = "email" | "password"
type RegisterField = LoginField | "name"

type ActionError<Field extends string> = {
  status: "error"
  errorKey: TranslationKey
  fieldErrors?: Partial<Record<Field, TranslationKey>>
}

type ActionSuccess = {
  status: "success"
  successKey: "successRegister"
}

type RegisterUserResult = ActionError<RegisterField> | ActionSuccess
type LoginUserResult = ActionError<LoginField>

function getFieldErrors<Field extends string>(
  fieldErrors: Record<string, string[] | undefined>,
): Partial<Record<Field, TranslationKey>> {
  const result: Partial<Record<Field, TranslationKey>> = {}

  for (const [field, messages] of Object.entries(fieldErrors)) {
    const message = messages?.[0]
    if (message) result[field as Field] = message as TranslationKey
  }

  return result
}

export async function registerUser(formData: FormData): Promise<RegisterUserResult> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const validation = registerSchema.safeParse(rawData)
  if (!validation.success) {
    const flattened = validation.error.flatten()
    const firstIssueKey = (validation.error.issues[0]?.message || "errorGeneric") as TranslationKey

    return {
      status: "error",
      errorKey: firstIssueKey,
      fieldErrors: getFieldErrors<RegisterField>(flattened.fieldErrors),
    }
  }

  const { name, email, password } = validation.data

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return {
      status: "error",
      errorKey: "errorUserExists" as const,
      fieldErrors: {
        email: "errorUserExists",
      },
    }
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name: name && name.trim().length > 0 ? name.trim() : null,
        email,
        password: hashedPassword,
      },
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return {
        status: "error",
        errorKey: "errorUserExists",
        fieldErrors: {
          email: "errorUserExists",
        },
      }
    }

    return {
      status: "error",
      errorKey: "errorGeneric",
    }
  }

  return {
    status: "success",
    successKey: "successRegister" as const,
  }
}

export async function loginUser(formData: FormData): Promise<LoginUserResult> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  }
  const validation = loginSchema.safeParse(rawData)
  if (!validation.success) {
    const flattened = validation.error.flatten()
    const firstIssueKey = (validation.error.issues[0]?.message || "errorGeneric") as TranslationKey
    return {
      status: "error",
      errorKey: firstIssueKey,
      fieldErrors: getFieldErrors<LoginField>(flattened.fieldErrors),
    }
  }

  const { email, password } = validation.data

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            status: "error",
            errorKey: "errorInvalidCredentials" as const,
          }
        default:
          return {
            status: "error",
            errorKey: "errorGeneric" as const,
          }
      }
    }
    throw error
  }

  return {
    status: "error",
    errorKey: "errorGeneric",
  }
}

export async function logoutUser() {
  await signOut({ redirectTo: "/" })
}



