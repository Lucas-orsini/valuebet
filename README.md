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
- **KPI Dashboard** — Global ROI, win/loss rate, total profit in units, and current winning streak at a glance
- **KPI Visual Polish** — Yellow icons for all KPIs with white statistics and color-coded evolution indicators (green for profit, red for loss)
- **Bankroll Performance Chart** — Visual curve of bankroll growth over time with flat betting comparison
- **Bankroll Tracker** — Track performance with Auto (AI tracking) or Custom (manual) modes
- **Bankroll Mode Tooltip** — Hover "?" icon reveals helpful explanation distinguishing automatic (AI-driven) from custom (manual) tracking modes
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
- **Styling**: Tailwind CSS
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
- A Supabase account — [Sign up free](https://supabase.com)

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

Create a file named `.env.local` in the root of the project (same folder where `package.json` is located). This file stores secret keys that your app needs to connect to Supabase.

> 💡 **What is a .env.local file?** It's a configuration file where you store sensitive information (like API keys) that shouldn't be committed to GitHub. Think of it as your app's private settings.

Copy this template into your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**How to get your Supabase credentials:**

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click on your project
3. Go to **Project Settings** (gear icon near the top)
4. Click on **API** in the sidebar
5. Under **Project URL**, copy the URL and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Under **anon public** key, copy the key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac), then type the command above.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard > Project Settings > API > Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard > Project Settings > API > anon public key | Public API key for Supabase client |

## 🧪 Running Tests

Unit tests automatically check that specific parts of the app (like components and functions) work correctly without errors.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/dashboard-data.test.ts
```

### Watch mode (re-runs on file change)

```bash
npx jest --watch
```

### Reading test output

- **PASS** — All checks passed, the code works correctly
- **FAIL** — Something broke, you'll see which test failed and why
- A green checkmark means success, a red X means failure

The test suite covers: dashboard data calculations, KPI metrics, bankroll tracking logic, and data transformations for charts.

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages and layouts
│   ├── components/
│   │   └── dashboard/
│   │       ├── bankroll/       # Bankroll tracker components
│   │       │   ├── BankrollHeader.tsx    # Header with Auto/Custom mode toggle + tooltip
│   │       │   └── BankrollKpis.tsx      # KPI cards with yellow icons
│   │       └── ...             # Other dashboard components
│   ├── lib/                    # Supabase client setup and utilities
│   └── types/                  # TypeScript type definitions
├── __tests__/                  # Jest test files
│   └── dashboard-data.test.ts
├── public/                     # Static assets
├── .env.local                  # Environment variables (create this)
└── package.json                # Dependencies and scripts
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. **Connect your repository**
   - Click the button above or go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository (`value-bet-ai`)
   - Vercel will automatically detect Next.js

2. **Add environment variables**
   - In Vercel dashboard, go to **Settings** > **Environment Variables**
   - Add both variables from your `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

3. **Deploy**
   - Click **Deploy** — Vercel will build and deploy automatically
   - Your site will be live at `https://your-project.vercel.app`

> ⚠️ **Important**: Make sure all environment variables are added in Vercel before deploying. Without them, the app won't connect to Supabase.

## 📝 License

MIT