import { render, screen } from '@testing-library/react'
import { AuthForm } from '@/components/AuthForm'

// Mock next/navigation
const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn(),
}

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock supabase client
jest.mock('@/supabase/client', () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
      signUp: jest.fn().mockResolvedValue({ data: { user: null, session: null }, error: null }),
    },
  }),
}))

describe('AuthForm', () => {
  it('renders login mode correctly', () => {
    render(<AuthForm mode="login" />)
    
    expect(screen.getByText('Connexion')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('votre@email.com')).toBeInTheDocument()
  })

  it('renders register mode correctly', () => {
    render(<AuthForm mode="signup" />)
    
    expect(screen.getByText('Inscription')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('votre@email.com')).toBeInTheDocument()
  })
})
