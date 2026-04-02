import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthForm } from '@/components/AuthForm'

const mockSignIn = jest.fn()
const mockPush = jest.fn()

jest.mock('@/supabase/client', () => ({
  supabase: {
    auth: {
      signInWithPassword: mockSignIn,
    },
  },
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('AuthForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders login form with email and password fields', () => {
    render(<AuthForm />)
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('calls signInWithPassword with correct credentials on submit', async () => {
    const user = userEvent.setup()
    render(<AuthForm />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(mockSignIn).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })
  })

  it('redirects to /dashboard on successful login', async () => {
    const user = userEvent.setup()
    mockSignIn.mockResolvedValueOnce({ data: { session: { user: { id: '1' } } }, error: null })

    render(<AuthForm />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('displays error message on failed login', async () => {
    const user = userEvent.setup()
    mockSignIn.mockResolvedValueOnce({ data: null, error: { message: 'Invalid credentials' } })

    render(<AuthForm />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'wrongpassword')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })
  })
})
