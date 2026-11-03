export type Locale = "mn" | "en"

export const defaultLocale: Locale = "mn"

export const translations = {
  mn: {
    // Navigacija & Opšte
    appTitle: "Gemi - Početna",
    appDescription: "Moderna aplikacija sa autentifikacijom i lokalizacijom",
    language: "Jezik",
    montenegrin: "Crnogorski",
    english: "Engleski",
    loading: "Učitavanje...",

    // Početna strana
    welcomeTitle: "Dobrodošli u Gemi",
    signedInAs: "Prijavljeni ste kao:",
    signOut: "Odjavi se",
    signIn: "Prijava",
    register: "Registracija",

    // Prijava (Login)
    loginTitle: "Gemi - Prijava",
    welcomeBack: "Dobrodošli nazad",
    loginSubtitle: "Unesite svoje podatke za prijavu na nalog",
    emailLabel: "Email adresa",
    emailPlaceholder: "ime@example.com",
    passwordLabel: "Lozinka",
    passwordPlaceholder: "••••••••",
    showPassword: "Prikaži lozinku",
    hidePassword: "Sakrij lozinku",
    signInButton: "Prijavi se",
    signingIn: "Prijavljivanje...",
    noAccount: "Nemate nalog?",
    signUpLink: "Registrujte se",

    // Registracija (Register)
    registerTitle: "Gemi - Registracija",
    createAccount: "Kreirajte nalog",
    registerSubtitle: "Unesite podatke da biste započeli",
    nameLabel: "Ime i prezime",
    namePlaceholder: "Petar Petrović",
    signUpButton: "Registruj se",
    registering: "Registracija...",
    haveAccount: "Već imate nalog?",
    signInLink: "Prijavite se",

    // Poruke i greške
    errorRequiredFields: "Email i lozinka su obavezni.",
    errorUserExists: "Korisnik sa ovim email-om već postoji.",
    errorInvalidCredentials: "Pogrešan email ili lozinka.",
    errorGeneric: "Došlo je do greške.",
    successRegister: "Uspešna registracija! Možete se prijaviti.",
  },
  en: {
    // Navigation & General
    appTitle: "Gemi - Home",
    appDescription: "Modern application with authentication and localization",
    language: "Language",
    montenegrin: "Montenegrin",
    english: "English",
    loading: "Loading...",

    // Home page
    welcomeTitle: "Welcome to Gemi",
    signedInAs: "Signed in as:",
    signOut: "Sign out",
    signIn: "Sign in",
    register: "Register",

    // Login page
    loginTitle: "Gemi - Sign In",
    welcomeBack: "Welcome back",
    loginSubtitle: "Enter your details to sign in to your account",
    emailLabel: "Email address",
    emailPlaceholder: "name@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••",
    showPassword: "Show password",
    hidePassword: "Hide password",
    signInButton: "Sign in",
    signingIn: "Signing in...",
    noAccount: "Don't have an account?",
    signUpLink: "Sign up",

    // Register page
    registerTitle: "Gemi - Register",
    createAccount: "Create an account",
    registerSubtitle: "Enter your details to get started",
    nameLabel: "Full name",
    namePlaceholder: "John Doe",
    signUpButton: "Sign up",
    registering: "Registering...",
    haveAccount: "Already have an account?",
    signInLink: "Sign in",

    // Messages and errors
    errorRequiredFields: "Email and password are required.",
    errorUserExists: "A user with this email already exists.",
    errorInvalidCredentials: "Invalid email or password.",
    errorGeneric: "An error occurred.",
    successRegister: "Registration successful! You can now sign in.",
  },
} as const

export type TranslationKey = keyof typeof translations.mn

