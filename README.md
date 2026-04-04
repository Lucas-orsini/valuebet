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
- **Bankroll Tracker** — Track performance with Auto (AI tracking) or Custom (manual) modes with contextual help tooltips explaining each mode
- **Bankroll KPIs** — Real-time profit/loss tracking with color-coded statistics: white numbers with green/red evolution indicators

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Database/Auth**: Supabase (SSR + Client)
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library
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

Create a file named `.env.local` in the root of your project. This file stores secret keys that connect your app to Supabase (your database service).

> 💡 **What is a .env.local file?** It's a hidden configuration file that holds sensitive information like API keys. It stays on your computer and is never uploaded to GitHub.

Create the file with this exact content:

```bash
touch .env.local
```

Then add these two lines to your `.env.local` file:

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
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Yes | [Supabase Dashboard](https://supabase.com/dashboard) → Your Project → Project Settings → API → **Project URL** | Your Supabase project endpoint |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Yes | [Supabase Dashboard](https://supabase.com/dashboard) → Your Project → Project Settings → API → **anon/public** key | Public API key for client-side access |

**Steps to find your Supabase credentials:**

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **Project Settings** (gear icon in the top navigation)
4. Scroll down to the **API** section
5. Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Copy the **anon/public** key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🧪 Running Tests

Unit tests automatically check that the app's core features work correctly without needing to open the browser.

### Run all tests

```bash
npm test
```

### Run a specific test file

```bash
npm test -- bankroll-data.test.tsx
```

or

```bash
npm test -- dashboard-data.test.ts
```

### Watch mode (re-runs tests automatically when files change)

```bash
npm test -- --watch
```

### Understanding test output

- **PASS** — All assertions passed, the code works correctly
- **FAIL** — Something broke, you'll see which test failed and why (with red error messages)

The tests cover:

- Bankroll data calculations (ROI, win/loss rates, profit)
- Dashboard statistics (KPI metrics, chart data)

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Landing page
│   │   ├── dashboard/         # Protected dashboard routes
│   │   └── ...
│   ├── components/            # React components
│   │   ├── dashboard/         # Dashboard components
│   │   │   ├── bankroll/      # Bankroll tracker components
│   │   │   │   ├── BankrollHeader.tsx
│   │   │   │   ├── BankrollCurve.tsx
│   │   │   │   ├── BankrollKpis.tsx
│   │   │   │   └── BetsTrackingTable.tsx
│   │   │   └── KpiCards.tsx
│   │   └── ...
│   └── lib/                   # Utilities and Supabase client
├── components/
│   ├── bankroll-data.ts       # Bankroll data logic
│   ├── bankroll-tracker.tsx   # Main bankroll tracker component
│   └── __tests__/             # Test files
├── __tests__/                 # Additional test files
├── types/
│   └── index.ts               # TypeScript type definitions
├── jest.config.js             # Jest configuration
├── jest.setup.ts              # Jest setup file
└── .env.local                 # Environment variables (create this)
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step deployment

1. **Connect your repository**
   - Click the "Deploy with Vercel" button above
   - Or go to [vercel.com/new](https://vercel.com/new)
   - Click **"Import Third-Party Git Repository"**
   - Connect your GitHub account and select your `value-bet-ai` repository

2. **Add environment variables**
   - In the Vercel dashboard, go to **Settings** → **Environment Variables**
   - Add these two variables:
     - `NEXT_PUBLIC_SUPABASE_URL` → your Supabase Project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → your Supabase anon key
   - **Important**: Make sure both variables are set for **Production**, **Preview**, and **Development** environments

3. **Deploy**
   - Click **Deploy** — Vercel will automatically build and deploy your app
   - Wait 1-2 minutes for the build to complete
   - Your live site will be available at `https://your-project.vercel.app`

> 💡 **Supabase still needed**: After deploying, you still need a running Supabase project. Make sure your Supabase project is active and the database tables are set up.

## 📝 License

MIT License — feel free to use this project for personal or commercial purposes.