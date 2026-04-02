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
- **Surface Statistics** — ROI breakdown for Clay, Hard, and Grass courts to validate model adaptability
- **History Dashboard** — Comprehensive historical view with statistics overview and detailed bet records
- **History Statistics** — Quick stats cards showing total bets, win rate, average odds, and total profit/loss
- **History Table** — Paginated table showing all-time bets with built-in search filters (no graphs). Includes player info, tournament, surface, odds, stake, profit, ROI label, and bet outcome. Navigation buttons to browse through pages.

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
- **A Supabase project** — [Create one at supabase.com](https://supabase.com/dashboard)

### 1. Clone the repository

Open your terminal (in VS Code: press `Ctrl+`` or `Cmd+`` on Mac) and run:

```bash
git clone https://github.com/YOUR_USERNAME/value-bet-ai.git
cd value-bet-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a file named `.env.local` in the root folder of your project. This file stores sensitive configuration that your app needs to connect to Supabase.

> 💡 **What is `.env.local`?** It's a configuration file where you store private keys and URLs that your app needs to work. The `.local` part means it's ignored by git, so your secrets stay private.

Copy the template from `.env.example` and fill in your values:

```bash
cp .env.example .env.local
```

Open `.env.local` in your editor and replace the placeholder values:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public key for Supabase client |

### Steps to find your Supabase credentials:

1. Go to [supabase.com](https://supabase.com/dashboard) and log in
2. Select your project
3. Click **Project Settings** (gear icon) in the left sidebar
4. Click **API** in the settings menu
5. Find **Project URL** — copy it to `NEXT_PUBLIC_SUPABASE_URL`
6. Find **anon/public** key under "Project API keys" — copy it to `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🧪 Running Tests

Unit tests automatically check that specific parts of your app (like forms) work correctly without errors.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/AuthForm.test.tsx
```

### Watch mode (re-runs tests when files change)

```bash
npx jest --watch
```

### Understanding test output

- **PASS** (green) — All tests passed, everything works correctly
- **FAIL** (red) — Something broke, check the error message below for details

### What the tests cover

Based on the test files detected, the current test suite covers:

- **AuthForm component** — Tests for the authentication form (login/signup) including input validation, form submission, and error handling

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages and layouts
│   ├── components/
│   │   ├── dashboard/          # Dashboard-specific components
│   │   │   ├── history/        # History page components
│   │   │   │   ├── HistoryContent.tsx   # Main history page wrapper
│   │   │   │   └── HistoryTable.tsx     # Paginated table with filters
│   │   │   └── ...
│   │   └── ...
│   ├── lib/                    # Utility functions and Supabase client
│   └── ...
├── __tests__/                  # Jest test files
├── public/                     # Static assets
├── .env.example                # Environment variable template
└── .env.local                  # Your local environment variables (create from .env.example)
```

## 🚀 Deploy to Vercel

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step

1. Click the "Deploy with Vercel" button above (or go to [vercel.com/new](https://vercel.com/new))
2. Import your GitHub repository (`value-bet-ai`)
3. Vercel will auto-detect Next.js — click **Deploy**
4. Once deployed, go to your project → **Settings** → **Environment Variables**
5. Add all variables from your `.env.local` file:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | (your Supabase URL) |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (your Supabase anon key) |

6. Click **Save** and trigger a **Redeploy** from the Deployments tab

> ⚠️ **Important**: Make sure to add ALL environment variables in Vercel. If any are missing, the app will fail to connect to Supabase.

## 📝 License

MIT