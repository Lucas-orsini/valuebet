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

Open `.env.local` in your code editor and add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Where to find these values:**

1. Go to [supabase.com](https://supabase.com) and sign in to your account
2. Select your project
3. Click **Settings** (gear icon) in the left sidebar
4. Click **API** under Project Settings
5. Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Copy the **anon/public** key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: open the integrated terminal with `` Ctrl+` `` (or `` Cmd+` `` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard > Settings > API > Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard > Settings > API > anon/public key | Public API key for client-side authentication |

## 🧪 Running Tests

Unit tests automatically verify that the authentication forms work correctly. They check things like form rendering, input handling, and error messages.

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/AuthForm.test.tsx
```

Run tests in watch mode (re-runs automatically when you save changes):

```bash
npx jest --watch
```

**How to read Jest output:**

- **PASS** — All tests in that file passed ✅
- **FAIL** — Something is broken, check the error message below for details ❌
- ** Suites: 1 passed, 1 failed** means 1 test file passed and 1 failed

**What the tests cover:**

- `__tests__/AuthForm.test.tsx` — Authentication form components (login and signup forms)

## 📁 Project Structure

- **`src/app`** — Next.js App Router pages and layouts (landing, auth, dashboard)
- **`src/components/ui`** — Reusable UI components (Navbar, Button, Input, FormField)
- **`src/components/dashboard`** — Dashboard-specific components (DashboardSidebar)
- **`src/lib`** — Utility functions and Supabase client setup
- **`__tests__`** — Jest test files
- **`public`** — Static assets (images, fonts)
- **`.env.local`** — Environment variables (create this yourself, not committed to git)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. Click the **Deploy with Vercel** button above (or go to [vercel.com/new](https://vercel.com/new))
2. Import your GitHub repository (`value-bet-ai`)
3. In the **Environment Variables** section, add all variables from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase anon key
4. Click **Deploy**

Your app will be live at a Vercel URL (e.g., `your-app.vercel.app`) once the build completes.

> ⚠️ **Important**: Make sure to add all environment variables in Vercel > Settings > Environment Variables before deploying. Without these, authentication and database features will not work.

## 📝 License

MIT