/**
 * Application constants for authentication flows.
 */

export const REDIRECT_AFTER_AUTH = '/dashboard';
export const AUTH_FALLBACK_URL = '/';

export const AUTH_REDIRECT_URL = '/dashboard';

// Messages d'erreur d'authentification
export const AUTH_ERROR_MESSAGES = {
  INVALID_CODE: 'Code d\'autorisation invalide ou expiré.',
  SESSION_ERROR: 'Erreur lors de la création de la session.',
  NETWORK_ERROR: 'Erreur de connexion. Veuillez réessayer.',
} as const;

// Messages d'authentification par mode (login/signup)
export const AUTH_MESSAGES = {
  login: {
    title: 'Connexion',
    description: 'Accédez à votre compte Haurus pour suivre vos paris.',
    submit: 'Se connecter',
    footer: {
      text: 'Pas encore de compte ?',
      link: 'Créer un compte',
      href: '/signup',
    },
  },
  signup: {
    title: 'Créer un compte',
    description: 'Rejoignez Haurus et commencez à détecter les value bets.',
    submit: 'S\'inscrire',
    footer: {
      text: 'Déjà un compte ?',
      link: 'Se connecter',
      href: '/login',
    },
  },
} as const;

// Messages de validation
export const VALIDATION_MESSAGES = {
  email: {
    required: 'L\'email est requis.',
    invalid: 'Veuillez entrer une adresse email valide.',
  },
  password: {
    required: 'Le mot de passe est requis.',
    minLength: 'Le mot de passe doit contenir au moins 8 caractères.',
  },
} as const;
