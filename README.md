# value-bet-ai

AI-powered sports betting value detection platform that identifies mispriced odds across major sportsbooks.

## ✨ Features

- **User Authentication** — Secure signup and login with email and password via Supabase Auth (no email verification required)
- **Modern UI** — Clean, responsive interface built with Tailwind CSS and Framer Motion animations
- **Supabase Integration** — Full authentication flow with session management and secure API callbacks
- **Reusable Components** — Modular UI components (Button, Input, FormField) with consistent styling
- **Route Groups** — Organized auth routes under the `(auth)` group with shared layout
- **Dashboard Overview** — Real-time tracking of active bets with ROI labels (🟢🟡🟠🔴), player info, odds, break-even and units
- **Live Bet Status** — Instant status updates showing pending, won, or lost bets
- **KPI Dashboard** — Global ROI, win/loss rate, total profit in units, and current winning streak at a glance
- **Bankroll Performance Chart** — Visual curve of bankroll growth over time with flat betting comparison
- **Bet History** — Filterable table by tournament, surface, and ROI label for analyzing model consistency
- **Surface Statistics** — ROI breakdown for Clay, Hard, and Grass courts to validate model adaptability

## 🛠️ Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS
- **Animations** — Framer Motion
- **Icons** — Lucide React
- **Charts** — Recharts
- **Auth & Database** — Supabase
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

Open `.env.local` in your code editor and add these exact lines:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Where to find your Supabase credentials:

1. Go to [supabase.com](https://supabase.com) and log in
2. Click on your project
3. Click **Project Settings** (the gear icon) in the left sidebar
4. Click **API**
5. Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Under **Project API keys**, copy the **anon public** key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

> ⚠️ Never share your `.env.local` file or commit it to git — it contains secrets!

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

The login page is at `/login`, the signup page is at `/signup`, and the dashboard is at `/dashboard`.

> 💡 **VS Code tip**: Open the integrated terminal with `` Ctrl+` `` (or `` Cmd+` `` on Mac). Run all commands here.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard > Project Settings > API > Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard > Project Settings > API > anon public key | Anonymous API key for client-side requests |

## 🧪 Running Tests

Tests automatically check that the login and signup forms work correctly. They catch mistakes before they reach the live app.

Run all tests:

```bash
npm run test
```

Run a specific test file:

```bash
npm run test -- __tests__/AuthForm.test.tsx
```

Run tests in watch mode (re-runs automatically when you save a file):

```bash
npm run test -- --watch
```

**How to read the output:**
- **PASS** — All tests passed, your code is working correctly
- **FAIL** — Something broke, check the error message below to see which test failed and why

## 📁 Project Structure

```
├── __tests__/                 # Automated tests
│   └── AuthForm.test.tsx     # Tests for authentication forms
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── (auth)/           # Auth route group (login, signup)
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── dashboard/        # Dashboard pages
│   │   │   ├── layout.tsx    # Dashboard layout with sidebar/header
│   │   │   └── page.tsx      # Main dashboard page
│   │   └── page.tsx          # Landing/home page
│   ├── components/
│   │   ├── dashboard/        # Dashboard-specific components
│   │   │   ├── BankrollChart.tsx      # Bankroll performance chart
│   │   │   ├── BetHistoryTable.tsx    # Historical bets with filters
│   │   │   ├── BetsTable.tsx          # Active bets table with ROI labels
│   │   │   ├── DashboardHeader.tsx    # Dashboard header component
│   │   │   ├── DashboardSidebar.tsx   # Navigation sidebar
│   │   │   ├── KpiCards.tsx           # KPI summary cards
│   │   │   └── SurfaceStats.tsx      # Surface-specific statistics
│   │   └── ui/              # Reusable UI components (Button, Input, etc.)
│   └── lib/
│       ├── dashboard-data.ts # Dashboard data fetching and utilities
│       └── supabase.ts       # Supabase client configuration
├── .env.local                # Environment variables (not committed)
├── package.json              # Dependencies and scripts
└── tailwind.config.ts        # Tailwind CSS configuration
```

## 🚀 Deploy to Vercel

The easiest way to deploy your Next.js app is with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. Click the **Deploy with Vercel** button above (or go to [vercel.com/new](https://vercel.com/new))
2. Import your GitHub repository (`YOUR_USERNAME/value-bet-ai`)
3. In the **Environment Variables** section, add all variables from your `.env.local` file:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

4. Click **Deploy**

Your app will be live at `https://your-project.vercel.app` within seconds.

> ⚠️ **Important**: Make sure to add all environment variables in Vercel > Settings > Environment Variables before deploying, otherwise your app will crash.

## 📝 License

MIT