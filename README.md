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

Create a file named `.env.local` in the root of your project (same folder as package.json). This file stores secret keys that your app needs to connect to external services.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac). Then create the file by running:
> ```bash
> touch .env.local
> ```

Add the following content to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard > Project Settings > API > Project URL | Your Supabase project connection URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard > Project Settings > API > Project API keys > anon/public | Public API key for client-side authentication |

To find your Supabase credentials:

1. Go to [supabase.com](https://supabase.com) and log in
2. Select your project
3. Click **Project Settings** (gear icon) in the left sidebar
4. Click **API** under the Settings section
5. Copy the **Project URL** for `NEXT_PUBLIC_SUPABASE_URL`
6. Copy the **anon/public** key under **Project API keys** for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🧪 Running Tests

Unit tests automatically check that individual parts of the code work correctly. They run quickly and help catch bugs before they reach production.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/dashboard-data.test.ts
```

Watch mode (re-runs tests automatically when files change):

```bash
npx jest --watch
```

**Reading Jest output:**
- `PASS` — All tests passed ✅
- `FAIL` — Something broke ❌ (shows which test failed and why)

The test suite covers: Dashboard data calculations, ROI calculations, and data transformation functions in `src/components/dashboard/ValueOfTheDay.tsx`.

## 📁 Project Structure

```
├── __tests__/                  # Jest unit tests
├── public/                     # Static assets (images, icons)
├── src/
│   ├── app/                    # Next.js App Router pages and layouts
│   ├── components/             # React components
│   │   ├── dashboard/          # Dashboard-specific components (ValueOfTheDay.tsx, etc.)
│   │   └── ui/                 # Reusable UI components
│   ├── lib/                    # Utility functions, Supabase client setup
│   └── types/                  # TypeScript type definitions
├── .env.local                  # Environment variables (NOT committed to git)
├── .env.example                # Template for .env.local
├── jest.config.ts              # Jest configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🚀 Deploy to Vercel

The easiest way to deploy your Next.js app is with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the **Deploy with Vercel** button above (or go to [vercel.com/new](https://vercel.com/new))
2. Import your GitHub repository (`YOUR_USERNAME/value-bet-ai`)
3. In the **Environment Variables** section, add all variables from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase anon key
4. Click **Deploy**

Vercel will automatically detect your Next.js project and configure the build settings.

> ⚠️ **Important**: Make sure to add all environment variables in Vercel > Settings > Environment Variables before deploying. If you skip this step, your app will crash because it won't be able to connect to Supabase.

## 📝 License

MIT