# value-bet-ai

AI-powered sports betting value detection platform that identifies mispriced odds across major sportsbooks.

## ✨ Features

- **User Authentication** — Secure signup and login with email and password via Supabase Auth
- **Modern UI** — Clean, responsive interface built with Tailwind CSS and Framer Motion animations
- **Supabase Integration** — Full authentication flow with session management and secure API callbacks
- **Reusable Components** — Modular UI components (Button, Input, FormField) with consistent styling
- **Route Groups** — Organized auth routes under the `(auth)` group with shared layout

## 🛠️ Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS
- **Animations** — Framer Motion
- **Icons** — Lucide React
- **Auth & Database** — Supabase
- **Testing** — Jest
- **Deployment** — Vercel

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** — [Download from nodejs.org](https://nodejs.org/)
- **A code editor** — We recommend [VS Code](https://code.visualstudio.com/) with the Tailwind CSS IntelliSense extension
- **Git installed** — [Download git](https://git-scm.com/downloads)
- **A Supabase account** — [Sign up free at supabase.com](https://supabase.com)

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

The login page is at `/login` and the signup page is at `/signup`.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (or `Cmd+`` on Mac). Run all commands here.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project connection URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → Project API keys → anon/public | Public API key for client-side Supabase access |

## 🧪 Running Tests

Unit tests automatically check that small pieces of your code work correctly. When you add test files, run them with Jest.

**Run all tests:**

```bash
npx jest
```

**Run a specific test file:**

```bash
npx jest src/components/auth/AuthForm.test.ts
```

**Watch mode (re-runs tests automatically when files change):**

```bash
npx jest --watch
```

**Reading the output:**
- `PASS` — All tests in that file passed ✓
- `FAIL` — Something broke; read the error message below to see which test failed and why

Tests you could add for the auth pages:
- Form validation (empty fields, invalid email format)
- Successful signup/login submissions
- Error handling (wrong password, user already exists)
- UI component rendering

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/              # Auth route group with shared layout
│   │   ├── layout.tsx       # Shared layout for login/signup pages
│   │   ├── login/page.tsx   # Login page at /login
│   │   └── signup/page.tsx  # Signup page at /signup
│   └── api/
│       └── auth/callback/route.ts  # Supabase auth callback handler
├── components/
│   ├── auth/
│   │   ├── AuthCard.tsx      # Card wrapper for auth forms
│   │   └── AuthForm.tsx      # Shared form component for login/signup
│   └── ui/
│       ├── Button.tsx        # Reusable button component
│       ├── FormField.tsx     # Label + input wrapper with error display
│       └── Input.tsx         # Styled text input component
└── lib/
    ├── constants.ts          # App-wide constants
    └── supabase/
        ├── client.ts         # Browser-side Supabase client
        └── server.ts         # Server-side Supabase client
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the **Deploy with Vercel** button above (or go to [vercel.com/new](https://vercel.com/new))
2. Click **Import Git Repository** and select your GitHub repo
3. Vercel will auto-detect Next.js — click **Deploy**
4. Once deployed, go to your project → **Settings** → **Environment Variables**
5. Add each variable from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
6. Click **Save** and **Redeploy** your project

Your app will be live at `https://your-project.vercel.app`.

## 📝 License

MIT