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
- **Bankroll Tracker** — Track your betting performance with two modes: Auto (automatic AI bet tracking with real-time P&L) or Custom (manual bet selection and odds adjustment)
- **Bankroll KPIs** — Real-time ROI, win/loss rate, total profit in units, and current winning streak
- **Dynamic User Profile** — Sidebar displays authenticated user information (name, email, avatar) fetched from Supabase database
- **Streamlined Navigation** — Clean sidebar with essential links: Dashboard, Paramètres, and Déconnexion

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Charts:** Recharts
- **Backend:** Supabase (Auth + Database + SSR)
- **Testing:** Jest + React Testing Library + Playwright
- **Deployment:** Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ — [Download here](https://nodejs.org/)
- A code editor — [We recommend VS Code](https://code.visualstudio.com/)
- Git installed — [Download here](https://git-scm.com/)
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

Create a `.env.local` file in the project root (next to `package.json`). This file stores sensitive configuration that shouldn't be committed to Git.

> 💡 **No-code user tip:** Open VS Code, click **File > New File**, name it `.env.local`, and save it in the project folder.

Add these exact lines to your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip:** Open the integrated terminal with `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Yes | Supabase Dashboard > Project Settings > API > **Project URL** | Your Supabase project connection URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Yes | Supabase Dashboard > Project Settings > API > **anon/public** key | Public API key for client-side requests |

**Steps to find Supabase credentials:**

1. Go to [supabase.com](https://supabase.com) and log in
2. Select your project (or create a new one)
3. Click **Project Settings** (gear icon) in the left sidebar
4. Click **API** in the settings menu
5. Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Copy the **anon/public** key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🧪 Running Tests

Unit tests automatically verify that core functionality works correctly. They check if functions return the expected results without errors.

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

**How to read the output:**
- **PASS** — All tests passed, everything works ✅
- **FAIL** — Something broke, check the error message below to see which test failed

**What the tests cover:**

- `dashboard-data.test.ts` — Tests for dashboard data fetching and processing utilities (src/lib/dashboard-data.ts)

## 📁 Project Structure

```
value-bet-ai/
├── __tests__/                  # Jest unit tests
│   └── dashboard-data.test.ts  # Dashboard data function tests
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/             # Auth route group (login, signup)
│   │   ├── dashboard/          # Protected dashboard pages
│   │   │   ├── layout.tsx     # Dashboard layout with sidebar
│   │   │   └── page.tsx       # Main dashboard page
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── dashboard/
│   │   │   └── DashboardSidebar.tsx  # Sidebar with user info + nav
│   │   └── ui/                # Reusable UI components
│   └── lib/
│       ├── supabase/          # Supabase client configuration
│       └── dashboard-data.ts  # Dashboard data fetching utilities
├── .env.local                  # Environment variables (not committed)
├── .env.example               # Template for .env.local
└── package.json               # Dependencies and scripts
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step-by-step deployment:**

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

3. **Configure environment variables**
   - In Vercel dashboard, go to **Settings > Environment Variables**
   - Add `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
   - Click **Save**

4. **Deploy**
   - Click **Deploy** — Vercel will build and deploy automatically

> ⚠️ **Important:** Make sure to add all environment variables from `.env.local` to Vercel, otherwise the app won't work properly.

## 📝 License

MIT