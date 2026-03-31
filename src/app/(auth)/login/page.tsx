"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthButton } from "@/components/auth/AuthButton";
import { SocialAuth } from "@/components/auth/SocialAuth";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { loginSchema, type LoginInput } from "@/lib/validators";
import { login } from "@/lib/auth-service";
import { Mail, Lock } from "lucide-react";

type FormState = "idle" | "loading" | "error";

export default function LoginPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginInput) => {
    setFormState("loading");
    setErrorMessage(null);

    try {
      const result = await login(data);

      if (!result.success) {
        setFormState("error");
        setErrorMessage(result.error);

        if (result.field) {
          setError(result.field as keyof LoginInput, {
            message: result.error,
          });
        }
        return;
      }

      console.log("Login successful:", result.data);
      window.location.href = "/dashboard";
    } catch {
      setFormState("error");
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleDiscordLogin = () => {
    console.log("Discord login clicked");
  };

  return (
    <AuthCard
      title="Connexion"
      subtitle="Accédez à votre compte Haurus"
      backLink={{ href: "/", label: "Retour à l'accueil" }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <AuthInput
          label="Email"
          type="email"
          placeholder="votre@email.com"
          icon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          success={!errors.email && formState !== "idle"}
          disabled={formState === "loading"}
          autoComplete="email"
          {...register("email")}
        />

        <div className="flex flex-col gap-1">
          <AuthInput
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            icon={<Lock className="w-4 h-4" />}
            error={errors.password?.message}
            success={!errors.password && formState !== "idle"}
            disabled={formState === "loading"}
            autoComplete="current-password"
            {...register("password")}
          />
          <div className="flex justify-end mt-1">
            <button
              type="button"
              className="text-xs text-zinc-500 hover:text-[#F2CB38] transition-colors"
            >
              Mot de passe oublié ?
            </button>
          </div>
        </div>

        <AnimatePresence>
          {formState === "error" && errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-3 rounded-lg bg-red-500/10 border border-red-500/20"
            >
              <p className="text-xs text-red-400 text-center">{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AuthButton
          type="submit"
          size="lg"
          isLoading={formState === "loading"}
          loadingText="Connexion..."
          className="w-full mt-2"
        >
          Se connecter
        </AuthButton>
      </form>

      <AuthDivider />

      <SocialAuth
        onGoogle={handleGoogleLogin}
        onDiscord={handleDiscordLogin}
        isLoading={formState === "loading"}
      />

      <p className="text-sm text-zinc-400 text-center mt-6">
        Pas encore de compte ?{" "}
        <Link
          href="/signup"
          className="text-[#F2CB38] hover:text-[#F7D55C] font-medium transition-colors"
        >
          Créer un compte
        </Link>
      </p>
    </AuthCard>
  );
}
