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
- **Surface Statistics** — ROI breakdown for Clay, Hard, and Grass courts to validate model adaptability
- **History Dashboard** — Comprehensive historical view with statistics overview and detailed bet records
- **History Statistics** — Quick stats cards showing total bets, win rate, average odds, and total profit/loss
- **History Table** — Paginated table showing all-time bets with persistent search filters that remain visible even when no results match. Includes player info, tournament, surface, odds, stake, profit, ROI label, and bet outcome. Navigation buttons to browse through pages.

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
- **A Supabase project** — [Create one at supabase.com](https://supabase.com/dashboard)

### 1. Clone the repository

Open your terminal (in VS Code: press `Ctrl+`` or `Cmd+`` on Mac) and run:

```bash
git clone https://github.com/YOUR_USERNAME/value-bet-ai.git
cd value-bet-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of your project. This file stores sensitive configuration that your app needs to connect to Supabase.

> 💡 **What is a .env.local file?** It's a hidden file that holds environment variables (settings) for your app. Never share this file or commit it to git — it contains secrets!

Copy the template below and fill in your values:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Where to find these values:**

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **Project Settings** (gear icon) in the sidebar
4. Click **API** under the Project Settings section
5. Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Copy the **anon/public** key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: open the integrated terminal with `Ctrl+`` (or `Cmd+`` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard > Project Settings > API > Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard > Project Settings > API > anon/public key | Anonymous key for client-side Supabase access |

## 🧪 Running Tests

Unit tests automatically check that your code works correctly without needing to run the whole app.

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

**How to read the output:**

- **PASS** (green) — All tests passed, everything is working correctly
- **FAIL** (red) — Something broke, the output will show which test failed and why

The test suite covers:

- **AuthForm** — Tests the authentication form component including email/password validation, loading states, and error handling

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router — all pages and layouts
│   ├── (auth)/            # Route group for authentication pages (login/signup)
│   ├── dashboard/         # Protected dashboard with history, stats, and KPIs
│   └── page.tsx           # Landing page
├── components/
│   ├── auth/              # Authentication components (AuthForm)
│   ├── dashboard/
│   │   └── history/       # History table and filtering components
│   └── ui/               # Reusable UI components (Button, Input, FormField)
├── lib/
│   ├── supabase/          # Supabase client setup (browser and server)
│   └── utils.ts           # Utility functions (cn helper for classnames)
└── __tests__/             # Jest unit tests
```

Key files:

- `src/components/dashboard/history/HistoryTable.tsx` — Paginated history table with persistent search filters
- `src/lib/supabase/client.ts` — Supabase client for browser-side operations
- `src/lib/supabase/server.ts` — Supabase client for server-side operations with session handling
- `__tests__/AuthForm.test.tsx` — Authentication form tests

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the **Deploy with Vercel** button above (or go to [vercel.com/new](https://vercel.com/new))
2. Import your GitHub repository
3. In the **Environment Variables** section, add all variables from your `.env.local` file:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | your_supabase_url |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your_supabase_anon_key |

4. Click **Deploy**

Your app will be live on a `.vercel.app` URL within seconds!

> ⚠️ **Important**: Make sure to add all environment variables in Vercel > Settings > Environment Variables before deploying. Without these, your app won't connect to Supabase.

## 📝 License

MIT