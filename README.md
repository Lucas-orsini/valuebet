# Value Bet AI

A Next.js application for value betting with Supabase authentication.

## ✨ Features

- User authentication (login and signup)
- Supabase-backed authentication system
- Modern, responsive UI with Tailwind CSS
- Smooth animations with Framer Motion
- Protected routes for authenticated users

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database/Auth**: Supabase
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** — Download from [nodejs.org](https://nodejs.org)
- **A code editor** — We recommend [VS Code](https://code.visualstudio.com/) with the "Tailwind CSS IntelliSense" extension
- **Git installed** — Usually comes pre-installed on Mac/Linux. Download from [git-scm.com](https://git-scm.com) if needed
- **A Supabase account** — Sign up free at [supabase.com](https://supabase.com)

### 1. Clone the repository

Open your terminal (see VS Code tip below) and run:

```bash
git clone https://github.com/YOUR_USERNAME/value-bet-ai.git
cd value-bet-ai
```

> 💡 **VS Code tip**: Press `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac) to open the integrated terminal directly in VS Code.

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a file named `.env.local` in the root of your project (next to `package.json`). This file stores secret keys that your app needs to connect to external services.

> ⚠️ **Important**: Never share your `.env.local` file or push it to GitHub. It already should be in your `.gitignore`, but double-check that it is.

Create `.env.local` with this exact content:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

See the [Environment Variables](#-environment-variables) section below for exactly where to find these values.

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **Tip**: The server automatically restarts when you save changes to files.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | [Supabase Dashboard](https://supabase.com/dashboard) → Your Project → Project Settings → API → **Project URL** | Your Supabase project connection URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://supabase.com/dashboard) → Your Project → Project Settings → API → **anon/public** key | Public API key for client-side authentication |

### Steps to find Supabase credentials:

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Click **Project Settings** (gear icon) in the left sidebar
4. Click **API** in the settings menu
5. Find **Project URL** — copy it as `NEXT_PUBLIC_SUPABASE_URL`
6. Find **anon/public** key under "Project API keys" — copy it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 📁 Project Structure

```
value-bet-ai/
├── src/
│   ├── app/                    # Next.js App Router pages and layouts
│   │   ├── (auth)/             # Authentication routes (login, signup)
│   │   │   ├── layout.tsx      # Auth layout (shared across login/signup)
│   │   │   ├── login/          # Login page
│   │   │   └── signup/         # Signup page
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # Reusable React components
│   └── lib/                    # Utility functions and Supabase client
├── public/                     # Static assets
├── .env.local                  # Environment variables (create this)
├── .gitignore                  # Git ignore rules
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🚀 Deploy to Vercel

The easiest way to deploy this Next.js app is with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository (`YOUR_USERNAME/value-bet-ai`)
3. Vercel will auto-detect Next.js — click **Deploy**
4. Before deploying, add your environment variables:
   - Go to your project → **Settings** → **Environment Variables**
   - Add `NEXT_PUBLIC_SUPABASE_URL` with your Supabase URL
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your Supabase anon key
5. Click **Redeploy** if you deployed before adding the variables

> ⚠️ **Don't forget**: All environment variables from your `.env.local` file must be added to Vercel, otherwise the app won't work.

## 📝 License

MIT