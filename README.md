# value-bet-ai

AI-powered sports betting value detection platform that identifies mispriced odds across major sportsbooks.

## ✨ Features

- **User Authentication** — Secure signup and login with email and password via Supabase Auth (no email verification required)
- **Login/Sign Up Navigation** — Easy access to authentication pages from the navbar
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

1. Go to [supabase.com](https://supabase.com) and log in
2. Click on your project
3. Click **Project Settings** (the gear icon) in the left sidebar
4. Click **API**
5. Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Under **Project API keys**, copy the **anon/public** key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Save the file

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: open the integrated terminal with `Ctrl+`` ` ` (or `Cmd+`` ` ` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard > Project Settings > API > Project URL | Your Supabase project connection URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard > Project Settings > API > Project API keys > anon/public | Public API key for client-side requests |

## 🧪 Running Tests

Unit tests automatically check that our authentication forms work correctly without breaking.

Run all tests:

```bash
npm test
```

Run a specific test file:

```bash
npx jest __tests__/AuthForm.test.tsx
```

Run tests in watch mode (re-runs automatically when you save changes):

```bash
npx jest --watch
```

**How to read the output:**
- **PASS** — All tests passed, everything works correctly
- **FAIL** — Something broke, check the error message below for which test failed

The AuthForm tests cover:
- Form rendering with all input fields
- Email and password validation
- Submit button states (enabled/disabled)
- Error message display
- Loading states during authentication

## 📁 Project Structure

```
value-bet-ai/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── (auth)/               # Authentication route group
│   │   │   ├── login/            # Login page
│   │   │   └── signup/           # Sign up page
│   │   ├── dashboard/            # Main dashboard
│   │   │   └── page.tsx          # Dashboard page component
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Landing/home page
│   ├── components/
│   │   ├── ui/                   # Reusable UI components (Button, Input, etc.)
│   │   └── dashboard/            # Dashboard-specific components
│   │       ├── DashboardHeader.tsx   # Navbar with login/signup links
│   │       ├── ValueOfTheDay.tsx     # Daily value bets with ROI badges
│   │       └── BankrollChart.tsx     # Bankroll performance visualization
│   ├── lib/                      # Utilities and data functions
│   │   ├── dashboard-data.ts     # Dashboard data helpers
│   │   └── utils.ts              # General utilities (cn function)
│   └── __tests__/                # Jest test files
├── public/                       # Static assets
├── .env.local                    # Environment variables (create this)
├── tailwind.config.ts            # Tailwind CSS configuration
└── package.json                  # Dependencies and scripts
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. **Push your code to GitHub** — if you haven't already:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/value-bet-ai.git
   git push -u origin main
   ```

2. **Go to Vercel** — visit [vercel.com](https://vercel.com) and sign up/login

3. **Import your repository** — click "Import Project" and select your GitHub repo

4. **Add environment variables** — in the Vercel dashboard:
   - Go to **Settings** > **Environment Variables**
   - Add `NEXT_PUBLIC_SUPABASE_URL` with your Supabase project URL
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your Supabase anon key

5. **Deploy** — click "Deploy" and wait ~1 minute for your site to go live

> ⚠️ **Important**: Make sure all `.env.local` variables are added to Vercel before deploying, otherwise authentication will fail.

## 📝 License

MIT