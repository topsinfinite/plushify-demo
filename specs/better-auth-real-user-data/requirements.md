# Feature Requirements: Replace Mock User Data with Real Better Auth

## Overview
Replace all dummy/stubbed user data in the Plushify application with real authentication and user data from Better Auth and the database.

## Business Goals
- Enable real Google OAuth authentication for users
- Store and track user-specific data (credits, generations, favorites) in the database
- Provide accurate user statistics across the application
- Maintain demo generation data for gallery/dashboard until AI backend is ready

## User Stories

### As a new user
- I want to sign in with my Google account
- I want to receive 10 starter credits automatically
- I want to see my actual profile information from Google

### As an authenticated user
- I want to see my real credit balance in the header and menus
- I want my generation count to be tracked accurately
- I want my credit usage to be recorded in the database
- I want my stats to persist between sessions

### As a user on the dashboard
- I want to see my real credit balance, not dummy data
- I want to see my actual generation history count
- I want to see my account creation date
- I want to see how many credits I've used

### As a user generating plushies
- I want credits deducted from my real balance
- I want to see accurate credit count before and after generation
- I want to be blocked from generating if I have insufficient credits

## Functional Requirements

### Authentication
- [ ] Users can sign in with Google OAuth
- [ ] Users can sign out
- [ ] Session data includes user profile (name, email, image, emailVerified)
- [ ] Session data includes custom fields (credits, totalGenerations, creditsUsed, favoriteCount)
- [ ] Protected routes require authentication

### User Data Management
- [ ] New users automatically receive 10 starter credits
- [ ] User credits stored in database
- [ ] User generation count stored in database
- [ ] User credits used (lifetime) stored in database
- [ ] User favorite count stored in database
- [ ] All user stats persist across sessions

### Credit System
- [ ] Credits display in site header
- [ ] Credits display in user menu dropdown
- [ ] Credits display on dashboard
- [ ] Credits display on generate page
- [ ] Credit deduction happens in database when generating
- [ ] Low credits warning shows when credits < 10
- [ ] Generation blocked when credits = 0

### Data Display
- [ ] SiteHeader shows real credit balance
- [ ] UserMenu shows real stats (credits, generations, favorites)
- [ ] Dashboard shows all real user data
- [ ] Profile page continues to work (already using real data)
- [ ] Generate page shows real credit balance

### Demo Data
- [ ] Mock generation data kept for gallery
- [ ] Mock generation data kept for dashboard
- [ ] Mock testimonials kept for homepage
- [ ] Mock statistics kept for homepage

## Technical Requirements

### Database
- [ ] User table extended with 4 new columns
- [ ] Database migration created and applied
- [ ] Default values set for new columns
- [ ] Existing users get default values populated

### Better Auth Configuration
- [ ] `additionalFields` configured in server auth
- [ ] TypeScript types extended for custom user fields
- [ ] Session automatically includes custom fields
- [ ] Google OAuth credentials configured

### Code Quality
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] No mockUser imports outside mock-data.ts
- [ ] Proper error handling for database operations
- [ ] Loading states for async data

## Non-Functional Requirements

### Performance
- [ ] User stats included in session (no extra queries)
- [ ] Database operations use atomic updates
- [ ] Component loading states prevent UI flicker

### Security
- [ ] Server actions validate authentication
- [ ] Database queries prevent SQL injection (using Drizzle ORM)
- [ ] Session data validated server-side
- [ ] Credit updates happen server-side only

### Maintainability
- [ ] Centralized user stats utilities
- [ ] Reusable server actions
- [ ] Consistent patterns across components
- [ ] Clear separation: client hooks vs server queries

## Out of Scope
- Payment integration for purchasing credits
- Real AI plushie generation backend
- User favorites functionality (database tracking only)
- Email verification flow
- User profile editing
- Password authentication (OAuth only)
- Unit and E2E testing

## Success Metrics
- All TypeScript and ESLint checks pass
- New users receive 10 credits automatically
- Credits deduct correctly during generation
- All user stats display accurately
- No console errors in browser
- Session persists across page refreshes

## Dependencies
- PostgreSQL database running
- Google OAuth credentials configured
- Better Auth library installed
- Drizzle ORM configured

## Assumptions
- Users will authenticate via Google OAuth only
- Credit value per generation is 3 credits
- Low credit threshold is 10 credits
- Starter credit amount is 10 credits
- Mock generation data is sufficient for demo purposes
