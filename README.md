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
- **Bankroll Tracker** — Dedicated page to track your betting performance with two modes: Automatic (follows AI recommendations automatically) and Custom (manual selection and odds adjustment per bet)
- **Bankroll KPIs** — Real-time metrics including current bankroll, profit/loss in €, personal ROI percentage, and current winning/losing streak
- **Bankroll Curve** — Visual chart showing your bankroll growth over time
- **Bets Summary Table** — Detailed table of recent bets with individual results and gain/loss in €

## 🛠️ Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS
- **Animations** — Framer Motion
- **Icons** — Lucide React
- **Charts** — Recharts
- **Database** — Supabase (PostgreSQL + Auth)
- **Testing** — Jest + React Testing Library

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** — [Download here](https://nodejs.org/)
- **A code editor** — We recommend [VS Code](https://code.visualstudio.com/) with the Tailwind CSS IntelliSense extension
- **Git installed** — [Download here](https://git-scm.com/)
- **A Supabase account** — [Sign up free](https://supabase.com/)

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

Create a `.env.local` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env.local
```

Open `.env.local` in your code editor and fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac), then run the commands above.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API → **Project URL** | Your Supabase project connection URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API → **anon/public** key | Public API key for client-side authentication |

Steps to find your Supabase credentials:
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Click **Project Settings** (gear icon)
4. Click **API** in the sidebar
5. Copy the **Project URL** and **anon/public** key values
6. Paste them into your `.env.local` file

## 🧪 Running Tests

Tests verify that individual pieces of your application work correctly without needing the whole app running.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/AuthForm.test.tsx
```

### Watch mode (re-runs on file change)

```bash
npx jest --watch
```

### Understanding test output

- **PASS** — All tests in that file passed ✅
- **FAIL** — Something broke ❌ The output will show which test failed and why (expected vs received values)

The current test suite covers:
- **AuthForm** — Login/signup form validation and submission behavior

## 📁 Project Structure

```
value-bet-ai/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── (auth)/               # Auth group: login/signup pages
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── dashboard/            # Protected dashboard routes
│   │   │   ├── bankroll/         # Bankroll tracker page
│   │   │   └── page.tsx          # Main dashboard overview
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx             # Landing page
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── bankroll/         # Bankroll tracker components
│   │   │   │   ├── BankrollChart.tsx      # Visual bankroll curve
│   │   │   │   ├── BankrollBetsTable.tsx  # Bets summary table
│   │   │   │   └── BankrollTracker.tsx    # Main tracker component
│   │   │   └── DashboardSidebar.tsx       # Navigation sidebar
│   │   └── ui/                   # Reusable UI components
│   ├── lib/
│   │   ├── bankroll-calculations.ts  # P&L and ROI calculation logic
│   │   ├── mock-bets-data.ts         # Sample bet data for testing
│   │   └── supabase/             # Supabase client setup
│   └── types/
│       └── bankroll.ts           # TypeScript types for bankroll data
├── __tests__/                    # Jest test files
├── public/                       # Static assets
├── .env.example                  # Environment template
├── .env.local                    # Your local environment (git-ignored)
└── package.json
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. **Connect your repository**
   - Click the "Deploy with Vercel" button above, OR
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your GitHub/GitLab repo (`value-bet-ai`)

2. **Add environment variables**
   - In the Vercel dashboard, go to **Settings** → **Environment Variables**
   - Add each variable from your `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

3. **Deploy**
   - Click **Deploy**
   - Wait for the build to complete (~2 minutes)
   - Your app will be live at `https://your-project.vercel.app`

> ⚠️ **Important**: Make sure to add ALL environment variables in Vercel, otherwise the app will not connect to your Supabase database.

## 📝 License

MIT