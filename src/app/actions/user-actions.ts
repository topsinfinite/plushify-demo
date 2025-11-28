"use server"

import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { spendCredits, incrementGenerations } from "@/lib/user-stats"

export async function recordGenerationAction(creditsToSpend: number) {
  try {
    // Validate input
    if (!Number.isInteger(creditsToSpend) || creditsToSpend <= 0) {
      return { success: false, error: "Invalid credit amount", newBalance: null }
    }

    if (creditsToSpend > 100) {
      return { success: false, error: "Credit amount exceeds maximum allowed", newBalance: null }
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated", newBalance: null }
    }

    const userId = session.user.id

    // Use database transaction to ensure atomicity
    const result = await db.transaction(async (tx) => {
      // Spend credits (includes balance check)
      const spendResult = await spendCredits(userId, creditsToSpend, tx)
      if (!spendResult.success) {
        throw new Error("Insufficient credits")
      }

      // Increment generation count
      const incrementSuccess = await incrementGenerations(userId, tx)
      if (!incrementSuccess) {
        throw new Error("Failed to increment generations")
      }

      return { newBalance: spendResult.newBalance }
    })

    return {
      success: true,
      newBalance: result.newBalance,
      error: null
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An error occurred"
    console.error(`Error recording generation:`, error)

    // Return appropriate error message
    if (errorMessage === "Insufficient credits") {
      return { success: false, error: "Insufficient credits", newBalance: null }
    }

    return { success: false, error: errorMessage, newBalance: null }
  }
}
