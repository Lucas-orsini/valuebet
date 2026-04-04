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
- A Supabase account — [Sign up free](https://supabase.com/)

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

Create a file named `.env.local` in the root folder of the project. This file stores sensitive configuration that your app needs to connect to Supabase and other services.

Copy the template below into `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> 💡 **What is .env.local?** It's a local configuration file that keeps your API keys safe. It's automatically ignored by Git so your secrets never get pushed to GitHub.

### 4. Run the development server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

> 💡 **VS Code tip**: open the integrated terminal with `Ctrl+`` (or `Cmd+`` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard > Project Settings > API > Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard > Project Settings > API > anon / public key | Your Supabase anonymous/public key for client-side auth |

**Steps to find Supabase credentials:**

1. Go to [supabase.com](https://supabase.com) and sign in
2. Select your project
3. Click **Project Settings** (the gear icon) in the left sidebar
4. Click **API** under the Settings section
5. Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Copy the **anon / public** key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🧪 Running Tests

Unit tests automatically check that specific parts of the app (like the dashboard data functions) work correctly without needing the full app running.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/dashboard-data.test.ts
```

Watch mode (re-runs tests automatically when you save a file):

```bash
npx jest --watch
```

**How to read Jest output:**

- **PASS** — All tests passed, everything is working correctly
- **FAIL** — Something broke. Look at the error message below to see which test failed and why

The test suite covers: Dashboard data calculations, ROI labels, bet status logic, and data transformation utilities.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── globals.css         # Global styles, CSS variables, and Tailwind directives
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Landing page
├── components/
│   ├── dashboard/          # Dashboard components
│   │   ├── SurfaceStats.tsx # Surface (clay/hard/grass) ROI statistics
│   │   └── ...             # Other dashboard components
│   └── ...                 # Shared components
└── lib/                    # Utilities, Supabase client, and helpers
```

Key folders:

- **src/app/** — Next.js pages and layouts (routing, metadata, global styles)
- **src/components/** — React components organized by feature (dashboard, shared, etc.)
- **src/lib/** — Supabase client setup, utility functions, and shared logic

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the "Deploy with Vercel" button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository (`value-bet-ai`)
3. In the **Environment Variables** section, add all variables from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase anon key
4. Click **Deploy**

Vercel will automatically detect Next.js and configure the build settings. Once deployed, your app will be live at a `.vercel.app` URL.

> ⚠️ **Important**: Make sure all environment variables from `.env.local` are added to Vercel > Settings > Environment Variables, otherwise the app will break in production.

## 📝 License

MIT