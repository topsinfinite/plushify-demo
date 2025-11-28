# Implementation Plan: Better Auth Real User Data Integration

**Estimated Time:** 2-3 hours
**Complexity:** Medium
**Risk Level:** Medium (schema changes + breaking auth changes)

---

## Prerequisites

Before starting implementation:
- [ ] PostgreSQL database is running and accessible
- [ ] `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set in `.env`
- [ ] `BETTER_AUTH_SECRET` is configured (32-character random string)
- [ ] `NEXT_PUBLIC_APP_URL` is set correctly
- [ ] Database backup created (optional but recommended)

---

## Phase 1: Database Schema Extension

**Goal:** Add custom user statistics fields to the database

**Time Estimate:** 15 minutes

### Tasks

- [ ] Import `integer` type in `src/lib/schema.ts`
- [ ] Add `credits` column with default value of 10
- [ ] Add `totalGenerations` column with default value of 0
- [ ] Add `creditsUsed` column with default value of 0
- [ ] Add `favoriteCount` column with default value of 0
- [ ] Run `pnpm run db:generate` to create migration
- [ ] Review generated migration file in `drizzle/` directory
- [ ] Run `pnpm run db:migrate` to apply migration
- [ ] Verify columns exist using `pnpm run db:studio`

**Files Modified:**
- `src/lib/schema.ts`

**Expected Outcome:**
- User table has 4 new columns
- Migration file created
- Migration applied successfully
- Existing users get default values

---

## Phase 2: Better Auth Configuration

**Goal:** Configure Better Auth to include custom fields in session

**Time Estimate:** 10 minutes

### Tasks

- [ ] Add `user` configuration block to `src/lib/auth.ts`
- [ ] Configure `additionalFields` with credits field
- [ ] Configure `additionalFields` with totalGenerations field
- [ ] Configure `additionalFields` with creditsUsed field
- [ ] Configure `additionalFields` with favoriteCount field
- [ ] Set default values for each field
- [ ] Mark fields as required

**Files Modified:**
- `src/lib/auth.ts`

**Expected Outcome:**
- Better Auth includes custom fields in session responses
- TypeScript types automatically infer custom fields
- Session data structure matches database schema

---

## Phase 3: Data Access Layer

**Goal:** Create utilities and server actions for user statistics

**Time Estimate:** 30 minutes

### Tasks

#### 3.1 User Stats Utilities
- [ ] Create new file `src/lib/user-stats.ts`
- [ ] Add `"use server"` directive
- [ ] Define `UserStats` interface
- [ ] Implement `getUserStats(userId)` function
- [ ] Implement `spendCredits(userId, amount)` function
- [ ] Implement `incrementGenerations(userId)` function
- [ ] Implement `addCredits(userId, amount)` function
- [ ] Use Drizzle's `$add` and `$subtract` for atomic updates
- [ ] Add error handling to all functions

#### 3.2 Server Actions
- [ ] Create new file `src/app/actions/user-actions.ts`
- [ ] Add `"use server"` directive
- [ ] Implement `recordGenerationAction(creditsToSpend)` function
- [ ] Add authentication check in action
- [ ] Call `spendCredits` from user-stats
- [ ] Call `incrementGenerations` from user-stats
- [ ] Return success/error response

**Files Created:**
- `src/lib/user-stats.ts`
- `src/app/actions/user-actions.ts`

**Expected Outcome:**
- Centralized functions for user data operations
- Atomic database updates
- Type-safe server actions
- Proper error handling

---

## Phase 4: Enable Real Authentication

**Goal:** Remove mock authentication and activate real Better Auth

**Time Estimate:** 10 minutes

### Tasks

- [ ] Open `src/lib/auth-client.ts`
- [ ] Remove import of `mockSession` from mock-data
- [ ] Delete mock `signIn` function
- [ ] Delete mock `signOut` function
- [ ] Delete mock `signUp` function
- [ ] Delete mock `useSession` hook
- [ ] Delete mock `useUser` hook
- [ ] Delete mock `getSession` function
- [ ] Keep only the real `authClient` creation
- [ ] Export real hooks: `useSession`, `signIn`, `signOut`, `signUp`

**Files Modified:**
- `src/lib/auth-client.ts`

**Expected Outcome:**
- Real Better Auth client active
- Mock authentication removed completely
- File reduced from 48 lines to ~7 lines
- TypeScript recognizes real Better Auth types

---

## Phase 5: Component Updates

**Goal:** Replace all mockUser references with real session data

**Time Estimate:** 45 minutes

### 5.1 SiteHeader Component

- [ ] Open `src/components/site-header.tsx`
- [ ] Remove import of `mockUser` from mock-data
- [ ] Replace `mockUser.credits` with `session.user.credits ?? 0`
- [ ] Add nullish coalescing operator for safety

**Files Modified:** `src/components/site-header.tsx`

### 5.2 UserMenu Component

- [ ] Open `src/components/plushify/user-menu.tsx`
- [ ] Remove import of `mockUser` from mock-data
- [ ] Replace `mockUser.credits` with `session.user.credits ?? 0`
- [ ] Replace `mockUser.totalGenerations` with `session.user.totalGenerations ?? 0`
- [ ] Replace `mockUser.favoriteCount` with `session.user.favoriteCount ?? 0`
- [ ] Update all stat displays to use session data

**Files Modified:** `src/components/plushify/user-menu.tsx`

### 5.3 Dashboard Page

- [ ] Open `src/app/dashboard/page.tsx`
- [ ] Remove `mockUser` from import (keep `getMockUserGenerations`)
- [ ] Add `const user = session?.user` after useSession hook
- [ ] Replace low credits check: `(user?.credits ?? 0) < 10`
- [ ] Replace all `mockUser.credits` with `user?.credits ?? 0`
- [ ] Replace `mockUser.creditsUsed` with `user?.creditsUsed ?? 0`
- [ ] Replace `mockUser.totalGenerations` with `user?.totalGenerations ?? 0`
- [ ] Replace `mockUser.favoriteCount` with `user?.favoriteCount ?? 0`
- [ ] Replace `mockUser.joinDate` with `new Date(user?.createdAt)`
- [ ] Keep `getMockUserGenerations()` calls unchanged (demo data)

**Files Modified:** `src/app/dashboard/page.tsx`

### 5.4 Generate Page

- [ ] Open `src/app/generate/page.tsx`
- [ ] Remove `mockUser` and `updateUserCredits` from imports
- [ ] Keep `createGeneration` import (demo data)
- [ ] Add import of `recordGenerationAction`
- [ ] Add import of `useSession` from auth-client
- [ ] Add `const { data: session } = useSession()` hook
- [ ] Replace `mockUser.credits` with `session?.user?.credits ?? 0`
- [ ] Replace `updateUserCredits(-3)` with `await recordGenerationAction(3)`
- [ ] Keep `createGeneration(...)` for demo purposes
- [ ] Update credit validation logic

**Files Modified:** `src/app/generate/page.tsx`

### 5.5 Profile Page Verification

- [ ] Open `src/app/profile/page.tsx`
- [ ] Verify it's using real session data (should already be correct)
- [ ] Test after auth-client update to ensure compatibility
- [ ] No code changes needed

**Files Verified:** `src/app/profile/page.tsx`

---

## Phase 6: TypeScript Type Definitions

**Goal:** Add TypeScript definitions for Better Auth custom fields

**Time Estimate:** 10 minutes

### Tasks

- [ ] Create new file `src/types/auth.d.ts`
- [ ] Import Session and User types from better-auth
- [ ] Declare module augmentation for "better-auth/types"
- [ ] Extend User interface with credits field
- [ ] Extend User interface with totalGenerations field
- [ ] Extend User interface with creditsUsed field
- [ ] Extend User interface with favoriteCount field

**Files Created:**
- `src/types/auth.d.ts`

**Expected Outcome:**
- TypeScript autocomplete for custom user fields
- No type errors when accessing session.user.credits
- IDE suggestions for all custom fields

---

## Phase 7: Cleanup Mock Data

**Goal:** Remove mock user data while keeping mock generations

**Time Estimate:** 15 minutes

### Tasks

- [ ] Open `src/lib/mock-data.ts`
- [ ] Remove `MockUser` interface definition
- [ ] Remove `mockUser` constant
- [ ] Remove `MockSession` interface definition
- [ ] Remove `mockSession` constant
- [ ] Remove `updateUserCredits()` function
- [ ] Remove `spendMockCredits()` function
- [ ] Remove any other user-related mock functions
- [ ] Keep `mockGenerations` array (demo data)
- [ ] Keep `getMockUserGenerations()` function
- [ ] Keep `MockGeneration` interface
- [ ] Keep `mockTestimonials` and related types
- [ ] Keep `mockStats` for homepage

**Files Modified:**
- `src/lib/mock-data.ts`

**Expected Outcome:**
- Mock user data completely removed
- Mock generation data preserved
- No breaking changes to gallery/dashboard

---

## Phase 8: Quality Assurance

**Goal:** Verify all changes work correctly

**Time Estimate:** 30 minutes

### Code Quality Checks

- [ ] Run `pnpm run lint` - should pass with no errors
- [ ] Run `pnpm run typecheck` - should pass with no errors
- [ ] Search for remaining `mockUser` imports: `grep -r "mockUser" src/`
- [ ] Verify no TypeScript errors in IDE
- [ ] Verify no console errors in browser dev tools

### Database Testing

- [ ] Open `pnpm run db:studio`
- [ ] Verify `credits`, `total_generations`, `credits_used`, `favorite_count` columns exist
- [ ] Check existing users have default values populated
- [ ] Verify constraints and data types are correct

### Authentication Flow Testing

- [ ] Sign out completely from application
- [ ] Clear browser cookies and localStorage
- [ ] Sign in with Google OAuth
- [ ] Verify authentication succeeds
- [ ] Verify session includes custom fields in dev tools
- [ ] Test protected route redirects work

### Component Display Testing

- [ ] Verify SiteHeader displays real credit balance
- [ ] Verify UserMenu dropdown shows correct stats
- [ ] Verify Dashboard displays all real user data
- [ ] Verify Generate page shows real credit balance
- [ ] Verify Profile page still works correctly
- [ ] Verify no "undefined" or "NaN" values appear

### Data Mutation Testing

- [ ] Generate a plushie on Generate page
- [ ] Verify credits decrease by 3
- [ ] Check database to confirm credit deduction
- [ ] Verify totalGenerations incremented
- [ ] Verify creditsUsed increased
- [ ] Verify changes persist after page refresh

### Edge Case Testing

- [ ] Test behavior with 0 credits
- [ ] Verify low credits warning appears when < 10
- [ ] Test session expiration handling
- [ ] Test loading states during data fetch
- [ ] Test error states for failed database operations

---

## Rollback Plan

If critical issues arise during implementation:

### Quick Code Rollback
- [ ] Run `git checkout src/lib/auth-client.ts` to restore mock auth
- [ ] Run `git checkout src/lib/auth.ts` to restore auth config
- [ ] Run `git checkout src/components/` to restore all components
- [ ] Run `git checkout src/app/` to restore all pages

### Database Rollback
- [ ] Open Drizzle Studio: `pnpm run db:studio`
- [ ] Execute SQL: `ALTER TABLE "user" DROP COLUMN "credits";`
- [ ] Execute SQL: `ALTER TABLE "user" DROP COLUMN "total_generations";`
- [ ] Execute SQL: `ALTER TABLE "user" DROP COLUMN "credits_used";`
- [ ] Execute SQL: `ALTER TABLE "user" DROP COLUMN "favorite_count";`

### Full Git Rollback
- [ ] Create new branch: `git checkout -b rollback-better-auth`
- [ ] Revert commits: `git revert HEAD~N` (N = number of commits)
- [ ] Or reset hard: `git reset --hard HEAD~N` (destructive)

---

## Success Criteria

Implementation is complete and successful when ALL checkboxes below are checked:

- [ ] All TypeScript type checks pass (`pnpm run typecheck`)
- [ ] All ESLint checks pass (`pnpm run lint`)
- [ ] New users receive 10 starter credits automatically
- [ ] Credits display correctly in header
- [ ] Credits display correctly in user menu
- [ ] Dashboard shows all real user stats
- [ ] Generate page shows real credit balance
- [ ] Plushie generation deducts credits correctly
- [ ] Credits persist in database
- [ ] Generation count increments correctly
- [ ] Google OAuth sign-in works
- [ ] Protected routes require authentication
- [ ] Session includes custom fields
- [ ] TypeScript autocomplete works for custom fields
- [ ] No `mockUser` references outside `mock-data.ts`
- [ ] No console errors in browser
- [ ] Profile page still works correctly
- [ ] Mock generation data still displays in gallery/dashboard

---

## Critical Implementation Notes

### Order Matters
Execute phases in the exact order listed. Do not skip ahead or reorder phases.

### Database First
Always complete Phase 1 (database) before modifying any auth or component code.

### Test Incrementally
Test after each phase before moving to the next. Don't wait until the end.

### Keep Mock Generations
Per requirements, mock generation data must remain for gallery/dashboard demo.

### Session Data Structure
After Phase 2, `session.user` will automatically include custom fields. No additional queries needed.

### Atomic Updates
Use Drizzle's `$add` and `$subtract` helpers to ensure database consistency.

### Type Safety
Phase 6 (TypeScript types) enables autocomplete and prevents type errors.

---

## Post-Implementation Tasks

After successful implementation:

- [ ] Update documentation to reflect real auth usage
- [ ] Document Google OAuth setup process
- [ ] Add instructions for environment variable configuration
- [ ] Consider implementing credit purchase flow
- [ ] Plan for real AI generation backend integration
- [ ] Monitor database performance
- [ ] Add database indexes if needed for large user base
