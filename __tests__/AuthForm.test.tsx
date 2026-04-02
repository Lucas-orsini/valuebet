import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthForm } from "@/components/auth/AuthForm";

const mockPush = jest.fn();
const mockRefresh = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

const mockSignInWithPassword = jest.fn();
const mockSignUp = jest.fn();
const mockCreateClient = jest.fn().mockReturnValue({
  auth: {
    signInWithPassword: mockSignInWithPassword,
    signUp: mockSignUp,
  },
});

jest.mock("@/supabase/client", () => ({
  createClient: () => mockCreateClient(),
}));

describe("AuthForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("login mode", () => {
    it("should show email required error when submitting with empty email and not call Supabase", async () => {
      const user = userEvent.setup();
      render(<AuthForm mode="login" />);

      const submitButton = screen.getByRole("button", { name: /se connecter/i });
      await user.click(submitButton);

      const errorMessage = await screen.findByRole("alert", { name: /l'email est requis/i });
      expect(errorMessage).toBeInTheDocument();
      expect(mockSignInWithPassword).not.toHaveBeenCalled();
    });

    it("should show password min length error when submitting with too short password", async () => {
      const user = userEvent.setup();
      render(<AuthForm mode="login" />);

      const emailInput = screen.getByRole("textbox", { name: /email/i });
      await user.type(emailInput, "test@example.com");

      const submitButton = screen.getByRole("button", { name: /se connecter/i });
      await user.click(submitButton);

      const errorMessage = await screen.findByRole("alert", { name: /le mot de passe est requis/i });
      expect(errorMessage).toBeInTheDocument();
    });

    it("should navigate to /dashboard when login credentials are valid", async () => {
      const user = userEvent.setup();
      mockSignInWithPassword.mockResolvedValueOnce({ error: null });

      render(<AuthForm mode="login" />);

      const emailInput = screen.getByRole("textbox", { name: /email/i });
      const passwordInput = screen.getByLabelText(/mot de passe/i);

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");
      await user.click(screen.getByRole("button", { name: /se connecter/i }));

      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });

    it("should show Supabase error message when login fails with invalid credentials", async () => {
      const user = userEvent.setup();
      mockSignInWithPassword.mockResolvedValueOnce({
        error: { message: "Invalid login credentials" },
      });

      render(<AuthForm mode="login" />);

      const emailInput = screen.getByRole("textbox", { name: /email/i });
      const passwordInput = screen.getByLabelText(/mot de passe/i);

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "wrongpassword");
      await user.click(screen.getByRole("button", { name: /se connecter/i }));

      const errorMessage = await screen.findByRole("alert", { name: /invalid login credentials/i });
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("signup mode", () => {
    it("should navigate to /dashboard when signup succeeds", async () => {
      const user = userEvent.setup();
      mockSignUp.mockResolvedValueOnce({ error: null });

      render(<AuthForm mode="signup" />);

      const emailInput = screen.getByRole("textbox", { name: /email/i });
      const passwordInput = screen.getByLabelText(/mot de passe/i);

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");
      await user.click(screen.getByRole("button", { name: /créer un compte/i }));

      expect(mockSignUp).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });

    it("should show footer link to 'Se connecter' in signup mode", () => {
      render(<AuthForm mode="signup" />);

      const loginLink = screen.getByRole("button", { name: /se connecter/i });
      expect(loginLink).toBeInTheDocument();
    });
  });

  describe("error clearing", () => {
    it("should clear email error when user types in email field", async () => {
      const user = userEvent.setup();
      render(<AuthForm mode="login" />);

      const submitButton = screen.getByRole("button", { name: /se connecter/i });
      await user.click(submitButton);

      const errorMessage = await screen.getByRole("alert", { name: /l'email est requis/i });
      expect(errorMessage).toBeInTheDocument();

      const emailInput = screen.getByRole("textbox", { name: /email/i });
      await user.type(emailInput, "test@example.com");

      expect(screen.queryByRole("alert", { name: /l'email est requis/i })).not.toBeInTheDocument();
    });

    it("should clear password error when user types in password field", async () => {
      const user = userEvent.setup();
      render(<AuthForm mode="login" />);

      const emailInput = screen.getByRole("textbox", { name: /email/i });
      await user.type(emailInput, "test@example.com");

      const submitButton = screen.getByRole("button", { name: /se connecter/i });
      await user.click(submitButton);

      const errorMessage = await screen.getByRole("alert", { name: /le mot de passe est requis/i });
      expect(errorMessage).toBeInTheDocument();

      const passwordInput = screen.getByLabelText(/mot de passe/i);
      await user.type(passwordInput, "password123");

      expect(screen.queryByRole("alert", { name: /le mot de passe est requis/i })).not.toBeInTheDocument();
    });
  });
});
