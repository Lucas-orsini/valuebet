# value-bet-ai

AI-powered sports betting value detection platform that identifies mispriced odds across major sportsbooks.

## ✨ Features

- **User Authentication** — Secure signup and login with email and password via Supabase Auth (no email verification required)
- **Protected Dashboard** — Dashboard is only accessible when logged in; unauthenticated users are redirected to the landing page
- **Session Persistence** — Uses Supabase SSR for proper cookie-based session management across server and client
- **Login/Sign Up Navigation** — Easy access to authentication pages from the landing page navbar
- **Modern UI** — Clean, responsive interface built with Tailwind CSS and Framer Motion animations
- **Supabase Integration** — Full authentication flow with SSR session management and secure API callbacks
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
- **Auth & Database** — Supabase with SSR for proper session handling
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
|----------|----------|-----------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API → anon/public key | Public API key for client-side authentication |

To find these:
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **Project Settings** (gear icon)
4. Click **API** in the sidebar
5. Copy the **Project URL** and **anon/public** key

## 🧪 Running Tests

Unit tests automatically check that key parts of the app work correctly (like forms and buttons). Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/AuthForm.test.tsx
```

Watch mode (re-runs tests automatically when files change):

```bash
npx jest --watch
```

**Reading test output:**
- `PASS` — All tests passed, everything works ✅
- `FAIL` — Something broke, check the error message below for details

**What tests cover:** AuthForm component (sign up, login, input validation, error handling, loading states)

## 🔐 Session Persistence Fix (Supabase SSR)

The app uses `@supabase/ssr` to properly handle session persistence across server and client. This ensures you stay logged in after authentication.

### Key Files

- **`src/middleware.ts`** — Intercepts all requests to refresh sessions and protect routes
- **`src/lib/supabase/server.ts`** — Creates server-side Supabase clients with cookie handling
- **`src/lib/supabase/client.ts`** — Creates browser-side Supabase client

### How It Works

1. **Middleware** (`src/middleware.ts`) runs on every request:
   - Refreshes the session cookie before the page loads
   - Redirects unauthenticated users from protected routes (like `/dashboard`) to `/login`
   - Redirects authenticated users from auth routes (like `/login`) to `/dashboard`

2. **Server Components** use `createServerClient` with cookies for session reads/writes

3. **Client Components** use `createBrowserClient` for real-time auth state

### Important: Middleware Location

The `middleware.ts` file **must** be in the **root of your project** (same level as `package.json`), not inside `src/`. This is a Next.js requirement.

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/             # Auth route group (login, signup)
│   │   ├── dashboard/          # Protected dashboard pages
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Landing page
│   ├── components/             # Reusable UI components
│   │   ├── auth/               # Auth components (AuthForm)
│   │   └── ui/                 # Base UI components (Button, Input)
│   └── lib/
│       └── supabase/           # Supabase client utilities
│           ├── client.ts       # Browser client (createBrowserClient)
│           └── server.ts       # Server client (createServerClient)
├── __tests__/                  # Jest test files
│   └── AuthForm.test.tsx
├── middleware.ts               # Next.js middleware for session refresh
├── .env.local                  # Environment variables (git-ignored)
└── package.json
```

## 🚀 Deploy to Vercel

### One-click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by Step

1. **Push your code to GitHub** if you haven't already:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/value-bet-ai.git
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click **Import Git Repository**
   - Select your GitHub repo

3. **Add Environment Variables**:
   - In Vercel dashboard, go to **Settings** → **Environment Variables**
   - Add each variable from your `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

4. **Deploy**:
   - Click **Deploy**
   - Wait for the build to complete
   - Your app is live! 🎉

> ⚠️ **Important**: Make sure to add all environment variables in Vercel before deploying. Without them, authentication will fail.

## 📝 License

MIT