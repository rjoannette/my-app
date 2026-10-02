# Authentication Architecture

## Overview

This application uses **Clerk** as the sole authentication provider. No other authentication methods should be used.

## Key Principles

1. **Clerk-only auth**: All user authentication flows must go through Clerk
2. **Protected routes**: Routes requiring authentication are protected via middleware
3. **Modal interactions**: Sign in/sign up always launch as modals, not full pages
4. **Smart redirects**: Logged-in users are redirected from the homepage to `/dashboard`

## Protected Routes

### `/dashboard` Route
- **Status**: Protected (requires authenticated user)
- **Access**: Only signed-in users
- **Redirect**: Unauthenticated users → redirected by middleware
- **Implementation**: Use Clerk's `auth()` in middleware to verify session

### `/` (Homepage)
- **Status**: Public, but redirects authenticated users
- **Behavior**: Logged-in users → redirected to `/dashboard`
- **Implementation**: Use `useUser()` hook on the page component

## Sign In/Sign Up Modal Pattern

Sign in and sign up must always appear as modals, NOT full-page forms.

### Implementation

```typescript
import { SignInButton, SignUpButton } from "@clerk/nextjs";

// In header/nav components
<SignInButton mode="modal">
  <button>Sign In</button>
</SignInButton>

<SignUpButton mode="modal">
  <button>Sign Up</button>
</SignUpButton>
```

**Note**: Always include `mode="modal"` to launch Clerk modals instead of redirecting to sign-in/sign-up pages.

## Middleware Setup

Use Clerk's middleware to protect routes:

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

## Environment Variables

Required Clerk environment variables (set in `.env.local`):

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_key>
CLERK_SECRET_KEY=<your_secret>
```

## Common Patterns

### Redirect Logged-In Users from Homepage

```typescript
// app/page.tsx
'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  // Render public homepage content for signed-out users
  return (
    <div>
      {/* Homepage content */}
    </div>
  );
}
```

### Protect a Page Component

```typescript
// app/dashboard/page.tsx
'use client';

import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) redirect('/');

  return (
    <div>
      {/* Dashboard content */}
    </div>
  );
}
```

### Access User Information

```typescript
import { currentUser, auth } from '@clerk/nextjs/server';

// In Server Components or API routes
const user = await currentUser();
const { userId } = await auth();
```

## Route Structure

| Route | Auth Required | Behavior |
|-------|---------------|----------|
| `/` | No | Redirects signed-in users to `/dashboard` |
| `/dashboard` | Yes | Protected route, only for authenticated users |
| `/sign-in/*` | No | Modal for sign-in (handled by Clerk) |
| `/sign-up/*` | No | Modal for sign-up (handled by Clerk) |

## Testing Auth Flows

1. **Unauthenticated Access**: Visit `/dashboard` → should redirect to sign-in modal
2. **Signed-In Homepage**: Sign in, visit `/` → should redirect to `/dashboard`
3. **Modal Launch**: Click "Sign In" button → modal appears (not full page)
4. **Session Persistence**: Sign in, refresh page → session maintained

## Do's and Don'ts

✅ **Do**
- Use Clerk's `@clerk/nextjs` components and hooks
- Protect routes via middleware
- Use `mode="modal"` for sign-in/sign-up buttons
- Check `isLoaded` before using user data in Client Components
- Use `auth()` server-side for API routes

❌ **Don't**
- Implement custom authentication
- Use any third-party auth provider
- Display full-page sign-in/sign-up forms (use modals)
- Store sensitive auth tokens in state without protection
- Skip middleware protection for sensitive routes
