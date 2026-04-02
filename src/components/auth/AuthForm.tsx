"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AuthCard } from "./AuthCard";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { AUTH_MESSAGES, VALIDATION_MESSAGES, AUTH_REDIRECT_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export type AuthMode = "login" | "signup";
export type AuthFormState = "idle" | "loading" | "error" | "success";

export interface AuthFormProps {
  mode: AuthMode;
  onSuccess?: () => void;
}

function validateEmail(email: string): string | null {
  if (!email.trim()) {
    return VALIDATION_MESSAGES.email.required;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return VALIDATION_MESSAGES.email.invalid;
  }
  return null;
}

function validatePassword(password: string): string | null {
  if (!password) {
    return VALIDATION_MESSAGES.password.required;
  }
  if (password.length < 8) {
    return VALIDATION_MESSAGES.password.minLength;
  }
  return null;
}

export function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const config = AUTH_MESSAGES[mode];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formState, setFormState] = useState<AuthFormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Client-side validation
      const emailValidation = validateEmail(email);
      const passwordValidation = validatePassword(password);

      setEmailError(emailValidation);
      setPasswordError(passwordValidation);

      if (emailValidation || passwordValidation) {
        return;
      }

      setFormState("loading");
      setErrorMessage(null);

      try {
        if (mode === "login") {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            setErrorMessage(error.message);
            setFormState("error");
            return;
          }
        } else {
          const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/api/auth/callback`,
            },
          });

          if (error) {
            setErrorMessage(error.message);
            setFormState("error");
            return;
          }

          // Signup success - show confirmation message
          setFormState("success");
          return;
        }

        onSuccess?.();
        router.push(AUTH_REDIRECT_URL);
        router.refresh();
      } catch {
        setErrorMessage("Une erreur inattendue s'est produite. Veuillez réessayer.");
        setFormState("error");
      }
    },
    [email, password, mode, onSuccess, router, supabase]
  );

  // Success state for signup
  if (formState === "success") {
    return (
      <AuthCard
        title="Email de vérification envoyé"
        description={`Un lien de vérification a été envoyé à ${email}. Veuillez vérifier votre boîte de réception.`}
      >
        <div className="text-center py-4">
          <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-sm text-zinc-400 mb-4">
            Cliquez sur le lien dans l'email pour activer votre compte.
          </p>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              setFormState("idle");
              setEmail("");
              setPassword("");
            }}
          >
            Retour à la connexion
          </Button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard title={config.title} description={config.description}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AnimatePresence mode="wait">
          {formState === "error" && errorMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 rounded-lg bg-red-500/10 border border-red-500/20"
            >
              <p className="text-sm text-red-400">{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <FormField label="Email" error={emailError ?? undefined} required>
          <Input
            type="email"
            placeholder="vous@exemple.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(null);
            }}
            disabled={formState === "loading"}
            autoComplete="email"
          />
        </FormField>

        <FormField label="Mot de passe" error={passwordError ?? undefined} required>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(null);
            }}
            disabled={formState === "loading"}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />
        </FormField>

        {mode === "login" && (
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-xs text-zinc-500 hover:text-accent transition-colors"
            >
              Mot de passe oublié ?
            </Link>
          </div>
        )}

        <Button
          type="submit"
          loading={formState === "loading"}
          className="w-full mt-2"
        >
          {config.submit}
        </Button>
      </form>

      <div className="flex items-center justify-center gap-3 mt-4">
        <div className="flex-1 h-px bg-white/[0.06]" />
        <span className="text-xs text-zinc-600">ou</span>
        <div className="flex-1 h-px bg-white/[0.06]" />
      </div>

      <button
        type="button"
        className={cn(
          "w-full h-10 mt-4 rounded-lg",
          "bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08]",
          "text-sm text-zinc-300 font-medium",
          "flex items-center justify-center gap-2",
          "transition-colors duration-150"
        )}
        disabled={formState === "loading"}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continuer avec Google
      </button>

      <div className="text-center mt-4">
        <span className="text-xs text-zinc-500">{config.footer.text} </span>
        <Link
          href={config.footer.href}
          className="text-xs text-accent hover:text-accent-light transition-colors font-medium"
        >
          {config.footer.link}
        </Link>
      </div>
    </AuthCard>
  );
}
