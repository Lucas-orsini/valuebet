'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { createClient } from '@/supabase/client'

interface AuthFormProps {
  mode?: 'login' | 'signup'
}

export function AuthForm({ mode: initialMode = 'login' }: AuthFormProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [authError, setAuthError] = useState('')

  const router = useRouter()
  const supabase = createClient()

  const validateEmail = (value: string): boolean => {
    if (!value.trim()) {
      setEmailError('L\'email est requis')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError('Veuillez entrer un email valide')
      return false
    }
    setEmailError('')
    return true
  }

  const validatePassword = (value: string): boolean => {
    if (!value) {
      setPasswordError('Le mot de passe est requis')
      return false
    }
    if (mode === 'signup' && value.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères')
      return false
    }
    setPasswordError('')
    return true
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setAuthError('')

    const isEmailValid = validateEmail(email)
    const isPasswordValid = validatePassword(password)

    if (!isEmailValid || !isPasswordValid) {
      return
    }

    setIsLoading(true)

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          setAuthError(error.message)
          return
        }

        router.push('/dashboard')
        router.refresh()
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) {
          setAuthError(error.message)
          return
        }

        router.push('/dashboard')
        router.refresh()
      }
    } catch {
      setAuthError('Une erreur inattendue s\'est produite')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (emailError) {
      setEmailError('')
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (passwordError) {
      setPasswordError('')
    }
  }

  const toggleMode = () => {
    const newMode = mode === 'login' ? 'signup' : 'login'
    setMode(newMode)
    setEmail('')
    setPassword('')
    setEmailError('')
    setPasswordError('')
    setAuthError('')
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <h1 className="text-xl font-semibold text-zinc-100 tracking-tight mb-2">
        {mode === 'login' ? 'Connexion' : 'Inscription'}
      </h1>
      <p className="text-sm text-zinc-500 leading-relaxed mb-6">
        {mode === 'login'
          ? 'Entrez vos identifiants pour accéder à votre tableau de bord'
          : 'Remplissez les champs ci-dessous pour créer votre compte'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="votre@email.com"
            value={email}
            onChange={handleEmailChange}
            aria-describedby={emailError ? 'email-error' : undefined}
            aria-invalid={!!emailError}
            className="w-full h-11 px-3 rounded-lg bg-[#111] border text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0 border-white/[0.08] hover:border-white/[0.12] focus:border-accent/50 focus:ring-accent/20"
          />
          {emailError && (
            <p id="email-error" className="text-xs text-red-400" role="alert">
              {emailError}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="sr-only">
            Mot de passe
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              placeholder="Mot de passe"
              value={password}
              onChange={handlePasswordChange}
              aria-describedby={passwordError ? 'password-error' : undefined}
              aria-invalid={!!passwordError}
              className="w-full h-11 px-3 pr-10 rounded-lg bg-[#111] border text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0 border-white/[0.08] hover:border-white/[0.12] focus:border-accent/50 focus:ring-accent/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {passwordError && (
            <p id="password-error" className="text-xs text-red-400" role="alert">
              {passwordError}
            </p>
          )}
        </div>

        {authError && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-xs text-red-400" role="alert">
              {authError}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 ease-out disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 bg-accent hover:bg-accent-light text-white shadow-[0_0_20px_rgba(242,203,56,0.25)] hover:shadow-[0_0_28px_rgba(242,203,56,0.35)] h-10 px-4 text-sm w-full mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              {mode === 'login' ? 'Connexion en cours...' : 'Création du compte...'}
            </>
          ) : (
            <>{mode === 'login' ? 'Se connecter' : 'S\'inscrire'}</>
          )}
        </button>
      </form>

      <button
        type="button"
        className="w-full h-10 mt-4 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-sm text-zinc-300 font-medium transition-colors"
      >
        Continuer avec Google
      </button>

      <p className="text-center text-xs text-zinc-600 mt-6">
        {mode === 'login' ? (
          <>
            Pas encore de compte ?{' '}
            <button
              type="button"
              onClick={toggleMode}
              className="text-accent hover:underline"
            >
              Créer un compte
            </button>
          </>
        ) : (
          <>
            Déjà un compte ?{' '}
            <button
              type="button"
              onClick={toggleMode}
              className="text-accent hover:underline"
            >
              Se connecter
            </button>
          </>
        )}
      </p>
    </div>
  )
}
