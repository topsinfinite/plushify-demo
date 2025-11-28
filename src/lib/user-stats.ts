"use server"

import { db } from "./db"
import { user } from "./schema"
import { eq, sql } from "drizzle-orm"

export interface UserStats {
  credits: number
  totalGenerations: number
  creditsUsed: number
  favoriteCount: number
}

type DbOrTransaction = typeof db | Parameters<Parameters<typeof db.transaction>[0]>[0]

export async function getUserStats(
  userId: string,
  dbInstance: DbOrTransaction = db
): Promise<UserStats | null> {
  try {
    const result = await dbInstance
      .select({
        credits: user.credits,
        totalGenerations: user.totalGenerations,
        creditsUsed: user.creditsUsed,
        favoriteCount: user.favoriteCount,
      })
      .from(user)
      .where(eq(user.id, userId))
      .limit(1)

    return result[0] || null
  } catch (error) {
    console.error(`Error fetching user stats for user ${userId}:`, error)
    return null
  }
}

export async function spendCredits(
  userId: string,
  amount: number,
  dbInstance: DbOrTransaction = db
): Promise<{ success: boolean; newBalance?: number }> {
  try {
    // Prevent negative credits by checking balance first
    const result = await dbInstance
      .update(user)
      .set({
        credits: sql`${user.credits} - ${amount}`,
        creditsUsed: sql`${user.creditsUsed} + ${amount}`,
      })
      .where(sql`${user.id} = ${userId} AND ${user.credits} >= ${amount}`)
      .returning({ credits: user.credits })

    // If no rows were updated, user didn't have enough credits
    if (result.length === 0) {
      console.error(`Insufficient credits for user ${userId}. Attempted to spend ${amount} credits.`)
      return { success: false }
    }

    return { success: true, newBalance: result[0].credits }
  } catch (error) {
    console.error(`Error spending credits for user ${userId}, amount ${amount}:`, error)
    return { success: false }
  }
}

export async function incrementGenerations(
  userId: string,
  dbInstance: DbOrTransaction = db
): Promise<boolean> {
  try {
    await dbInstance
      .update(user)
      .set({
        totalGenerations: sql`${user.totalGenerations} + 1`,
      })
      .where(eq(user.id, userId))

    return true
  } catch (error) {
    console.error(`Error incrementing generations for user ${userId}:`, error)
    return false
  }
}

export async function addCredits(
  userId: string,
  amount: number,
  dbInstance: DbOrTransaction = db
): Promise<boolean> {
  try {
    await dbInstance
      .update(user)
      .set({
        credits: sql`${user.credits} + ${amount}`,
      })
      .where(eq(user.id, userId))

    return true
  } catch (error) {
    console.error(`Error adding credits for user ${userId}, amount ${amount}:`, error)
    return false
  }
}
