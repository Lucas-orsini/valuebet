# value-bet-ai

A modern web application with authentication powered by Supabase and Next.js.

## ✨ Features

- User authentication with login and signup pages
- Protected routes for authenticated users
- Email/password authentication via Supabase
- Responsive design built with Tailwind CSS
- Smooth animations with Framer Motion
- Modern UI components with Lucide icons

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Authentication**: Supabase
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ — [Download here](https://nodejs.org/)
- A code editor — [VS Code](https://code.visualstudio.com/) is recommended
- Git installed — [Download here](https://git-scm.com/)
- A Supabase account — [Sign up here](https://supabase.com/)

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

Create a file named `.env.local` in the root folder of your project (same folder as `package.json`).

> 💡 **What is a .env.local file?** It's a configuration file that stores sensitive information (like API keys) that your app needs to work. It stays on your computer and is never uploaded to GitHub.

Add the following content to your `.env.local` file:

```env
# Supabase Configuration
# Find these in Supabase Dashboard > Project Settings > API
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (or `Cmd+`` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → Project API keys → anon/public | Public API key for client-side requests |

### Where to find your Supabase credentials:

1. Go to [supabase.com](https://supabase.com) and log in
2. Click on your project
3. In the left sidebar, click **Project Settings** (the gear icon ⚙️)
4. Click **API** in the top navigation
5. Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Copy the **anon/public** key under **Project API keys** and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 📁 Project Structure

```
value-bet-ai/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/             # Auth layout group (login, signup)
│   │   ├── (dashboard)/        # Protected routes (dashboard pages)
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # Reusable UI components
│   │   └── ui/                 # Base UI components (buttons, inputs, etc.)
│   ├── lib/                    # Utilities and Supabase client
│   │   └── supabase/           # Supabase configuration
│   └── types/                  # TypeScript type definitions
├── public/                     # Static assets
├── .env.local                  # Environment variables (create this)
├── tailwind.config.ts          # Tailwind CSS configuration
├── next.config.js              # Next.js configuration
└── package.json                # Dependencies and scripts
```

## 🚀 Deploy to Vercel

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. Click the **Deploy with Vercel** button above (or go to [vercel.com/new](https://vercel.com/new))
2. Import your GitHub repository (`value-bet-ai`)
3. In the **Environment Variables** section, add all variables from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
4. Click **Deploy**

Your app will be live at a Vercel URL (e.g., `your-project.vercel.app`) once the build completes.

> ⚠️ **Important**: Make sure to add all environment variables in Vercel → Settings → Environment Variables before deploying. If you skip this, your app won't connect to Supabase.

## 📝 License

MIT License — feel free to use this project for personal or commercial purposes.