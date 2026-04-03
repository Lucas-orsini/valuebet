# value-bet-ai

AI-powered sports betting value detection platform that identifies mispriced odds across major sportsbooks.

## ✨ Features

- **User Authentication** — Secure signup and login with email and password via Supabase Auth (no email verification required)
- **Protected Dashboard** — Dashboard is only accessible when logged in; unauthenticated users are redirected to the landing page
- **Session Persistence** — Uses Supabase SSR for proper cookie-based session management across server and client
- **Dashboard Overview** — Real-time tracking of active bets with ROI labels (🟢🟡🟠🔴), player info, odds, break-even and units
- **Value of the Day** — Daily recommended bets with centered odds display, color-coded risk badges, and smooth hover animations: 🟢 Optimal ROI, 🟡 Correct ROI, 🟠 Risky ROI, 🔴 Very Risky ROI
- **Live Bet Status** — Instant status updates showing pending, won, or lost bets
- **KPI Dashboard** — Global ROI, win/loss rate, total profit in units, and current winning streak at a glance
- **Bankroll Performance Chart** — Visual curve of bankroll growth over time with flat betting comparison
- **History Dashboard** — Comprehensive historical view with statistics overview and detailed bet records
- **History Filtering** — Filter history data by time period: 1 month, 3 months, 6 months, 1 year, or all time
- **Period Filter Global Control** — Period filter affecting all dashboard statistics and charts
- **History Statistics** — Quick stats cards showing total bets, win rate, average odds, and total profit/loss
- **Surface Statistics** — ROI breakdown for Clay, Hard, and Grass courts
- **History Chart** — Visual performance graph filtered by selected time period
- **History Table** — Paginated table with search filters, player info, tournament, surface, odds, stake, profit, ROI label, and bet outcome
- **Bankroll Tracker** — Track performance with Auto (AI tracking) or Custom (manual) modes
- **Bankroll KPIs** — Real-time profit/loss tracking and performance metrics

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

Create a file named `.env.local` in the root folder of the project (same level as `package.json`).

This file stores sensitive configuration that your app needs to connect to external services. **Never share this file or commit it to Git.**

Copy the template and fill in your values:

```bash
cp .env.example .env.local
```

Then open `.env.local` in your code editor and replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac) — the backtick key, usually near the Escape key.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project connection URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public API key for client-side authentication |

**Steps to find Supabase credentials:**

1. Go to [supabase.com](https://supabase.com) and sign in
2. Select your project (or create a new one)
3. Click **Project Settings** (gear icon) in the left sidebar
4. Click **API** under the Project Settings section
5. Find **Project URL** — copy it into `NEXT_PUBLIC_SUPABASE_URL`
6. Find **anon/public** key under "Project API keys" — copy it into `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🧪 Running Tests

Tests automatically verify that the dashboard components render correctly and display the expected data.

Unit tests check individual pieces of your application to make sure they work correctly — think of them as quality control checks for your code.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/dashboard-data.test.ts
```

### Watch mode (re-runs tests automatically when files change)

```bash
npx jest --watch
```

### Understanding test output

- **PASS** (green) = All checks passed, everything works correctly
- **FAIL** (red) = Something is broken — the output shows which test failed and why
- **√** or **✓** = Individual test case passed
- **×** or **✕** = Individual test case failed

### What the tests cover

Based on the test files detected, the following are tested:

- `__tests__/dashboard-data.test.ts` — Dashboard data rendering and display logic

## 📁 Project Structure

```
value-bet-ai/
├── __tests__/              # Jest unit tests
├── public/                 # Static assets (images, fonts)
├── src/
│   ├── app/                # Next.js App Router pages and layouts
│   ├── components/        # Reusable React components
│   │   └── dashboard/      # Dashboard-specific components
│   │       └── ValueOfTheDay.tsx  # Value of the Day feature with aligned elements
│   ├── lib/                # Utility functions and Supabase client setup
│   └── types/              # TypeScript type definitions
├── .env.example            # Environment variable template
├── .env.local              # Your local environment variables (not committed)
├── package.json            # Dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🚀 Deploy to Vercel

The easiest way to deploy your Next.js app is with Vercel.

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step-by-step deployment

**Step 1: Push your code to GitHub**

If you haven't already, create a GitHub repository and push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/value-bet-ai.git
git push -u origin main
```

**Step 2: Import to Vercel**

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings

**Step 3: Add environment variables**

Before deploying, add your Supabase credentials in Vercel:

1. In your project, go to **Settings** → **Environment Variables**
2. Add each variable from your `.env.local` file:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

**Step 4: Deploy**

Click **Deploy** — Vercel will build and deploy your app.

Your live site will be available at `https://your-project.vercel.app`.

> ⚠️ **Important**: Make sure all environment variables from `.env.local` are added to Vercel, otherwise your app will not connect to Supabase properly.

## 📝 License

MIT