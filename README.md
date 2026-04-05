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
- **Styling**: Tailwind CSS with CSS custom properties for theming
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
- A Supabase account — [Create free account](https://supabase.com/)

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

Create a file named `.env.local` in the root directory of your project. This file stores sensitive configuration values that your app needs to connect to external services.

**How to create .env.local:**
1. In VS Code, click **File > New File**
2. Name it `.env.local`
3. Copy the template below and paste it in
4. Fill in your values (see instructions after the template)

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` (Windows/Linux) or `` Cmd+` `` (Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|-----------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API → Project API keys → `anon` key | Public API key for client-side requests |

**Steps to find your Supabase credentials:**

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Click **Project Settings** (gear icon) in the left sidebar
4. Click **API** under the Project Settings section
5. Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Copy the **anon public** key from the Project API keys section and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🧪 Running Tests

Unit tests verify that individual parts of your code work correctly. They automatically check functions and components without you needing to use the app.

**Run all tests:**

```bash
npx jest
```

**Run a specific test file:**

```bash
npx jest __tests__/dashboard-data.test.ts
```

**Watch mode (re-runs tests automatically when files change):**

```bash
npx jest --watch
```

**Understanding test output:**
- **PASS** — All tests passed, your code is working correctly
- **FAIL** — Something broke, check the error message below to see which test failed and why
- **FAIL** also shows the expected vs actual values when an assertion fails

**What the tests cover:**
- Dashboard data fetching and transformation logic
- KPI calculations and aggregations

## 📁 Project Structure

```
value-bet-ai/
├── __tests__/                  # Test files
│   └── dashboard-data.test.ts  # Dashboard data unit tests
├── src/
│   ├── app/                    # Next.js App Router pages and layouts
│   │   ├── globals.css         # Global styles with CSS custom properties
│   │   ├── layout.tsx          # Root layout with Navbar and Footer
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   ├── dashboard/          # Dashboard-specific components
│   │   │   ├── BankrollChart.tsx        # Bankroll growth chart
│   │   │   ├── KpiCards.tsx             # Key performance indicator cards
│   │   │   ├── ValueOfTheDay.tsx        # Daily value bet recommendations
│   │   │   └── history/                  # History section components
│   │   │       ├── HistoryChart.tsx     # Performance chart
│   │   │       └── HistoryTable.tsx     # Bet records table
│   │   ├── sections/           # Landing page sections
│   │   │   ├── CtaSection.tsx          # Call to action
│   │   │   ├── FeaturesSection.tsx     # Feature highlights
│   │   │   ├── HeroSection.tsx         # Hero banner
│   │   │   ├── HowItWorksSection.tsx   # How it works explanation
│   │   │   ├── ResultsSection.tsx      # Results showcase
│   │   │   └── TestimonialsSection.tsx # User testimonials
│   │   └── ui/                  # Reusable UI components
│   │       ├── Footer.tsx              # Site footer
│   │       ├── Navbar.tsx              # Navigation bar
│   │       └── ParticleBackground.tsx  # Animated particle background
│   └── lib/                    # Utility functions and Supabase client
├── .env.local                  # Environment variables (create from .env.example)
├── .env.example                # Environment variable template
├── package.json                # Dependencies and scripts
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the **Deploy with Vercel** button above (or go to [vercel.com/new](https://vercel.com/new))
2. **Import Git Repository** — Connect your GitHub account and select your `value-bet-ai` repository
3. **Configure Project** — Vercel auto-detects Next.js settings, click **Deploy**
4. **Add Environment Variables** — Before deploying, go to your project → **Settings** → **Environment Variables** and add:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

5. **Deploy** — Click **Deploy** and wait for the build to complete
6. **Done** — Your app is live at `https://your-project-name.vercel.app`

> ⚠️ **Important**: Make sure all environment variables from `.env.local` are added in Vercel before deploying. Without them, your app may crash or show errors.

## 📝 License

MIT