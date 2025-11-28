import "better-auth"
import type { PlatformRole } from "@/lib/auth-types"

// Extend Better Auth's User type with custom fields
declare module "better-auth" {
  interface User {
    credits: number
    totalGenerations: number
    creditsUsed: number
    favoriteCount: number
    platformRole: PlatformRole
  }
}
