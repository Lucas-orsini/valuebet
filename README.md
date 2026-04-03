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
- **Bankroll Tracker** — Track your betting performance with a starting bankroll and two modes: Automatic (follows AI bets automatically with real-time P&L, ROI, and profit tracking) and Custom (manual bet selection with adjustable odds to match your actual bets)
- **Bankroll KPIs** — View current bankroll in €, profit/loss in €, ROI percentage, and current streak at a glance
- **Bankroll Curve** — Visual chart showing bankroll growth over time with real-time updates
- **Bet History Table** — Detailed table of recent bets with results, odds, and individual profit/loss in €

## 🛠️ Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS
- **Animations** — Framer Motion
- **Icons** — Lucide React
- **Charts** — Recharts
- **Database** — Supabase (PostgreSQL)
- **Authentication** — Supabase Auth with SSR

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** — [Download from nodejs.org](https://nodejs.org/)
- **A code editor** — We recommend [VS Code](https://code.visualstudio.com/) with the Tailwind CSS IntelliSense extension
- **Git installed** — [Download git](https://git-scm.com/downloads)
- **A Supabase account** — [Create one free at supabase.com](https://supabase.com)

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

Open `.env.local` in your code editor and fill in the values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

> 💡 **What is a .env.local file?** It's a configuration file that stores sensitive information (like API keys) that your app needs to work. It stays on your computer and is never uploaded to GitHub, keeping your keys safe.

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (or `Cmd+`` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard > Project Settings > API > Project URL | Your Supabase project connection URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard > Project Settings > API > anon/public key | Public API key for client-side authentication |

**Steps to find Supabase credentials:**

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click on your project
3. In the left sidebar, click **Project Settings** (the gear icon)
4. Click **API** in the settings menu
5. Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Copy the **anon/public** key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🧪 Running Tests

Unit tests automatically check that specific parts of the application work correctly. When you run them, the system tells you if everything passed ✅ or if something broke ❌.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/AuthForm.test.tsx
```

### Watch mode (re-runs tests when files change)

```bash
npx jest --watch
```

### Understanding the output

- **PASS** — All tests in that file passed successfully
- **FAIL** — One or more tests failed; the output shows exactly which test failed and why

**Test coverage in this project:**
- Authentication form components (login/signup validation, error handling, UI interactions)

## 📁 Project Structure

| Folder/File | Description |
|-------------|-------------|
| `src/app/` | Next.js App Router pages and layouts |
| `src/app/(auth)/` | Authentication pages (login, signup) with shared layout |
| `src/app/dashboard/` | Dashboard pages including Bankroll Tracker |
| `src/app/api/` | API routes for bankroll and bets data |
| `src/components/` | Reusable React components |
| `src/components/dashboard/` | Dashboard-specific components (KPIs, curves, tables) |
| `src/components/dashboard/bankroll/` | Bankroll Tracker feature components |
| `src/components/layout/` | Layout components (Sidebar, etc.) |
| `src/lib/` | Utility functions and Supabase client setup |
| `src/types/` | TypeScript type definitions |
| `src/supabase/` | Supabase client configuration |
| `__tests__/` | Jest unit tests |
| `public/` | Static assets (images, icons) |
| `.env.example` | Template for environment variables |

## 🚀 Deploy to Vercel

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step

1. **Import your repository**
   - Click "Import Project" on Vercel
   - Select your GitHub repository

2. **Add environment variables**
   - In the Vercel dashboard, go to **Settings > Environment Variables**
   - Add each variable from your `.env.local` file:
     - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

3. **Deploy**
   - Click "Deploy" — Vercel will automatically detect Next.js and configure everything

4. **Verify**
   - Once deployed, test authentication and dashboard features

> ⚠️ **Important**: Make sure all environment variables are added in Vercel before deploying. The app will not work without `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## 📝 License

MIT