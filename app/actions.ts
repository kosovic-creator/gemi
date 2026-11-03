"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"
import { Locale } from "@/lib/i18n/translations"

export async function registerUser(formData: FormData, preferredLocale?: Locale) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const locale = preferredLocale || (formData.get("locale") as Locale) || "mn"

  if (!email || !password) {
    return {
      errorKey: "errorRequiredFields" as const,
      error: locale === "en" ? "Email and password are required." : "Email i lozinka su obavezni.",
    }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return {
      errorKey: "errorUserExists" as const,
      error: locale === "en" ? "A user with this email already exists." : "Korisnik sa ovim email-om već postoji.",
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
    success: locale === "en" ? "Registration successful! You can now sign in." : "Uspešna registracija! Možete se prijaviti.",
  }
}

export async function loginUser(formData: FormData, preferredLocale?: Locale) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const locale = preferredLocale || (formData.get("locale") as Locale) || "mn"

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
            error: locale === "en" ? "Invalid email or password." : "Pogrešan email ili lozinka.",
          }
        default:
          return {
            errorKey: "errorGeneric" as const,
            error: locale === "en" ? "An error occurred." : "Došlo je do greške.",
          }
      }
    }
    throw error
  }
}

export async function logoutUser() {
  await signOut({ redirectTo: "/" })
}

