"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"
import { Locale } from "@/lib/i18n/settings"
import { getServerTranslation } from "@/lib/i18n/server"
import { loginSchema, registerSchema } from "@/lib/validations/auth"
import { TranslationKey } from "@/lib/i18n/resources"

export async function registerUser(formData: FormData, preferredLocale?: Locale) {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  }
  const locale = preferredLocale || (formData.get("locale") as Locale) || "mn"

  const { t } = await getServerTranslation(locale)

  const validation = registerSchema.safeParse(rawData)
  if (!validation.success) {
    const flattened = validation.error.flatten()
    const firstIssueKey = (validation.error.issues[0]?.message || "errorGeneric") as TranslationKey
    const fieldErrors: Record<string, string> = {}
    for (const [field, msgs] of Object.entries(flattened.fieldErrors)) {
      if (msgs && msgs[0]) {
        fieldErrors[field] = t(msgs[0] as TranslationKey)
      }
    }

    return {
      errorKey: firstIssueKey,
      error: t(firstIssueKey),
      fieldErrors,
    }
  }

  const { name, email, password } = validation.data

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return {
      errorKey: "errorUserExists" as const,
      error: t("errorUserExists"),
      fieldErrors: {
        email: t("errorUserExists"),
      },
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      name: name && name.trim().length > 0 ? name.trim() : null,
      email,
      password: hashedPassword,
    },
  })

  return {
    successKey: "successRegister" as const,
    success: t("successRegister"),
  }
}

export async function loginUser(formData: FormData, preferredLocale?: Locale) {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  }
  const locale = preferredLocale || (formData.get("locale") as Locale) || "mn"
  const { t } = await getServerTranslation(locale)

  const validation = loginSchema.safeParse(rawData)
  if (!validation.success) {
    const flattened = validation.error.flatten()
    const firstIssueKey = (validation.error.issues[0]?.message || "errorGeneric") as TranslationKey
    const fieldErrors: Record<string, string> = {}
    for (const [field, msgs] of Object.entries(flattened.fieldErrors)) {
      if (msgs && msgs[0]) {
        fieldErrors[field] = t(msgs[0] as TranslationKey)
      }
    }

    return {
      errorKey: firstIssueKey,
      error: t(firstIssueKey),
      fieldErrors,
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
            errorKey: "errorInvalidCredentials" as const,
            error: t("errorInvalidCredentials"),
          }
        default:
          return {
            errorKey: "errorGeneric" as const,
            error: t("errorGeneric"),
          }
      }
    }
    throw error
  }
}

export async function logoutUser() {
  await signOut({ redirectTo: "/" })
}



