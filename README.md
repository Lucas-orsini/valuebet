# paris-sportifs

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
- **Historique des Paris** — Tableau complet de tous vos paris avec pagination intégrée et filtres de recherche
- **Pagination du Tableau** — Navigation par pages pour parcourir facilement tous vos paris archivés
- **Filtres Intégrés** — Recherchez par tournoi, type de surface, résultat du pari et étiquette ROI directement dans le tableau
- **Historique Statistics** — Quick stats cards showing total bets, win rate, average odds, and total profit/loss

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
- **A Supabase account** — [Create one at supabase.com](https://supabase.com)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/paris-sportifs.git
cd paris-sportifs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a file named `.env.local` in the root folder of the project. This file stores sensitive configuration that connects your app to Supabase.

> 💡 **What is .env.local?** It's a hidden file that holds secret keys. Never share this file or commit it to GitHub.

Copy the content from `.env.example` and fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public anonymous key for client-side requests |

To find your Supabase credentials:
1. Go to [supabase.com](https://supabase.com) and log in
2. Select your project
3. Click **Project Settings** (gear icon) in the left sidebar
4. Click **API** under the Settings section
5. Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Copy the **anon/public** key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🧪 Running Tests

Unit tests verify that individual components work correctly without needing the full application.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/AuthForm.test.tsx
```

### Watch mode (re-runs on file change)

```bash
npx jest --watch
```

### Understanding Jest output

- **PASS** — All tests passed, your code works correctly
- **FAIL** — Something broke, check the error message below to see which test failed

The tests in this project cover:
- **AuthForm.test.tsx** — Authentication form component (login/register functionality)

## 📁 Project Structure

| Folder/File | Description |
|-------------|-------------|
| `src/app` | Next.js App Router pages and layouts |
| `src/app/page.tsx` | Landing page |
| `src/app/login/page.tsx` | Login page |
| `src/app/register/page.tsx` | Registration page |
| `src/app/dashboard/page.tsx` | Dashboard overview with active bets and KPIs |
| `src/app/dashboard/historique/page.tsx` | Historical bet records with paginated table and filters |
| `src/app/api/bets/route.ts` | API route for fetching bets data |
| `src/components` | Reusable React components |
| `src/components/AuthForm.tsx` | Authentication form component |
| `src/components/dashboard/BetsTable.tsx` | Reusable table component with pagination and filters |
| `src/components/dashboard/HistoryContent.tsx` | History page content component |
| `src/lib/dashboard-data.ts` | Utility functions for dashboard data fetching |
| `src/supabase/client.ts` | Supabase client for browser-side operations |
| `src/supabase/server.ts` | Supabase client for server-side operations |
| `src/types/database.ts` | TypeScript type definitions for database schema |
| `src/middleware.ts` | Next.js middleware for route protection |
| `__tests__` | Jest test files |
| `jest.config.js` | Jest configuration |
| `jest.setup.ts` | Jest setup file for testing utilities |

## 🚀 Deploy to Vercel

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step

1. Click the **Deploy with Vercel** button above or go to [vercel.com/new](https://vercel.com/new)
2. **Import your GitHub repository** — Select `paris-sportifs` from the list
3. **Add Environment Variables** — In the Vercel dashboard, go to:
   - **Settings** → **Environment Variables**
   - Add `NEXT_PUBLIC_SUPABASE_URL` with your Supabase project URL
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your Supabase anon key
4. **Click Deploy** — Vercel will automatically build and deploy your app
5. Wait for the deployment to complete, then access your live site

> ⚠️ **Important**: Make sure to add all environment variables from your `.env.local` file to Vercel before deploying. If you skip this step, the app will not connect to Supabase.

## 📝 License

MIT