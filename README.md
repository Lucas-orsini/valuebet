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
- **History Statistics** — Quick stats cards showing total bets, win rate, average odds, and total profit/loss filtered by selected time period
- **Surface Statistics** — ROI breakdown for Clay, Hard, and Grass courts available in the history section to validate model adaptability
- **History Chart** — Visual performance graph filtered by selected time period
- **History Table** — Paginated table showing all-time bets with persistent search filters that remain visible even when no results match. Includes player info, tournament, surface, odds, stake, profit, ROI label, and bet outcome. Navigation buttons to browse through pages.

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

Create a file named `.env.local` in the root folder of the project. This file stores secret keys that connect your app to Supabase.

In VS Code, create the file: click **File** > **New File** > name it `.env.local`

Add the following content to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: open the integrated terminal with `Ctrl+`` (or Cmd+`` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard > Project Settings > API > Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard > Project Settings > API > anon/public key | Your Supabase anonymous key for client-side requests |

To find these values:

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **Project Settings** (gear icon) in the left sidebar
4. Click **API** in the settings menu
5. Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Copy the **anon/public** key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🧪 Running Tests

Unit tests automatically check that individual parts of the code work correctly.

Run all tests:

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

How to read the output:
- **PASS** — All tests passed, your code works correctly
- **FAIL** — Something broke, check the error message below to see which test failed

Tests included:
- **AuthForm.test.tsx** — Tests for authentication form functionality

## 📁 Project Structure

- **`src/app/`** — Next.js App Router pages and layouts
  - **`dashboard/`** — Protected dashboard pages
    - **`page.tsx`** — Main dashboard with KPIs, active bets, and value of the day
    - **`history/page.tsx`** — Historical data with filtering by time period
- **`src/components/`** — Reusable React components
  - **`dashboard/`** — Dashboard-specific components
    - **`DashboardHeader.tsx`** — Dashboard header with time period filters (1M, 3M, 6M, 1Y, All)
    - **`history/`** — History section components
      - **`HistoryContent.tsx`** — Main history layout component
      - **`HistoryStats.tsx`** — Stats cards (total bets, win rate, avg odds, profit)
      - **`HistoryChart.tsx`** — Performance chart filtered by time period
      - **`HistoryTable.tsx`** — Paginated bet history table
      - **`SurfaceStats.tsx`** — Surface statistics (Clay, Hard, Grass)
- **`src/lib/`** — Utility functions and shared logic
  - **`dashboard-data.ts`** — Data fetching and transformation utilities
- **`__tests__/`** — Jest test files
  - **`AuthForm.test.tsx`** — Authentication form tests

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Step by step:

1. Click the **Deploy with Vercel** button above (or go to [vercel.com/new](https://vercel.com/new))
2. Import your GitHub repository (`value-bet-ai`)
3. In the **Environment Variables** section, add all variables from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
4. Click **Deploy**

After deployment, add the same environment variables in **Vercel Dashboard** > your project > **Settings** > **Environment Variables**.

## 📝 License

MIT