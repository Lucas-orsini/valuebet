import type { LoginInput, SignupInput } from "./validators";

interface AuthResult {
  success: boolean;
  data?: {
    user: {
      id: string;
      email: string;
      name: string;
    };
    token: string;
  };
  error?: string;
  field?: string;
}

// Simulated delay for realistic API behavior
const simulateDelay = (ms: number = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock user database
const mockUsers: Record<string, { password: string; name: string }> = {
  "test@haurus.com": { password: "Test123!", name: "Test User" },
};

export async function login(
  credentials: LoginInput
): Promise<AuthResult> {
  try {
    await simulateDelay();

    // Mock validation
    if (!credentials.email || !credentials.password) {
      return {
        success: false,
        error: "Email et mot de passe sont requis",
        field: "email",
      };
    }

    // Simulate invalid credentials
    if (credentials.password.length < 6) {
      return {
        success: false,
        error: "Email ou mot de passe incorrect",
        field: "password",
      };
    }

    // Simulate successful login
    return {
      success: true,
      data: {
        user: {
          id: "usr_" + Math.random().toString(36).substring(7),
          email: credentials.email,
          name: mockUsers[credentials.email]?.name || credentials.email.split("@")[0],
        },
        token: "jwt_" + Math.random().toString(36).substring(7),
      },
    };
  } catch {
    return {
      success: false,
      error: "Une erreur est survenue lors de la connexion",
    };
  }
}

export async function signup(
  data: SignupInput
): Promise<AuthResult> {
  try {
    await simulateDelay();

    // Check if email already exists (mock)
    if (data.email === "existing@haurus.com") {
      return {
        success: false,
        error: "Cet email est déjà utilisé",
        field: "email",
      };
    }

    // Simulate successful signup
    return {
      success: true,
      data: {
        user: {
          id: "usr_" + Math.random().toString(36).substring(7),
          email: data.email,
          name: data.name,
        },
        token: "jwt_" + Math.random().toString(36).substring(7),
      },
    };
  } catch {
    return {
      success: false,
      error: "Une erreur est survenue lors de la création du compte",
    };
  }
}
