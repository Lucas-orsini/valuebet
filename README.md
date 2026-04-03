# value-bet-ai

AI-powered sports betting value detection platform that identifies mispriced odds across major sportsbooks.

## ✨ Features

- **User Authentication** — Secure signup and login with email and password via Supabase Auth (no email verification required)
- **Protected Dashboard** — Dashboard is only accessible when logged in; unauthenticated users are redirected to the landing page
- **Session Persistence** — Uses Supabase SSR for proper cookie-based session management across server and client
- **Dashboard Overview** — Real-time tracking of active bets with ROI labels (🟢🟡🟠🔴), player info, odds, break-even and units
- **Value of the Day** — Daily recommended bets with aligned odds display and color-coded risk badges: 🟢 Optimal ROI, 🟡 Correct ROI, 🟠 Risky ROI, 🔴 Very Risky ROI
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

Create `.env.local` with this exact content:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

For each variable, follow these steps to find the values:

**NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY:**
1. Go to [supabase.com](https://supabase.com) and log in
2. Click on your project
3. Click **Project Settings** (gear icon) in the left sidebar
4. Click **API** in the settings menu
5. Under **Project URL**, copy the URL and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Under **API Keys**, copy the `anon public` key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac), then type the command above.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon public key | Public API key for client-side requests |

## 🧪 Running Tests

Unit tests automatically check that specific parts of the application work correctly.

Run all tests:

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

**Reading Jest output:**
- `PASS` — All tests in that file passed ✅
- `FAIL` — Something broke ❌ — the error message shows exactly which test failed and why

The test file covers: dashboard data processing, value calculations, and ROI labeling logic.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
├── components/
│   ├── dashboard/          # Dashboard-specific components (including ValueOfTheDay.tsx)
│   │   └── ValueOfTheDay.tsx
│   └── ui/                 # Reusable UI components (Button, Input, etc.)
├── lib/
│   └── supabase/           # Supabase client configuration (SSR + client)
├── __tests__/              # Jest test files
│   └── dashboard-data.test.ts
└── styles/                # Global styles (Tailwind imports)
.env.local                  # Environment variables (create this)
.env.example                # Template for .env.local
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings** → **Environment Variables**
4. Add each variable from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
5. Click **Deploy**

Your app will be live at a Vercel URL (e.g., `your-app.vercel.app`).

## 📝 License

MIT