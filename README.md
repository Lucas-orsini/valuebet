# value-bet-ai

AI-powered sports betting value detection platform that identifies mispriced odds across major sportsbooks.

## ✨ Features

- **User Authentication** — Secure signup and login with email and password via Supabase Auth (no email verification required)
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

The login page is at `/login` and the signup page is at `/signup`.

> 💡 **VS Code tip**: Open the integrated terminal with `` Ctrl+` `` (or `` Cmd+` `` on Mac). Run all commands here.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon public key | Anonymous API key for client-side auth |

## 🧪 Running Tests

Unit tests automatically check that your code works correctly. The project includes tests for the authentication form.

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

- **PASS** — All tests passed, your code works correctly
- **FAIL** — Something broke. Check the error message above for which test failed and why

**What the tests cover:**

- `__tests__/AuthForm.test.tsx` — Authentication form rendering and user interactions (signup/login)

## 📁 Project Structure

```
value-bet-ai/
├── __tests__/              # Jest test files
│   └── AuthForm.test.tsx   # Auth form tests
├── src/
│   ├── app/                # Next.js App Router pages and layouts
│   │   ├── (auth)/         # Auth route group with shared layout
│   │   │   ├── login/      # Login page
│   │   │   └── signup/     # Signup page
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable React components
│   │   ├── auth/           # Auth-specific components
│   │   │   └── AuthForm.tsx # Signup/login form component
│   │   └── ui/             # Shared UI components (Button, Input, etc.)
│   └── lib/                # Utilities and Supabase client setup
├── .env.local              # Environment variables (create this)
├── package.json            # Dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── jest.config.ts          # Jest testing configuration
```

## 🚀 Deploy to Vercel

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step

1. Push your code to GitHub (if you haven't already)
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New Project**
4. Import your `value-bet-ai` repository
5. Under **Environment Variables**, add each variable from your `.env.local` file:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | your_supabase_project_url |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your_supabase_anon_key |

6. Click **Deploy**

> ⚠️ Important: Make sure to add ALL environment variables in Vercel before deploying. Without them, your app will crash.

Your app will be live at `https://your-project.vercel.app` once deployed.

## 📝 License

MIT