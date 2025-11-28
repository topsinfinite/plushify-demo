// Platform role type
export type PlatformRole = "admin" | "user"

// Helper types for Better Auth with custom fields
export interface CustomUserFields {
  credits: number
  totalGenerations: number
  creditsUsed: number
  favoriteCount: number
  platformRole: PlatformRole
}

// Extend the base Better Auth User type
export interface AppUser {
  id: string
  email: string
  emailVerified: boolean
  name: string
  image?: string | null
  createdAt: Date
  updatedAt: Date
  // Custom fields
  credits: number
  totalGenerations: number
  creditsUsed: number
  favoriteCount: number
  platformRole: PlatformRole
}

// Session type with custom user fields
export interface AppSession {
  user: AppUser
  session: {
    id: string
    userId: string
    expiresAt: Date
    token: string
    ipAddress?: string
    userAgent?: string
  }
}
