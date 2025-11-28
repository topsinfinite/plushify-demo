import { createAuthClient } from "better-auth/react"
import type { AppUser } from "./auth-types"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
})

// Export auth methods
export const { signIn, signOut, signUp } = authClient

// Export typed useSession hook
export function useSession() {
  const session = authClient.useSession()

  return {
    data: session.data ? {
      ...session.data,
      user: session.data.user as AppUser
    } : null,
    isPending: session.isPending,
    error: session.error,
  }
}
