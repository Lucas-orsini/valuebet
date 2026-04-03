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
- **Bankroll KPIs** — Real-time performance metrics including total profit, ROI, and win rate
- **Dashboard Sidebar Navigation** — Clean sidebar with navigation to Dashboard, History, Settings, and logout. Displays live user information (username, email) fetched from the database

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Database/Auth**: Supabase (SSR authentication)
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- [Node.js 18+](https://nodejs.org/) installed on your machine
- [VS Code](https://code.visualstudio.com/) recommended as your code editor
- Git installed
- A Supabase account

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/value-bet-ai.git
cd value-bet-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a file named `.env.local` in the root directory of your project. This file stores sensitive configuration that your app needs to connect to Supabase.

Create the file by running:

```bash
touch .env.local
```

Then open `.env.local` in your code editor and add the following content:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**How to get these values from Supabase:**

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click on your project
3. In the left sidebar, click **Project Settings** (the gear icon ⚙️)
4. Click on **API** in the settings menu
5. Under **Project API credentials**, find:
   - **Project URL** — copy this for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public** key — copy this for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (backtick, usually below Escape) on Windows/Linux, or `Cmd+`` on Mac. Then run the commands above directly in the terminal.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project connection URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public key for Supabase client (safe to expose) |

## 🧪 Running Tests

Unit tests automatically verify that individual parts of the code work correctly.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/dashboard-data.test.ts
```

Run tests in watch mode (re-runs automatically when you save changes):

```bash
npx jest --watch
```

**How to read the output:**
- **PASS** ✅ — All tests in that file passed (your code works correctly)
- **FAIL** ❌ — Something broke. The output shows which test failed and why
- Tests cover: Dashboard data fetching and processing

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router - all pages and layouts
│   ├── (auth)/              # Auth route group with shared layout
│   │   ├── login/           # Login page
│   │   └── signup/          # Signup page
│   ├── dashboard/           # Protected dashboard pages
│   │   ├── history/         # Bet history view
│   │   └── page.tsx        # Main dashboard
│   ├── api/                 # API routes
│   ├── globals.css          # Global styles
│   └── layout.tsx          # Root layout
├── components/
│   ├── dashboard/           # Dashboard-specific components
│   │   ├── DashboardSidebar.tsx  # Sidebar navigation with user info
│   │   └── UserSection.tsx       # User info display (fetches from DB)
│   └── ui/                  # Reusable UI components (Button, Input, etc.)
├── lib/
│   ├── supabase/            # Supabase client setup (SSR)
│   └── utils.ts             # Utility functions (cn helper)
└── types/                   # TypeScript type definitions
```

**Key files modified in this update:**
- `src/components/dashboard/DashboardSidebar.tsx` — Sidebar navigation with Settings above Logout, no "Mes Paris" or "Analyses"
- `src/components/dashboard/UserSection.tsx` — Fetches and displays authenticated user info from Supabase database

## 🚀 Deploy to Vercel

The easiest way to deploy your Next.js app is with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. Click the **Deploy with Vercel** button above (or go to [vercel.com/new](https://vercel.com/new))
2. **Import Git Repository** — Connect your GitHub account and select your `value-bet-ai` repository
3. **Configure Project** — Vercel auto-detects Next.js, no build command changes needed
4. **Add Environment Variables** — Expand "Environment Variables" and add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
5. Click **Deploy** — Your site will be live at `https://your-project.vercel.app`

> ⚠️ **Important**: Make sure to add all environment variables from your `.env.local` file to Vercel. If you skip this, your app won't connect to Supabase properly.

## 📝 License

MIT