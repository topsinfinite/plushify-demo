import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { db } from "./db"

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  appName: "Plushify",
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      credits: {
        type: "number",
        defaultValue: 10,
        required: true,
      },
      totalGenerations: {
        type: "number",
        defaultValue: 0,
        required: true,
      },
      creditsUsed: {
        type: "number",
        defaultValue: 0,
        required: true,
      },
      favoriteCount: {
        type: "number",
        defaultValue: 0,
        required: true,
      },
      platformRole: {
        type: "string",
        defaultValue: "user",
        required: true,
      },
    },
  },
  plugins: [
    nextCookies(), // Required for Next.js Server Actions
  ],
})

// Export type for use in components
export type AuthUser = typeof auth.$Infer.Session.user