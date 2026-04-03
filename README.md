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
- **History Dashboard** — Comprehensive historical view with statistics overview and detailed bet records
- **History Filtering** — Filter history data by time period: 1 month, 3 months, 6 months, 1 year, or all time directly from the dashboard header
- **Period Filter Global Control** — Period filter positioned above "Total des paris" section, affecting all dashboard statistics and charts across the entire history page
- **History Statistics** — Quick stats cards showing total bets, win rate, average odds, and total profit/loss filtered by selected time period
- **Surface Statistics** — ROI breakdown for Clay, Hard, and Grass courts available in the history section to validate model adaptability
- **History Chart** — Visual performance graph filtered by selected time period
- **History Table** — Paginated table showing all-time bets with persistent search filters that remain visible even when no results match. Includes player info, tournament, surface, odds, stake, profit, ROI label, and bet outcome. Navigation buttons to browse through pages
- **Enhanced History Filter UI** — Redesigned filter controls in the dashboard header with improved positioning, styling, and UX for seamless time period selection
- **Bankroll Tracker** — Track your betting performance with two modes: Auto (automatic AI bet tracking with real-time P&L) or Custom (manual bet selection and odds adjustment)
- **Bankroll KPIs** — Real-time metrics showing current bankroll, profit/loss in €, personal ROI, and current winning/losing streak
- **Bankroll Curve** — Interactive chart visualizing your bankroll growth over time with performance indicators
- **Bets Tracking Table** — Detailed table of all tracked bets with results, gains/losses in €, and status indicators

## 🛠️ Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS
- **Animations** — Framer Motion
- **Icons** — Lucide React
- **Charts** — Recharts
- **Database** — Supabase (PostgreSQL + Auth + Real-time)
- **Testing** — Jest + React Testing Library

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** — [Download from nodejs.org](https://nodejs.org/)
- **A code editor** — We recommend [VS Code](https://code.visualstudio.com/) with the "Tailwind CSS IntelliSense" extension
- **Git installed** — [Download git](https://git-scm.com/downloads)
- **A Supabase account** — [Sign up free at supabase.com](https://supabase.com)

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

Create a file named `.env.local` in the root folder of the project. This file stores sensitive settings that your app needs to connect to Supabase.

> 💡 **What is .env.local?** It's a configuration file where you store private information (like API keys) that shouldn't be shared publicly. Next.js automatically loads this file when running your app.

Copy this template into your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**How to get your Supabase credentials:**

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New project"** or select an existing project
3. In the sidebar, click **"Project Settings"** (the gear icon)
4. Click **"API"** in the top menu
5. Find **"Project URL"** — copy the entire URL (starts with `https://`)
6. Find **"anon public"** key under "Project API keys" — click **"Copy"** next to it
7. Paste both values into your `.env.local` file

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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public API key for client-side authentication |

## 🧪 Running Tests

> **What are unit tests?** Unit tests are small automated checks that verify specific parts of your code work correctly. They catch bugs before they reach production.

Tests are configured with Jest and React Testing Library. Currently, no test files exist yet, but when added, run them with:

**Run all tests:**
```bash
npx jest
```

**Run a specific test file:**
```bash
npx jest path/to/file.test.ts
```

**Watch mode (re-runs automatically when files change):**
```bash
npx jest --watch
```

**Understanding the output:**
- `PASS` — All tests passed, your code works correctly
- `FAIL` — Something broke, check the error message below for which test failed

**What tests will cover** (once added):
- Authentication flow (login, logout, protected routes)
- Dashboard components rendering
- Bankroll tracking calculations
- API interactions with Supabase

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Auth route group with shared layout
│   │   ├── login/page.tsx        # Login page
│   │   └── signup/page.tsx       # Signup page
│   ├── dashboard/                # Protected dashboard routes
│   │   ├── bankroll/page.tsx     # Bankroll Tracker page
│   │   ├── history/page.tsx      # History page
│   │   └── page.tsx             # Main dashboard overview
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/
│   ├── dashboard/                # Dashboard components
│   │   ├── DashboardSidebar.tsx  # Sidebar navigation
│   │   └── bankroll/             # Bankroll Tracker components
│   │       ├── BankrollHeader.tsx   # Header with bankroll input and mode toggle
│   │       ├── BankrollKpis.tsx     # KPI cards (bankroll, P&L, ROI, streak)
│   │       ├── BankrollCurve.tsx    # Bankroll growth chart
│   │       └── BetsTrackingTable.tsx # Bet list with tracking controls
│   └── ui/                       # Reusable UI components
├── lib/
│   ├── supabase/                 # Supabase client configuration
│   │   ├── client.ts            # Browser client
│   │   ├── server.ts            # Server client
│   │   └── middleware.ts       # Auth middleware
│   ├── bankroll-data.ts         # Bankroll tracking logic and utilities
│   └── utils.ts                 # Utility functions
└── styles/                      # Global styles
    └── globals.css              # Tailwind imports and base styles
```

## 🚀 Deploy to Vercel

Deploy your app to production in minutes with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the **"Deploy"** button above or go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your GitHub repo (`value-bet-ai`)
4. In the **Environment Variables** section, add all variables from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` → paste your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → paste your anon key
5. Click **"Deploy"**

Vercel will automatically detect Next.js and configure the build settings. Your app will be live at a URL like `your-app.vercel.app` within seconds.

> ⚠️ **Important**: Don't forget to add all environment variables in Vercel → Settings → Environment Variables before deploying, otherwise authentication and database features won't work.

## 📝 License

MIT