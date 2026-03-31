import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import {
  mockLogin,
  validateLoginInput,
  type AuthError,
} from "@/lib/auth-service";
import type {
  AuthResponse,
  ApiErrorResponse,
  ApiValidationErrorResponse,
} from "@/lib/types";

/**
 * POST /api/auth/login
 * Authenticate user with email and password
 *
 * Response codes:
 * - 200: Success, returns { user, token }
 * - 400: Validation errors
 * - 401: Invalid credentials
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = validateLoginInput(body);

    // Attempt login
    const result = await mockLogin(
      validatedData.email,
      validatedData.password
    );

    const response: AuthResponse = {
      user: result.user,
      token: result.token,
    };

    return NextResponse.json(response, { status: 200 });
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

    // Handle authentication errors
    if (error instanceof AuthError && error.code === "INVALID_CREDENTIALS") {
      const response: ApiErrorResponse = { error: error.message };
      return NextResponse.json(response, { status: 401 });
    }

    // Log unexpected errors
    console.error("[Auth/Login] Unexpected error:", error);

    // Generic error response
    const response: ApiErrorResponse = {
      error: "Une erreur interne est survenue",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
