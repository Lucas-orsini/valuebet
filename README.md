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
- **Bankroll KPIs** — Real-time key performance indicators including ROI, win rate, total profit, and current streak

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Database/Auth**: Supabase (@supabase/ssr, @supabase/supabase-js)
- **Testing**: Jest, React Testing Library, Playwright

## 🚀 Quick Start

### Prerequisites

- [Node.js 18+](https://nodejs.org/) installed on your machine
- [VS Code](https://code.visualstudio.com/) (recommended code editor)
- Git installed
- A Supabase account

### 1. Clone the repository

Open your terminal and run:

```bash
git clone https://github.com/YOUR_USERNAME/value-bet-ai.git
cd value-bet-ai
```

> 💡 **VS Code tip**: Open the project folder in VS Code, then open the integrated terminal with `Ctrl+`` (Windows/Linux) or `` Cmd+` `` (Mac).

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a file named `.env.local` in the root directory of the project (same folder as `package.json`).

For no-code users: A `.env.local` file stores secret configuration values that your app needs to work properly. It's like a settings file that never gets uploaded to GitHub, keeping your secrets safe.

Create `.env.local` with this exact content:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Where to find your Supabase credentials:

1. Go to [supabase.com](https://supabase.com) and log in
2. Click on your project
3. In the left sidebar, click **Project Settings** (the gear icon ⚙️)
4. Click on **API** in the settings menu
5. Under **Project API credentials**, find:
   - **Project URL** → Copy this value and paste it after `NEXT_PUBLIC_SUPABASE_URL=`
   - **anon/public** key → Click **Copy** next to it and paste it after `NEXT_PUBLIC_SUPABASE_ANON_KEY=`

Your `.env.local` file should now look like:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your_anon_key_here
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public anonymous key for Supabase client |

## 🧪 Running Tests

Unit tests automatically check that specific parts of the application work correctly without needing the full app running.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/dashboard-data.test.ts
```

Run tests in watch mode (re-runs automatically when you save changes):

```bash
npx jest --watch
```

**Understanding test output:**
- **PASS** (green) = All tests in that file passed ✅
- **FAIL** (red) = Something broke ❌ — the output will show which test failed and why

The dashboard data tests cover: Value of the Day component data structure, odds formatting, ROI label assignments, and user timezone handling for last update timestamps.

## 📁 Project Structure

```
value-bet-ai/
├── __tests__/               # Jest unit tests
│   └── dashboard-data.test.ts
├── public/                  # Static assets (images, fonts)
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (auth)/          # Auth route group with login/signup pages
│   │   ├── dashboard/       # Protected dashboard pages
│   │   ├── api/             # API routes
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Landing page
│   ├── components/          # Reusable UI components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   │   └── ValueOfTheDay.tsx
│   │   └── ui/              # Generic UI components (Button, Input, etc.)
│   ├── lib/                 # Utility functions and Supabase client setup
│   └── styles/              # Global CSS and Tailwind config
├── .env.local               # Environment variables (create this)
├── .env.example             # Template for environment variables
├── package.json             # Dependencies and scripts
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## 🚀 Deploy to Vercel

The easiest way to deploy your Next.js app is with Vercel.

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. Click the **Deploy with Vercel** button above (or go to [vercel.com/new](https://vercel.com/new))
2. **Import Git Repository**: Connect your GitHub account and select your `value-bet-ai` repository
3. **Configure Project**: Vercel auto-detects Next.js settings — click **Deploy**
4. **Add Environment Variables**:
   - In the Vercel dashboard, go to your project → **Settings** → **Environment Variables**
   - Add each variable from your `.env.local` file:
     - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
5. **Redeploy**: After adding environment variables, go to **Deployments** and click **Redeploy** on your latest deployment

Your app will be live at `https://your-project.vercel.app` within minutes.

> ⚠️ **Important**: Don't forget to add all environment variables in Vercel. If they're missing, the app will fail to connect to Supabase.

## 📝 License

MIT