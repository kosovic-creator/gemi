"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"
import { Locale } from "@/lib/i18n/settings"
import { getServerTranslation } from "@/lib/i18n/server"

export async function registerUser(formData: FormData, preferredLocale?: Locale) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const locale = preferredLocale || (formData.get("locale") as Locale) || "mn"

  const { t } = await getServerTranslation(locale)

  if (!email || !password) {
    return {
      errorKey: "errorRequiredFields" as const,
      error: t("errorRequiredFields"),
    }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return {
      errorKey: "errorUserExists" as const,
      error: t("errorUserExists"),
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      name,
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
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const locale = preferredLocale || (formData.get("locale") as Locale) || "mn"
  const { t } = await getServerTranslation(locale)

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


