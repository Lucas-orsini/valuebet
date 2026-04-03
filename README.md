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
- **Bankroll Tracker** — Track your betting performance with two modes:
  - **Mode Automatique** (default) — Automatically follows all AI bets, calculates P&L using recommended units on your bankroll, displays real-time curve, profit/loss in €, personal ROI, and bet count. Zero action required.
  - **Mode Personnalisé** — See all bets, toggle each one on/off to mark if you played it, and adjust the actual odds you received (e.g., 1.72 on Betclic instead of 1.70 on Winamax). The tracker recalculates your curve based on your real bets.
- **Bankroll KPIs** — Current bankroll in €, profit/loss in €, ROI in %, and current streak
- **Bankroll Chart** — Visual curve showing your bankroll over time
- **Bet History Summary** — Table of recent bets with results and profit/loss in €
- **History Dashboard** — Comprehensive historical view with statistics overview and detailed bet records
- **History Filtering** — Filter history data by time period: 1 month, 3 months, 6 months, 1 year, or all time directly from the dashboard header
- **Period Filter Global Control** — Period filter positioned above "Total des paris" section, affecting all dashboard statistics and charts across the entire history page
- **History Statistics** — Quick stats cards showing total bets, win rate, average odds, and total profit/loss filtered by selected time period
- **Surface Statistics** — ROI breakdown for Clay, Hard, and Grass courts available in the history section to validate model adaptability
- **History Chart** — Visual performance graph filtered by selected time period
- **History Table** — Paginated table showing all-time bets with persistent search filters that remain visible even when no results match. Includes player info, tournament, surface, odds, stake, profit, ROI label, and bet outcome. Navigation buttons to browse through pages
- **Enhanced History Filter UI** — Redesigned filter controls in the dashboard header with improved positioning, styling, and UX for seamless time period selection

## 🛠️ Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS
- **Animations** — Framer Motion
- **Icons** — Lucide React
- **Charts** — Recharts
- **Database** — Supabase (PostgreSQL with SSR support)
- **Authentication** — Supabase Auth
- **Testing** — Jest with React Testing Library

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ — [Download from nodejs.org](https://nodejs.org/)
- A code editor — [VS Code](https://code.visualstudio.com/) is recommended
- Git installed — [Download git](https://git-scm.com/downloads)
- A Supabase account — [Create free project](https://supabase.com)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/value-bet-ai.git
cd value-bet-ai
```

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac)

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a file named `.env.local` in the root directory of your project. This file stores sensitive configuration that shouldn't be committed to GitHub.

```bash
touch .env.local
```

Open `.env.local` in your code editor and add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

See [🔑 Environment Variables](#-environment-variables) below for where to find these values.

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project connection URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public API key for client-side authentication |

### Steps to find Supabase credentials:

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click on your project
3. Navigate to **Project Settings** (gear icon)
4. Click on **API** in the sidebar
5. Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Copy the **anon/public** key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🧪 Running Tests

Tests verify that the app's components work correctly by checking their behavior automatically.

```bash
# Run all tests
npx jest

# Run a specific test file
npx jest __tests__/AuthForm.test.tsx

# Watch mode (re-runs tests automatically when files change)
npx jest --watch
```

**Understanding test output:**
- **PASS** (green) — All tests passed, everything works correctly
- **FAIL** (red) — Something broke, check the error message below for which test failed and why

**Tests included:**
- `__tests__/AuthForm.test.tsx` — Authentication form component tests

## 📁 Project Structure

```
value-bet-ai/
├── __tests__/                    # Jest test files
│   └── AuthForm.test.tsx
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── (auth)/              # Auth route group with shared layout
│   │   ├── dashboard/           # Protected dashboard pages
│   │   │   ├── bankroll/        # Bankroll Tracker page
│   │   │   └── page.tsx         # Main dashboard
│   │   └── page.tsx             # Landing page
│   ├── components/
│   │   └── dashboard/           # Dashboard components
│   │       └── bankroll/        # Bankroll Tracker sub-components
│   │           ├── BankrollHeader.tsx
│   │           ├── BankrollChart.tsx
│   │           ├── BankrollKpis.tsx
│   │           ├── BetSelector.tsx
│   │           └── BetHistorySummary.tsx
│   ├── lib/                      # Utility functions
│   │   ├── bankroll-data.ts     # Bankroll calculations
│   │   └── dashboard-data.ts    # Dashboard data fetching
│   ├── types/                    # TypeScript type definitions
│   │   └── bankroll.ts          # Bankroll-related types
│   └── types/                    # TypeScript types
├── .env.local                    # Environment variables (create this)
├── .env.example                  # Example environment file
└── package.json                  # Dependencies and scripts
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. **Import your repository** — Click "Import Project" on Vercel, select your GitHub repo
2. **Configure project** — Vercel auto-detects Next.js settings
3. **Add environment variables** — Go to Settings → Environment Variables and add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
4. **Deploy** — Click "Deploy"

> ⚠️ **Important**: Make sure to add all environment variables from `.env.local` to Vercel before deploying. The app will not work without these values.

## 📝 License

MIT