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
- **History Dashboard** — Comprehensive historical view with statistics overview, time-based filtering (1 month, 3 months, 6 months, 1 year, all time), and detailed bet records
- **Surface Statistics** — ROI breakdown for Clay, Hard, and Grass courts available in the History section to validate model adaptability
- **Time Filter System** — Filter dashboard statistics by different time periods from the header for focused performance analysis
- **History Statistics** — Quick stats cards showing total bets, win rate, average odds, and total profit/loss
- **History Table** — Paginated table showing filtered bets with persistent search filters that remain visible even when no results match. Includes player info, tournament, surface, odds, stake, profit, ROI label, and bet outcome. Navigation buttons to browse through pages.

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

> 💡 **What is .env.local?** It's a hidden configuration file where you store secrets (like API keys) that shouldn't be shared publicly. Next.js automatically loads variables from this file.

Copy the template and fill in your values:

```bash
cp .env.example .env.local
```

Open `.env.local` in your code editor and replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard > Project Settings > API > anon/public key | Your Supabase anonymous key for client-side auth |

### Steps to find Supabase credentials:

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **Project Settings** (gear icon) in the left sidebar
4. Click **API** in the settings menu
5. Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Copy the **anon/public** key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🧪 Running Tests

Unit tests automatically check that individual parts of the code work correctly.

Run all tests:
```bash
npx jest
```

Run a specific test file:
```bash
npx jest __tests__/AuthForm.test.tsx
```

Watch mode (re-runs tests automatically when files change):
```bash
npx jest --watch
```

### Understanding test output

- **PASS** (green) — All tests passed, everything works ✅
- **FAIL** (red) — Something broke, check the error message below for details

The tests cover the authentication form component (AuthForm), testing user interactions and form validation.

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages and layouts
│   │   ├── (auth)/            # Auth route group with shared layout
│   │   ├── dashboard/         # Dashboard pages (overview, history)
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── auth/              # Authentication components
│   │   ├── dashboard/         # Dashboard components
│   │   │   └── history/       # History section components (TimeFilter, HistoryContent)
│   │   └── ui/                # Reusable UI components
│   └── lib/                   # Supabase client and utilities
├── __tests__/                 # Jest test files
├── public/                    # Static assets
└── .env.local                 # Environment variables (create from .env.example)
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. **Connect your repository**
   - Click the "Deploy" button above or go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository (`value-bet-ai`)
   - Vercel will auto-detect Next.js

2. **Add environment variables**
   - In Vercel dashboard, go to **Settings > Environment Variables**
   - Add each variable from your `.env.local` file:
     - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

3. **Deploy**
   - Click **Deploy** — Vercel builds and deploys automatically
   - Your app will be live at `https://your-project.vercel.app`

> ⚠️ **Important**: Make sure all environment variables are added in Vercel before deploying, otherwise the app will crash.

## 📝 License

MIT