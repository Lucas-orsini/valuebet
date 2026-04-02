# value-bet-ai

AI-powered sports betting value detection platform that identifies mispriced odds across major sportsbooks.

## ✨ Features

- **User Authentication** — Secure signup and login with email and password via Supabase Auth (no email verification required)
- **Protected Dashboard** — Dashboard is only accessible when logged in; unauthenticated users are redirected to the landing page
- **Login/Sign Up Navigation** — Easy access to authentication pages from the landing page navbar
- **Modern UI** — Clean, responsive interface built with Tailwind CSS and Framer Motion animations
- **Supabase Integration** — Full authentication flow with session management and secure API callbacks
- **Reusable Components** — Modular UI components (Button, Input, FormField) with consistent styling
- **Route Groups** — Organized auth routes under the `(auth)` group with shared layout
- **Dashboard Overview** — Real-time tracking of active bets with ROI labels (🟢🟡🟠🔴), player info, odds, break-even and units
- **Value of the Day** — Daily recommended bets with color-coded risk badges: 🟢 Optimal ROI, 🟡 Correct ROI, 🟠 Risky ROI, 🔴 Very Risky ROI
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

1. Go to [supabase.com](https://supabase.com) and sign in to your account
2. Click on **"Project Settings"** (the gear icon) in the left sidebar
3. Under the **"Config"** section, click on **"API"**
4. Copy the **"Project URL"** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
5. Copy the **"anon public"** key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

> 💡 **Important**: Never share these keys or commit them to GitHub. The `.env.local` file is already in your `.gitignore`.

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: open the integrated terminal with `` Ctrl+` `` (or `` Cmd+` `` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard > Project Settings > API > Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard > Project Settings > API > anon/public key | Anonymous API key for client-side operations |

## 🧪 Running Tests

Unit tests automatically check that your code works correctly. They verify individual pieces (like forms and buttons) without needing the whole app running.

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

### Understanding test output

- **PASS** — All tests passed ✅
- **FAIL** — Something broke ❌ (shows which test failed and why)
- ** Suites: X passed, Y failed** — Summary of all test files

### What the tests cover

- **AuthForm.test.tsx** — Tests the authentication form components (login/signup)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── (auth)/             # Auth route group (login, signup pages)
│   ├── dashboard/          # Protected dashboard (requires login)
│   │   └── layout.tsx      # Dashboard layout with header
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/             # Reusable UI components
│   ├── dashboard/          # Dashboard-specific components
│   │   └── DashboardHeader.tsx  # Dashboard navigation header
│   ├── ui/                 # Base UI components (Button, Input, etc.)
│   └── AuthForm.tsx        # Authentication form component
├── lib/                    # Utility functions and Supabase setup
│   └── supabase/
│       ├── client.ts       # Supabase client for browser
│       └── server.ts       # Supabase client for server-side
└── __tests__/              # Jest test files
    └── AuthForm.test.tsx   # Auth form tests
```

## 🚀 Deploy to Vercel

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step

1. **Import your repository** — Click "Import Project" on Vercel, select your GitHub repo
2. **Add environment variables** — In the Vercel dashboard, go to **Settings > Environment Variables** and add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
3. **Deploy** — Click "Deploy" and wait for the build to complete
4. **Visit your app** — Once deployed, Vercel provides a URL like `your-project.vercel.app`

> ⚠️ **Important**: Make sure all environment variables from `.env.local` are also added in Vercel (Settings > Environment Variables) before deploying. Without them, your app won't connect to Supabase.

## 📝 License

MIT