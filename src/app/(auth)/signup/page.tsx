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
import { signupSchema, type SignupInput } from "@/lib/validators";
import { signup } from "@/lib/auth-service";
import { cn } from "@/lib/utils";
import { Mail, Lock, User, Check } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

export default function SignupPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      acceptTerms: false,
    },
  });

  const password = watch("password");

  const onSubmit = async (data: SignupInput) => {
    setFormState("loading");
    setErrorMessage(null);

    try {
      const result = await signup({
        ...data,
        acceptTerms,
      });

      if (!result.success) {
        setFormState("error");
        setErrorMessage(result.error);

        if (result.field) {
          setError(result.field as keyof SignupInput, {
            message: result.error,
          });
        }
        return;
      }

      setFormState("success");
    } catch {
      setFormState("error");
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
  };

  const handleDiscordSignup = () => {
    console.log("Discord signup clicked");
  };

  const passwordRequirements = [
    { label: "Au moins 8 caractères", met: password && password.length >= 8 },
    { label: "Une majuscule", met: password && /[A-Z]/.test(password) },
    { label: "Une minuscule", met: password && /[a-z]/.test(password) },
    { label: "Un chiffre", met: password && /[0-9]/.test(password) },
  ];

  if (formState === "success") {
    return (
      <AuthCard
        title="Compte créé !"
        subtitle="Bienvenue chez Haurus"
        showLogo={false}
        backLink={{ href: "/login", label: "Se connecter" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center py-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4"
          >
            <Check className="w-8 h-8 text-green-500" />
          </motion.div>
          <p className="text-sm text-zinc-400 text-center mb-6">
            Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter
            et accéder à toutes les fonctionnalités.
          </p>
          <Link
            href="/login"
            className="w-full h-11 px-6 rounded-lg bg-[#F2CB38] hover:bg-[#F7D55C] text-black text-sm font-medium transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-[#F2CB38]/25"
          >
            Se connecter
          </Link>
        </motion.div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Créer un compte"
      subtitle="Rejoignez plus de 500 parieurs"
      backLink={{ href: "/login", label: "Déjà un compte ?" }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <AuthInput
          label="Nom"
          type="text"
          placeholder="Jean Dupont"
          icon={<User className="w-4 h-4" />}
          error={errors.name?.message}
          success={!errors.name && formState !== "idle"}
          disabled={formState === "loading"}
          autoComplete="name"
          {...register("name")}
        />

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

        <div className="flex flex-col gap-1.5">
          <AuthInput
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            icon={<Lock className="w-4 h-4" />}
            error={errors.password?.message}
            success={!errors.password && formState !== "idle"}
            disabled={formState === "loading"}
            autoComplete="new-password"
            {...register("password")}
          />

          {password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex flex-wrap gap-x-4 gap-y-1.5 p-2.5 rounded-lg bg-zinc-800/30 border border-white/[0.05]"
            >
              {passwordRequirements.map((req) => (
                <div
                  key={req.label}
                  className={cn(
                    "flex items-center gap-1.5 text-[11px]",
                    req.met ? "text-green-400" : "text-zinc-500"
                  )}
                >
                  <div
                    className={cn(
                      "w-3.5 h-3.5 rounded-full border flex items-center justify-center",
                      req.met
                        ? "bg-green-500/20 border-green-500/30"
                        : "border-zinc-600"
                    )}
                  >
                    {req.met && <Check className="w-2 h-2" />}
                  </div>
                  {req.label}
                </div>
              ))}
            </motion.div>
          )}
        </div>

        <AuthInput
          label="Confirmer le mot de passe"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="w-4 h-4" />}
          error={errors.confirmPassword?.message}
          success={!errors.confirmPassword && formState !== "idle"}
          disabled={formState === "loading"}
          autoComplete="new-password"
          {...register("confirmPassword")}
        />

        <div className="flex items-start gap-2.5">
          <button
            type="button"
            onClick={() => setAcceptTerms(!acceptTerms)}
            disabled={formState === "loading"}
            className={cn(
              "mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors",
              acceptTerms
                ? "bg-[#F2CB38] border-[#F2CB38]"
                : "border-white/20 hover:border-white/30",
              formState === "loading" && "opacity-50"
            )}
          >
            {acceptTerms && <Check className="w-2.5 h-2.5 text-black" />}
          </button>
          <label className="text-xs text-zinc-400 leading-relaxed cursor-pointer">
            J&apos;accepte les{" "}
            <a href="#" className="text-[#F2CB38] hover:underline">
              conditions d&apos;utilisation
            </a>{" "}
            et la{" "}
            <a href="#" className="text-[#F2CB38] hover:underline">
              politique de confidentialité
            </a>
          </label>
        </div>
        <AnimatePresence>
          {errors.acceptTerms && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs text-red-400 flex items-center gap-1 -mt-2"
            >
              {errors.acceptTerms.message}
            </motion.p>
          )}
        </AnimatePresence>

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
          loadingText="Création du compte..."
          disabled={!acceptTerms}
          className="w-full mt-2"
        >
          Créer mon compte
        </AuthButton>
      </form>

      <AuthDivider text="ou s'inscrire avec" />

      <SocialAuth
        onGoogle={handleGoogleSignup}
        onDiscord={handleDiscordSignup}
        isLoading={formState === "loading"}
      />

      <p className="text-sm text-zinc-400 text-center mt-6">
        Déjà un compte ?{" "}
        <Link
          href="/login"
          className="text-[#F2CB38] hover:text-[#F7D55C] font-medium transition-colors"
        >
          Se connecter
        </Link>
      </p>
    </AuthCard>
  );
}
