# value-bet-ai

AI-powered sports betting value detection platform that identifies mispriced odds across major sportsbooks.

## ✨ Features

- **User Authentication** — Secure signup and login with email and password via Supabase Auth (no email verification required)
- **Protected Dashboard** — Dashboard is only accessible when logged in; unauthenticated users are redirected to the landing page
- **Login/Sign Up Navigation** — Easy access to authentication pages from the landing page navbar
- **Modern UI** — Clean, responsive interface built with Tailwind CSS and Framer Motion animations
- **Supabase Integration** — Full authentication flow with session management and secure API callbacks
- **Reusable Components** — Modular UI components (Button, Input, FormField) with consistent styling
- **Route Groups** — Organized auth routes under the `(auth)` group with shared layout
- **Dashboard Overview** — Real-time tracking of active bets with ROI labels (🟢🟡🟠🔴), player info, odds, break-even and units
- **Value of the Day** — Daily recommended bets with color-coded risk badges: 🟢 Optimal ROI, 🟡 Correct ROI, 🟠 Risky ROI, 🔴 Very Risky ROI
- **Live Bet Status** — Instant status updates showing pending, won, or lost bets
- **KPI Dashboard** — Global ROI, win/loss rate, total profit in units, and current winning streak at a glance
- **Bankroll Performance Chart** — Visual curve of bankroll growth over time with flat betting comparison
- **Bet History** — Filterable table by tournament, surface, and ROI label for analyzing model consistency
- **Surface Statistics** — ROI breakdown for Clay, Hard, and Grass courts to validate model adaptability

## 🛠️ Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS
- **Animations** — Framer Motion
- **Icons** — Lucide React
- **Charts** — Recharts
- **Auth & Database** — Supabase
- **Testing** — Jest with React Testing Library
- **Deployment** — Vercel

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** — [Download from nodejs.org](https://nodejs.org/)
- **A code editor** — We recommend [VS Code](https://code.visualstudio.com/) with the Tailwind CSS IntelliSense extension
- **Git installed** — [Download git](https://git-scm.com/downloads)
- **A Supabase account** — [Sign up free at supabase.com](https://supabase.com)

### 1. Clone the repository

Open your terminal (in VS Code: press `` Ctrl+` `` or `` Cmd+` `` on Mac) and run:

```bash
git clone https://github.com/YOUR_USERNAME/value-bet-ai.git
cd value-bet-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

A `.env.local` file stores secret API keys that your app needs to connect to Supabase. Create this file in the **root folder** of the project (same level as `package.json`).

Create the file:

```bash
touch .env.local
```

Open `.env.local` in your code editor and add these exact lines:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

> 💡 **VS Code tip**: open the integrated terminal with `` Ctrl+` `` (or `` Cmd+` `` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL (starts with `https://`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → Project API keys → `anon` key | Public API key for client-side Supabase access |

**Steps to find Supabase credentials:**

1. Go to [supabase.com](https://supabase.com) and sign in
2. Select your project
3. Click **Project Settings** (gear icon) in the left sidebar
4. Click **API** under Project Settings
5. Copy the **Project URL** and paste as `NEXT_PUBLIC_SUPABASE_URL`
6. Copy the **anon public** key under Project API keys and paste as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🔐 Authentication Flow & Login Redirect Fix

If you're stuck on the login page after signing in, the session isn't being properly retrieved or refreshed. Here's how to fix it:

### Root Cause

The dashboard redirect issue usually happens when:

1. **Supabase client isn't configured** — Environment variables may not be loaded
2. **Middleware isn't checking auth** — Routes aren't protected correctly
3. **Session isn't being refreshed** — The auth state isn't synced between server and client

### Fix Steps

**Step 1: Verify your `.env.local` file**

Make sure `.env.local` exists in the **root folder** (same level as `package.json`), not inside `src/`.

Check it contains:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key
```

**Step 2: Restart the dev server**

```bash
# Stop the server (Ctrl+C)
# Then restart it
npm run dev
```

**Step 3: Check browser console for errors**

1. Open http://localhost:3000/login
2. Right-click → Inspect → Console tab
3. Look for red errors related to Supabase or authentication

**Step 4: Ensure Supabase Auth is configured**

In your Supabase Dashboard:

1. Go to **Authentication** → **Settings**
2. Make sure **Email** is enabled under Providers
3. Check that **Confirm email** is disabled (since your app doesn't require verification)

### How the Auth Flow Works

1. User submits credentials in `src/components/auth/AuthForm.tsx`
2. Supabase validates and creates a session
3. Session cookie is set server-side via `supabase/server.ts`
4. Middleware checks the session and redirects:
   - Authenticated users on `/login` → redirect to `/dashboard`
   - Unauthenticated users on `/dashboard` → redirect to `/login`

If the redirect isn't working, the middleware or session retrieval likely has an issue.

## 🧪 Running Tests

Unit tests automatically check that the login and signup forms work correctly. When you run a test, it simulates a user interacting with the form and verifies the app responds correctly.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/AuthForm.test.tsx
```

or

```bash
npx jest src/__tests__/AuthForm.test.tsx
```

### Watch mode (re-runs on file change)

```bash
npx jest --watch
```

### Understanding test output

- **PASS** — All tests in that file passed ✅
- **FAIL** — Something broke ❌ (shows which test failed and why)
- **FAIL** example output:

```
FAIL __tests__/AuthForm.test.tsx
  ● AuthForm › renders login form

    expect(received).toBe(expected)

    Expected: "Sign in"
    Received: ""

    3 tests passed, 1 test failed
```

This tells you: the test expected the button to say "Sign in" but found it empty.

### What the tests cover

Based on the test files found, tests verify:

- **AuthForm.tsx** — Login form renders correctly, signup toggles work, form submission triggers Supabase auth calls, error messages display properly

## 📁 Project Structure

```
src/
├── __tests__/           # Jest unit tests
│   └── AuthForm.test.tsx
├── app/                 # Next.js App Router pages and layouts
│   ├── (auth)/          # Route group: login/signup pages with shared auth layout
│   ├── dashboard/       # Protected dashboard page
│   └── page.tsx         # Landing page
├── components/          # Reusable React components
│   ├── auth/
│   │   └── AuthForm.tsx # Login/signup form component
│   ├── ui/              # Base UI components (Button, Input, FormField)
│   └── charts/          # Dashboard chart components
├── lib/                 # Utility functions and helpers
├── supabase/            # Supabase client configuration
│   ├── client.ts        # Browser-side Supabase client
│   └── server.ts        # Server-side Supabase client with session handling
└── types/               # TypeScript type definitions
```

**Key files for auth debugging:**

- `src/components/auth/AuthForm.tsx` — Login form component
- `src/supabase/client.ts` — Client-side Supabase instance
- `src/supabase/server.ts` — Server-side session handling
- `middleware.ts` — Route protection (if exists)

## 🚀 Deploy to Vercel

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step

1. **Import your repository**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your GitHub repo

2. **Configure environment variables**
   - In Vercel dashboard, go to **Settings** → **Environment Variables**
   - Add each variable from `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

3. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes for the build to complete

4. **Update Supabase allowed URLs** (important!)
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Add your Vercel deployment URL (e.g., `https://your-project.vercel.app`)
   - Add `http://localhost:3000` for local development

### ⚠️ Common Vercel deployment issue

If login works locally but not on Vercel:

1. Verify all environment variables are set in Vercel dashboard
2. Check Supabase → Authentication → URL Configuration includes your production URL
3. Redeploy after adding environment variables (Vercel doesn't auto-reload them)

## 📝 License

MIT