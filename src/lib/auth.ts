/**
 * Validation utilities for authentication forms
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;

export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'L\'adresse email est requise' };
  }

  const trimmed = email.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: 'L\'adresse email est requise' };
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return { valid: false, error: 'Adresse email invalide' };
  }

  if (trimmed.length > 254) {
    return { valid: false, error: 'Adresse email trop longue' };
  }

  return { valid: true };
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (!password || typeof password !== 'string') {
    return { valid: false, error: 'Le mot de passe est requis' };
  }

  if (password.length === 0) {
    return { valid: false, error: 'Le mot de passe est requis' };
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      valid: false,
      error: `Le mot de passe doit contenir au moins ${PASSWORD_MIN_LENGTH} caractères`,
    };
  }

  return { valid: true };
}

interface SupabaseError {
  __brand?: 'supabase-error';
}

interface AuthError {
  message: string;
  status?: number;
}

type SupabaseAuthError = AuthError | SupabaseError | null | undefined;

const ERROR_MESSAGES: Record<string, string> = {
  'Invalid login credentials': 'Email ou mot de passe incorrect',
  'Email not confirmed': 'Veuillez confirmer votre adresse email',
  'User already registered': 'Un compte existe déjà avec cette adresse email',
  'Invalid email': 'Adresse email invalide',
  'Signup requires a valid password': 'Mot de passe invalide',
  'Password should be at least 6 characters': 'Le mot de passe doit contenir au moins 6 caractères',
  'User not found': 'Aucun compte trouvé avec cette adresse email',
  'Invalid grant type': 'Type de connexion invalide',
  'A confirm link is not valid for this user': 'Lien de confirmation invalide ou expiré',
  'Email link is invalid or has expired': 'Le lien est invalide ou a expiré',
  'Too many requests': 'Trop de tentatives, veuillez réessayer plus tard',
  'Phone number is invalid': 'Numéro de téléphone invalide',
  'Phone number is already subscribed': 'Numéro de téléphone déjà utilisé',
};

const DEFAULT_ERROR_MESSAGE = 'Une erreur est survenue, veuillez réessayer';

export function mapSupabaseError(error: SupabaseAuthError): { code: string; message: string } {
  if (!error) {
    return { code: 'UNKNOWN', message: DEFAULT_ERROR_MESSAGE };
  }

  const errorMessage = (error as AuthError).message ?? String(error);

  const knownMessage = ERROR_MESSAGES[errorMessage];

  if (knownMessage) {
    return {
      code: errorMessage.toUpperCase().replace(/ /g, '_'),
      message: knownMessage,
    };
  }

  if (errorMessage.includes('duplicate key') || errorMessage.includes('already exists')) {
    return {
      code: 'ALREADY_EXISTS',
      message: 'Un compte existe déjà avec ces informations',
    };
  }

  if (errorMessage.includes('rate limit') || errorMessage.includes('rate_limit')) {
    return {
      code: 'RATE_LIMIT',
      message: 'Trop de tentatives, veuillez réessayer plus tard',
    };
  }

  console.warn('Unknown Supabase auth error:', errorMessage);

  return {
    code: 'UNKNOWN',
    message: DEFAULT_ERROR_MESSAGE,
  };
}
