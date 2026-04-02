import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthForm } from "@/components/auth/AuthForm";

// Mock framer-motion
jest.mock("framer-motion", () => {
  const React = require("react");
  const strip = ({ animate, initial, exit, transition, whileInView, whileHover, whileTap, variants, viewport, ...p }: any) => p;
  return {
    motion: new Proxy({}, {
      get: (_t: any, tag: string) => ({ children, ...props }: any) => React.createElement(tag, strip(props), children),
    }),
    AnimatePresence: ({ children }: any) => children,
  };
});

// Mock next/navigation
const mockRouter = { push: jest.fn(), replace: jest.fn(), back: jest.fn(), refresh: jest.fn() };
jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  usePathname: () => "/login",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock constants
const VALIDATION_MESSAGES = {
  email: {
    required: "L'email est requis",
    invalid: "L'email n'est pas valide",
  },
  password: {
    required: "Le mot de passe est requis",
    minLength: "Le mot de passe doit contenir au moins 8 caractères",
  },
};

const AUTH_MESSAGES = {
  login: {
    title: "Connexion",
    description: "Connectez-vous à votre compte",
    submit: "Se connecter",
    footer: {
      text: "Pas encore de compte ?",
      link: "S'inscrire",
      href: "/signup",
    },
  },
  signup: {
    title: "Créer un compte",
    description: "Inscrivez-vous pour commencer",
    submit: "S'inscrire",
    footer: {
      text: "Déjà un compte ?",
      link: "Se connecter",
      href: "/login",
    },
  },
};

const AUTH_REDIRECT_URL = "/dashboard";

jest.mock("@/lib/constants", () => ({
  AUTH_MESSAGES,
  VALIDATION_MESSAGES,
  AUTH_REDIRECT_URL,
}));

// Mock supabase client
const mockSignInWithPassword = jest.fn();
const mockSignUp = jest.fn();
jest.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: mockSignInWithPassword,
      signUp: mockSignUp,
    },
  }),
}));

// Mock child components
jest.mock("@/components/auth/AuthCard", () => ({
  AuthCard: ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
    <div data-testid="auth-card">
      <h2 data-testid="auth-card-title">{title}</h2>
      <p data-testid="auth-card-description">{description}</p>
      {children}
    </div>
  ),
}));

jest.mock("@/components/ui/FormField", () => ({
  FormField: ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
    <div data-testid="form-field">
      <label>{label}</label>
      {children}
      {error && <span data-testid={`${label.toLowerCase()}-error`}>{error}</span>}
    </div>
  ),
}));

jest.mock("@/components/ui/Input", () => ({
  Input: React.forwardRef<HTMLInputElement, any>(({ type, placeholder, value, onChange, disabled, autoComplete, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      autoComplete={autoComplete}
      data-testid={`input-${type}`}
      {...props}
    />
  )),
  Input.displayName: "Input",
}));

jest.mock("@/components/ui/Button", () => ({
  Button: ({ children, type, loading, disabled, onClick, className, variant }: any) => (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      data-testid="submit-button"
      data-loading={loading}
    >
      {loading ? "Chargement..." : children}
    </button>
  ),
}));

// Setup window.location.origin
beforeAll(() => {
  Object.defineProperty(window, "location", {
    value: { origin: "http://localhost:3000" },
    writable: true,
  });
});

describe("AuthForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSignInWithPassword.mockReset();
    mockSignUp.mockReset();
    mockRouter.push.mockReset();
    mockRouter.refresh.mockReset();
  });

  describe("Login Mode - Validation", () => {
    it("should show email required error when submitting with empty email", async () => {
      // Arrange
      render(<AuthForm mode="login" />);
      const passwordInput = screen.getByTestId("input-password");
      
      // Act
      await userEvent.type(passwordInput, "Motdepasse123");
      await userEvent.click(screen.getByTestId("submit-button"));
      
      // Assert
      expect(screen.getByTestId("email-error")).toHaveTextContent(VALIDATION_MESSAGES.email.required);
    });

    it("should show email format error when submitting with invalid email format", async () => {
      // Arrange
      render(<AuthForm mode="login" />);
      const emailInput = screen.getByTestId("input-email");
      const passwordInput = screen.getByTestId("input-password");
      
      // Act
      await userEvent.type(emailInput, "invalid-email");
      await userEvent.type(passwordInput, "Motdepasse123");
      await userEvent.click(screen.getByTestId("submit-button"));
      
      // Assert
      expect(screen.getByTestId("email-error")).toHaveTextContent(VALIDATION_MESSAGES.email.invalid);
    });

    it("should show password required error when submitting with empty password", async () => {
      // Arrange
      render(<AuthForm mode="login" />);
      const emailInput = screen.getByTestId("input-email");
      
      // Act
      await userEvent.type(emailInput, "utilisateur@exemple.com");
      await userEvent.click(screen.getByTestId("submit-button"));
      
      // Assert
      expect(screen.getByTestId("mot de passe-error")).toHaveTextContent(VALIDATION_MESSAGES.password.required);
    });

    it("should show password minLength error when submitting with password shorter than 8 characters", async () => {
      // Arrange
      render(<AuthForm mode="signup" />);
      const emailInput = screen.getByTestId("input-email");
      const passwordInput = screen.getByTestId("input-password");
      
      // Act
      await userEvent.type(emailInput, "utilisateur@exemple.com");
      await userEvent.type(passwordInput, "short");
      await userEvent.click(screen.getByTestId("submit-button"));
      
      // Assert
      expect(screen.getByTestId("mot de passe-error")).toHaveTextContent(VALIDATION_MESSAGES.password.minLength);
    });
  });

  describe("Error Clearing", () => {
    it("should clear email error when user types in email field after error", async () => {
      // Arrange
      render(<AuthForm mode="login" />);
      const passwordInput = screen.getByTestId("input-password");
      
      // Act - Trigger email validation error
      await userEvent.type(passwordInput, "Motdepasse123");
      await userEvent.click(screen.getByTestId("submit-button"));
      expect(screen.getByTestId("email-error")).toBeInTheDocument();
      
      // Act - Type in email field
      const emailInput = screen.getByTestId("input-email");
      await userEvent.type(emailInput, "nouvel@email.com");
      
      // Assert
      expect(screen.queryByTestId("email-error")).not.toBeInTheDocument();
    });

    it("should clear password error when user types in password field after error", async () => {
      // Arrange
      render(<AuthForm mode="login" />);
      const emailInput = screen.getByTestId("input-email");
      
      // Act - Trigger password validation error
      await userEvent.type(emailInput, "utilisateur@exemple.com");
      await userEvent.click(screen.getByTestId("submit-button"));
      expect(screen.getByTestId("mot de passe-error")).toBeInTheDocument();
      
      // Act - Type in password field
      const passwordInput = screen.getByTestId("input-password");
      await userEvent.type(passwordInput, "nouveaumdp");
      
      // Assert
      expect(screen.queryByTestId("mot de passe-error")).not.toBeInTheDocument();
    });
  });

  describe("Supabase Integration", () => {
    it("should not call Supabase when validation fails", async () => {
      // Arrange
      render(<AuthForm mode="login" />);
      
      // Act
      await userEvent.click(screen.getByTestId("submit-button"));
      
      // Assert
      expect(mockSignInWithPassword).not.toHaveBeenCalled();
    });

    it("should show error message when login fails with invalid credentials", async () => {
      // Arrange
      mockSignInWithPassword.mockResolvedValueOnce({ error: { message: "Invalid login credentials" } });
      render(<AuthForm mode="login" />);
      const emailInput = screen.getByTestId("input-email");
      const passwordInput = screen.getByTestId("input-password");
      
      // Act
      await userEvent.type(emailInput, "utilisateur@exemple.com");
      await userEvent.type(passwordInput, "Motdepasse123");
      await userEvent.click(screen.getByTestId("submit-button"));
      
      await waitFor(() => {
        expect(screen.getByTestId("auth-card")).toHaveTextContent("Invalid login credentials");
      });
    });

    it("should navigate to AUTH_REDIRECT_URL when login succeeds", async () => {
      // Arrange
      mockSignInWithPassword.mockResolvedValueOnce({ error: null });
      render(<AuthForm mode="login" />);
      const emailInput = screen.getByTestId("input-email");
      const passwordInput = screen.getByTestId("input-password");
      
      // Act
      await userEvent.type(emailInput, "utilisateur@exemple.com");
      await userEvent.type(passwordInput, "Motdepasse123");
      await userEvent.click(screen.getByTestId("submit-button"));
      
      await waitFor(() => {
        expect(mockRouter.push).toHaveBeenCalledWith(AUTH_REDIRECT_URL);
        expect(mockRouter.refresh).toHaveBeenCalled();
      });
    });

    it("should show success state when signup succeeds", async () => {
      // Arrange
      mockSignUp.mockResolvedValueOnce({ error: null });
      render(<AuthForm mode="signup" />);
      const emailInput = screen.getByTestId("input-email");
      const passwordInput = screen.getByTestId("input-password");
      
      // Act
      await userEvent.type(emailInput, "nouveau@exemple.com");
      await userEvent.type(passwordInput, "Motdepasse123");
      await userEvent.click(screen.getByTestId("submit-button"));
      
      // Assert
      await waitFor(() => {
        expect(screen.getByTestId("auth-card-title")).toHaveTextContent("Email de vérification envoyé");
      });
      expect(screen.getByTestId("auth-card")).toHaveTextContent("nouveau@exemple.com");
      expect(mockRouter.push).not.toHaveBeenCalled();
    });

    it("should show error message when signup fails with already registered email", async () => {
      // Arrange
      mockSignUp.mockResolvedValueOnce({ error: { message: "User already registered" } });
      render(<AuthForm mode="signup" />);
      const emailInput = screen.getByTestId("input-email");
      const passwordInput = screen.getByTestId("input-password");
      
      // Act
      await userEvent.type(emailInput, "existant@exemple.com");
      await userEvent.type(passwordInput, "Motdepasse123");
      await userEvent.click(screen.getByTestId("submit-button"));
      
      // Assert
      await waitFor(() => {
        expect(screen.getByTestId("auth-card")).toHaveTextContent("User already registered");
      });
    });

    it("should show generic error message when an unexpected exception occurs", async () => {
      // Arrange
      mockSignInWithPassword.mockRejectedValueOnce(new Error("Network error"));
      render(<AuthForm mode="login" />);
      const emailInput = screen.getByTestId("input-email");
      const passwordInput = screen.getByTestId("input-password");
      
      // Act
      await userEvent.type(emailInput, "utilisateur@exemple.com");
      await userEvent.type(passwordInput, "Motdepasse123");
      await userEvent.click(screen.getByTestId("submit-button"));
      
      // Assert
      await waitFor(() => {
        expect(screen.getByTestId("auth-card")).toHaveTextContent("Une erreur inattendue s'est produite. Veuillez réessayer.");
      });
    });
  });

  describe("Form Reset from Success State", () => {
    it("should reset form and return to idle when clicking Retour à la connexion from success state", async () => {
      // Arrange
      mockSignUp.mockResolvedValueOnce({ error: null });
      render(<AuthForm mode="signup" />);
      const emailInput = screen.getByTestId("input-email");
      const passwordInput = screen.getByTestId("input-password");
      
      // Act - Trigger success state
      await userEvent.type(emailInput, "nouveau@exemple.com");
      await userEvent.type(passwordInput, "Motdepasse123");
      await userEvent.click(screen.getByTestId("submit-button"));
      
      await waitFor(() => {
        expect(screen.getByTestId("auth-card-title")).toHaveTextContent("Email de vérification envoyé");
      });
      
      // Act - Click reset button
      const resetButton = screen.getByRole("button", { name: /retour à la connexion/i });
      await userEvent.click(resetButton);
      
      // Assert
      await waitFor(() => {
        expect(screen.getByTestId("auth-card-title")).toHaveTextContent("Créer un compte");
      });
      expect((emailInput as HTMLInputElement).value).toBe("");
      expect((passwordInput as HTMLInputElement).value).toBe("");
    });
  });

  describe("Loading State", () => {
    it("should disable inputs and button when form is in loading state", async () => {
      // Arrange
      mockSignInWithPassword.mockImplementationOnce(() => new Promise(() => {}));
      render(<AuthForm mode="login" />);
      const emailInput = screen.getByTestId("input-email");
      const passwordInput = screen.getByTestId("input-password");
      
      // Act
      await userEvent.type(emailInput, "utilisateur@exemple.com");
      await userEvent.type(passwordInput, "Motdepasse123");
      await userEvent.click(screen.getByTestId("submit-button"));
      
      // Assert
      await waitFor(() => {
        expect(emailInput).toBeDisabled();
        expect(passwordInput).toBeDisabled();
        expect(screen.getByTestId("submit-button")).toBeDisabled();
      });
    });
  });

  describe("Conditional Rendering", () => {
    it("should show 'Mot de passe oublié ?' link only in login mode", () => {
      // Arrange & Act
      render(<AuthForm mode="login" />);
      
      // Assert
      const forgotLink = screen.getByRole("link", { name: /mot de passe oublié ?/i });
      expect(forgotLink).toHaveAttribute("href", "/forgot-password");
    });

    it("should not show 'Mot de passe oublié ?' link in signup mode", () => {
      // Arrange & Act
      render(<AuthForm mode="signup" />);
      
      // Assert
      expect(screen.queryByRole("link", { name: /mot de passe oublié ?/i })).not.toBeInTheDocument();
    });

    it("should display correct footer link for signup mode", () => {
      // Arrange & Act
      render(<AuthForm mode="signup" />);
      
      // Assert
      const footerLink = screen.getByRole("link", { name: /se connecter/i });
      expect(footerLink).toHaveAttribute("href", "/login");
    });

    it("should display correct footer link for login mode", () => {
      // Arrange & Act
      render(<AuthForm mode="login" />);
      
      // Assert
      const footerLink = screen.getByRole("link", { name: /s'inscrire/i });
      expect(footerLink).toHaveAttribute("href", "/signup");
    });
  });

  describe("Signup Validation", () => {
    it("should not call Supabase when signup validation fails", async () => {
      // Arrange
      render(<AuthForm mode="signup" />);
      
      // Act
      await userEvent.click(screen.getByTestId("submit-button"));
      
      // Assert
      expect(mockSignUp).not.toHaveBeenCalled();
    });
  });
});
