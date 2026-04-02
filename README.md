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
- **Bet History** — Filterable table by tournament, surface, and ROI label for analyzing model consistency
- **Surface Statistics** — ROI breakdown for Clay, Hard, and Grass courts to validate model adaptability
- **History Dashboard** — Comprehensive historical view with statistics overview, filterable chart visualization, and detailed bet records table
- **History Statistics** — Quick stats cards showing total bets, win rate, average odds, and total profit/loss
- **History Filters** — Filter history by date range, tournament, surface type, and bet outcome
- **History Chart** — Visual trend chart displaying betting performance over time with Recharts
- **History Table** — Sortable and filterable table with player info, odds, stake, profit, and outcome details

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
- **A Supabase account** — [Sign up free at supabase.com](https://supabase.com)

### 1. Clone the repository

Open your terminal (in VS Code: press `` Ctrl+` `` or `` Cmd+` `` on Mac) and run:

```bash
git clone https://github.com/YOUR_USERNAME/value-bet-ai.git
cd value-bet-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

A `.env.local` file stores secret API keys that your app needs to connect to Supabase. Create this file in the **root folder** of the project (same level as `package.json`).

Create the file:

```bash
touch .env.local
```

Open `.env.local` in your code editor and add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: open the integrated terminal with `Ctrl+`` ` ` ` ` ` ` ` (or `Cmd+`` ` ` ` ` ` ` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Your Supabase anonymous key (safe to expose to client) |

To find these values:

1. Go to [supabase.com](https://supabase.com) and log in to your account
2. Select your project
3. Click **Project Settings** (gear icon) in the left sidebar
4. Click **API** in the settings menu
5. Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Copy the **anon/public** key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🧪 Running Tests

Tests automatically check that key parts of the app work correctly without you having to test them manually.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/AuthForm.test.tsx
```

Watch mode (re-runs tests automatically when you save a file):

```bash
npx jest --watch
```

**Understanding the output:**
- **PASS** (green) — All tests in that file passed ✅
- **FAIL** (red) — Something broke, check the error message below for what needs fixing

**What the tests cover:**
- `AuthForm.test.tsx` — Authentication form components (sign up, login, validation)

## 📁 Project Structure

```
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── (auth)/              # Authentication routes (login, signup)
│   │   ├── dashboard/          # Protected dashboard pages
│   │   │   ├── history/        # Bet history page (NEW)
│   │   │   └── page.tsx        # Main dashboard overview
│   │   ├── layout.tsx          # Root layout with providers
│   │   └── page.tsx           # Landing page
│   ├── components/              # Reusable UI components
│   │   ├── dashboard/
│   │   │   ├── history/        # History page components (NEW)
│   │   │   │   ├── HistoryContent.tsx    # Main history page layout
│   │   │   │   ├── HistoryStats.tsx      # Statistics overview cards
│   │   │   │   ├── HistoryFilters.tsx     # Filter controls
│   │   │   │   ├── HistoryChart.tsx       # Performance chart
│   │   │   │   └── HistoryTable.tsx       # Bet records table
│   │   │   └── DashboardContent.tsx      # Main dashboard layout
│   │   └── ui/                 # Base UI components (Button, Input, etc.)
│   └── lib/                    # Utilities and Supabase client setup
├── __tests__/                  # Jest test files
├── public/                    # Static assets
└── supabase/                  # Database migrations and types
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the **Deploy with Vercel** button above (or go to [vercel.com/new](https://vercel.com/new))
2. Click **Import Git Repository** and select your GitHub repo
3. Vercel will auto-detect Next.js — click **Deploy**
4. Once deployed, go to your project → **Settings** → **Environment Variables**
5. Add each variable from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
6. **Redeploy** (go to **Deployments** → click the three dots → **Redeploy**) so the new env vars take effect
7. Your app is live! 🎉

## 📝 License

MIT