# value-bet-ai

AI-powered sports betting value detection platform that identifies mispriced odds across major sportsbooks.

## ✨ Features

- **User Authentication** — Secure signup and login with email and password via Supabase Auth (no email verification required)
- **Protected Dashboard** — Dashboard is only accessible when logged in; unauthenticated users are redirected to the landing page
- **Session Persistence** — Uses Supabase SSR for proper cookie-based session management across server and client
- **Dashboard Overview** — Real-time tracking of active bets with ROI labels (🟢🟡🟠🔴), player info, odds, break-even and units
- **Value of the Day** — Daily recommended bets with centered odds display, color-coded risk badges, and smooth hover animations: 🟢 Optimal ROI, 🟡 Correct ROI, 🟠 Risky ROI, 🔴 Very Risky ROI
- **Smart Tooltip Positioning** — Hover tooltip that keeps its arrow aligned with your cursor horizontally while repositioning to stay within the viewport bounds
- **Live Bet Status** — Instant status updates showing pending, won, or lost bets
- **KPI Dashboard** — Global ROI, win/loss rate, total profit in units, and current winning streak at a glance with yellow icons on yellow backgrounds, white stats, and green/red evolution indicators
- **Bankroll Performance Chart** — Visual curve of bankroll growth over time with flat betting comparison
- **Bankroll Tracker** — Track performance with Auto (AI tracking) or Custom (manual) modes, with a "?" icon tooltip explaining the difference between the two modes
- **Bankroll KPIs** — Real-time profit/loss tracking and performance metrics with visual indicators
- **Bankroll History** — Comprehensive tracking table with detailed bet records, odds, stakes, and outcomes
- **History Dashboard** — Comprehensive historical view with statistics overview and detailed bet records
- **History Filtering** — Filter history data by time period: 1 month, 3 months, 6 months, 1 year, or all time
- **Period Filter Global Control** — Period filter affecting all dashboard statistics and charts
- **History Statistics** — Quick stats cards showing total bets, win rate, average odds, and total profit/loss
- **Surface Statistics** — ROI breakdown for Clay, Hard, and Grass courts
- **History Chart** — Visual performance graph filtered by selected time period
- **History Table** — Paginated table with search filters, player info, tournament, surface, odds, stake, profit, ROI label, and bet outcome

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables for bankroll theme colors
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Database/Auth**: Supabase (SSR + Client)
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library + Playwright
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ — [Download here](https://nodejs.org/)
- A code editor — [VS Code](https://code.visualstudio.com/) recommended
- Git installed
- A Supabase account — [Sign up here](https://supabase.com/)

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

Create a file named `.env.local` in the root directory of the project. This file stores sensitive configuration that shouldn't be committed to git.

> 💡 **What is a .env.local file?** It's a configuration file where you store API keys, passwords, and other secrets. The `.local` part means it's ignored by git, so your secrets stay private.

Add the following content to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

For each variable:

| Variable | What it is | Where to find it |
|----------|------------|------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Go to [Supabase Dashboard](https://supabase.com/dashboard) → Select your project → **Project Settings** → **API** → Look for **Project URL** → Copy it |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public API key for your project | Go to Supabase Dashboard → Select your project → **Project Settings** → **API** → Look for **anon public** under **Project API keys** → Copy it |

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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon public key | Public key for Supabase client |

## 🎨 CSS Variables (Bankroll Theme)

The bankroll page and its associated components use CSS variables defined in `src/app/globals.css`. These variables can be customized to change the theme colors without modifying component code.

Key bankroll-related CSS variables include color definitions used throughout the bankroll tracking system.

## 🧪 Running Tests

Unit tests automatically check that individual parts of the code work correctly.

```bash
# Run all tests
npx jest

# Run a specific test file
npx jest __tests__/dashboard-data.test.ts

# Watch mode (re-runs tests on file change)
npx jest --watch
```

**How to read Jest output:**

- `PASS` — All tests in that file passed ✅
- `FAIL` — Something broke ❌ — the output shows which test failed and why

The dashboard data test covers: data transformation, ROI calculations, and statistics aggregation.

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages and layouts
│   │   ├── globals.css         # Global styles and CSS variables
│   │   ├── page.tsx            # Landing page
│   │   ├── dashboard/         # Protected dashboard pages
│   │   ├── auth/              # Authentication pages
│   │   └── layout.tsx          # Root layout
│   ├── components/            # Reusable React components
│   │   ├── ui/                # Base UI components
│   │   ├── dashboard/         # Dashboard-specific components
│   │   └── bankroll/          # Bankroll tracker components
│   ├── lib/                   # Utility functions and Supabase client
│   │   └── supabase/          # Supabase client setup
│   └── types/                 # TypeScript type definitions
├── __tests__/                 # Jest test files
├── public/                    # Static assets
└── package.json               # Dependencies and scripts
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. **Import your repository** — Click "Import Project" on Vercel, select your GitHub repo
2. **Add environment variables** — In the Vercel dashboard, go to **Settings → Environment Variables** and add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
3. **Deploy** — Click "Deploy" and wait ~1 minute
4. **Done!** — Your app is live at `your-project.vercel.app`

> ⚠️ **Important**: Make sure all `.env.local` variables are added to Vercel before deploying, otherwise the app won't connect to Supabase.

## 📝 License

MIT