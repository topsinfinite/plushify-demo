# Better Auth Real User Data Integration

**Feature Status:** Ready for Implementation
**Created:** 2025-11-27
**Estimated Implementation Time:** 2-3 hours

## Overview

This feature replaces all mock/dummy user data in the Plushify application with real Better Auth authentication and database-backed user statistics. Users will authenticate via Google OAuth, and their credits, generations, and other stats will be stored and tracked in PostgreSQL.

## Quick Links

- [Requirements](./requirements.md) - Detailed functional and technical requirements
- [Implementation Plan](./implementation-plan.md) - Step-by-step implementation guide with checkboxes
- [Original Planning Document](../../../.claude/plans/refactored-juggling-lovelace.md) - Comprehensive planning notes

## What's Changing

### Before (Mock Data)
- Mock user authentication (no real sign-in)
- Hardcoded `mockUser` with fake data
- Credits and stats don't persist
- No real Google OAuth

### After (Real Data)
- Real Google OAuth authentication
- User data stored in PostgreSQL
- Credits and stats persist across sessions
- Automatic 10 starter credits for new users

## Key Features

1. **Real Authentication**
   - Google OAuth sign-in/sign-out
   - Session management via Better Auth
   - Protected routes with auth checks

2. **Database-Backed User Stats**
   - Credits balance (default: 10)
   - Total generations count
   - Lifetime credits used
   - Favorite count

3. **Credit System**
   - Credits displayed in header and menus
   - Credits deducted during plushie generation
   - Low credits warning when < 10
   - Generation blocked at 0 credits

4. **Demo Data Preserved**
   - Mock generation data remains for gallery
   - Mock generation data remains for dashboard
   - Allows UI showcase before AI backend ready

## Technical Architecture

### Database Schema
- Extends `user` table with 4 new columns
- Uses Drizzle ORM migrations
- Default values for new users

### Better Auth Configuration
- `additionalFields` for custom user data
- Automatic inclusion in session responses
- Full TypeScript type inference

### Data Access Pattern
- Centralized utilities in `src/lib/user-stats.ts`
- Server actions in `src/app/actions/user-actions.ts`
- Atomic database updates using Drizzle helpers

## Files Affected

### Modified (7 files)
1. `src/lib/schema.ts` - Add user stat columns
2. `src/lib/auth.ts` - Configure additionalFields
3. `src/lib/auth-client.ts` - Enable real auth
4. `src/components/site-header.tsx` - Use real credits
5. `src/components/plushify/user-menu.tsx` - Use real stats
6. `src/app/dashboard/page.tsx` - Replace all mockUser
7. `src/app/generate/page.tsx` - Real credit logic
8. `src/lib/mock-data.ts` - Remove mock user data

### Created (3 files)
1. `src/lib/user-stats.ts` - User stats utilities
2. `src/app/actions/user-actions.ts` - Server actions
3. `src/types/auth.d.ts` - TypeScript definitions

### Verified (1 file)
1. `src/app/profile/page.tsx` - Already correct

## Implementation Phases

1. **Phase 1:** Database Schema (15 min)
2. **Phase 2:** Better Auth Config (10 min)
3. **Phase 3:** Data Access Layer (30 min)
4. **Phase 4:** Enable Real Auth (10 min)
5. **Phase 5:** Component Updates (45 min)
6. **Phase 6:** TypeScript Types (10 min)
7. **Phase 7:** Cleanup Mock Data (15 min)
8. **Phase 8:** Quality Assurance (30 min)

## Prerequisites

Before implementing, ensure:
- PostgreSQL is running
- Environment variables configured:
  - `POSTGRES_URL`
  - `BETTER_AUTH_SECRET`
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `NEXT_PUBLIC_APP_URL`

## Testing Strategy

### Manual Testing Checklist
- Google OAuth sign-in flow
- Credit display in all components
- Credit deduction during generation
- Stats persistence across sessions
- Protected route redirects
- Low credits warning
- Zero credits blocking

### Automated Checks
- `pnpm run lint` - ESLint validation
- `pnpm run typecheck` - TypeScript validation
- Database migration verification
- No remaining mockUser imports

## Rollback Plan

If issues occur:
1. Git revert all changes
2. Database rollback via SQL
3. Restore mock auth temporarily
4. Continue development, retry later

## Success Metrics

- ✅ All TypeScript/ESLint checks pass
- ✅ New users get 10 credits automatically
- ✅ Credits deduct correctly during generation
- ✅ All stats display accurately
- ✅ No console errors
- ✅ Session persists across refreshes
- ✅ No mockUser references remain (except in mock-data.ts)

## Related Documentation

- [Better Auth Documentation](https://www.better-auth.com)
- [Better Auth Next.js Integration](https://www.better-auth.com/docs/integrations/next)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- Project: `docs/technical/betterauth/`

## Notes

- Mock generation data intentionally kept for demo purposes
- Real AI generation backend is a separate future feature
- Credit purchase flow not included in this feature
- Unit and E2E testing excluded per requirements

## Questions or Issues?

Refer to:
1. [Implementation Plan](./implementation-plan.md) for detailed steps
2. [Requirements](./requirements.md) for acceptance criteria
3. Original planning document for technical insights
