import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import {
  mockSignup,
  validateSignupInput,
  emailExists,
  type AuthError,
} from "@/lib/auth-service";
import type {
  AuthResponse,
  ApiErrorResponse,
  ApiValidationErrorResponse,
} from "@/lib/types";

/**
 * POST /api/auth/signup
 * Create new user account
 *
 * Response codes:
 * - 201: User created, returns { user, token }
 * - 400: Validation errors
 * - 409: Email already exists
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = validateSignupInput(body);

    // Check if email exists (double-check before signup)
    if (emailExists(validatedData.email)) {
      const response: ApiErrorResponse = {
        error: "Cet email est déjà utilisé",
      };
      return NextResponse.json(response, { status: 409 });
    }

    // Create user
    const result = await mockSignup(
      validatedData.email,
      validatedData.password,
      validatedData.name
    );

    const response: AuthResponse = {
      user: result.user,
      token: result.token,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    // Handle validation errors
    if (error instanceof ZodError) {
      const errors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      const response: ApiValidationErrorResponse = { errors };
      return NextResponse.json(response, { status: 400 });
    }

    // Handle email already exists error from service
    if (error instanceof AuthError && error.code === "EMAIL_EXISTS") {
      const response: ApiErrorResponse = { error: error.message };
      return NextResponse.json(response, { status: 409 });
    }

    // Log unexpected errors
    console.error("[Auth/Signup] Unexpected error:", error);

    // Generic error response
    const response: ApiErrorResponse = {
      error: "Une erreur interne est survenue",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
