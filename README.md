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

Create a file named `.env.local` in the root folder of your project. This file stores private configuration settings that your app needs to connect to Supabase.

> 💡 **What is a .env.local file?** It's a hidden configuration file where you store sensitive information (like API keys and passwords) that shouldn't be committed to GitHub. Each environment variable is on its own line in the format `KEY=value`.

Create the file with this exact content:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**How to get your Supabase credentials:**

1. Go to [supabase.com](https://supabase.com) and sign in to your account
2. Select your project
3. Click **Project Settings** (the gear icon) in the left sidebar
4. Click **API**
5. Under **Project URL** — copy the URL and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Under **anon public** — click **Copy** and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Your `.env.local` file should look like this (with real values instead of placeholders):

```
NEXT_PUBLIC_SUPABASE_URL=https://xyz123.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (Windows/Linux) or `` Cmd+` `` (Mac). Then type `npm run dev` and press Enter.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon public key | Anonymous API key for client-side requests |

## 🧪 Running Tests

Unit tests automatically check that individual parts of the code work correctly without needing the full application running.

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/dashboard-data.test.ts
```

Run tests in watch mode (re-runs automatically when files change):

```bash
npx jest --watch
```

**How to read Jest output:**
- `PASS` — All tests passed ✅
- `FAIL` — Something broke ❌ (shows which test failed and why)

**Tests included:**
- `__tests__/dashboard-data.test.ts` — Dashboard data calculations and utilities

## 📁 Project Structure

```
value-bet-ai/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── dashboard/            # Protected dashboard routes
│   │   │   ├── bankroll/         # Bankroll tracking page
│   │   │   └── history/          # Bet history page
│   │   ├── api/                  # API routes (backend endpoints)
│   │   ├── layout.tsx            # Root layout with providers
│   │   ├── page.tsx              # Landing page
│   │   └── globals.css           # Global styles
│   ├── components/              # Reusable React components
│   │   ├── dashboard/           # Dashboard-specific components
│   │   │   ├── bankroll/        # Bankroll tracking components
│   │   │   │   └── BetsTrackingTable.tsx
│   │   │   └── history/         # History components
│   │   ├── ui/                  # Generic UI components (buttons, cards)
│   │   └── LandingPage.tsx      # Landing page components
│   ├── lib/                     # Utilities and helpers
│   │   └── supabase/            # Supabase client setup
│   └── types/                   # TypeScript type definitions
├── __tests__/                   # Jest test files
│   └── dashboard-data.test.ts
├── public/                      # Static assets (images, fonts)
├── .env.local                   # Environment variables (NOT committed to git)
├── .env.example                 # Template for environment variables
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── jest.config.js               # Jest configuration
└── package.json                 # Dependencies and scripts
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the **Deploy with Vercel** button above (or go to [vercel.com/new](https://vercel.com/new))
2. Import your GitHub repository (`value-bet-ai`)
3. In the **Environment Variables** section, add each variable from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
4. Click **Deploy**

Vercel will automatically build and deploy your app. Once done, you'll get a live URL like `https://your-project.vercel.app`.

> ⚠️ **Important**: Make sure all environment variables from `.env.local` are added to Vercel → Settings → Environment Variables. If any are missing, the app will fail to connect to Supabase.

## 📝 License

MIT