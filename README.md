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

Create a file named `.env.local` in the root directory of your project (same folder as `package.json`). This file stores secret keys that connect your app to Supabase.

Open your terminal in VS Code:
- **VS Code**: Press `` Ctrl+` `` (Windows/Linux) or `` Cmd+` `` (Mac) to open the integrated terminal

Create the file:

```bash
touch .env.local
```

Then open it in your editor and add these exact lines:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `` Ctrl+` `` (Windows/Linux) or `` Cmd+` `` (Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | [Supabase Dashboard](https://supabase.com/dashboard) → Your Project → Project Settings → API → **Project URL** | Your Supabase project connection URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://supabase.com/dashboard) → Your Project → Project Settings → API → **anon/public** key | Public API key for client-side authentication |

**Steps to find Supabase credentials:**
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **Project Settings** (gear icon)
4. Click **API** in the sidebar
5. Copy the **Project URL** and paste into `NEXT_PUBLIC_SUPABASE_URL`
6. Copy the **anon/public** key and paste into `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🧪 Running Tests

Unit tests automatically check that individual parts of the code work correctly without needing the whole app running.

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

- **PASS** — All tests in that file passed ✅
- **FAIL** — Something broke, you'll see which test failed and why (expected vs received values)

**What the tests cover:**
- `__tests__/dashboard-data.test.ts` — Dashboard data fetching, ROI calculations, and data transformation logic

## 📁 Project Structure

```
value-bet-ai/
├── __tests__/                  # Jest unit tests
│   └── dashboard-data.test.ts  # Dashboard data tests
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Landing page
│   │   ├── dashboard/          # Protected dashboard routes
│   │   └── layout.tsx          # Root layout with providers
│   ├── components/
│   │   ├── dashboard/          # Dashboard-specific components
│   │   │   └── ValueOfTheDay.tsx # Daily value bets with smart tooltip
│   │   └── ui/                 # Reusable UI components
│   ├── lib/
│   │   ├── supabase/           # Supabase client setup (SSR + Client)
│   │   └── utils.ts            # Utility functions (cn, etc.)
│   └── types/                  # TypeScript type definitions
├── .env.local                  # Environment variables (not committed)
├── .env.example                # Example env file template
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/value-bet-ai.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click **Import Git Repository**
   - Select your GitHub repo

3. **Add environment variables**
   - In Vercel dashboard, go to **Settings** → **Environment Variables**
   - Add both variables from your `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

4. **Deploy**
   - Click **Deploy**
   - Vercel will automatically detect Next.js and configure everything

> ⚠️ **Important**: Make sure to add all `.env.local` variables to Vercel before deploying, otherwise authentication and database features won't work.

## 📝 License

MIT