import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthForm } from '../components/AuthForm'
import { createClient } from '@/supabase/client'

jest.mock('@/supabase/client', () => ({
  createClient: jest.fn()
}))

const mockCreateClient = createClient as jest.MockedFunction<typeof createClient>

describe('AuthForm', () => {
  const mockSupabaseClient = {
    auth: {
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn()
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockCreateClient.mockReturnValue(mockSupabaseClient as any)
  })

  describe('sign up mode', () => {
    it('renders sign up form with email and password fields', () => {
      render(<AuthForm mode="signup" />)

      expect(screen.getByLabelText('Email')).toBeInTheDocument()
      expect(screen.getByLabelText('Password')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
    })

    it('calls signUp with email and password on submit', async () => {
      mockSupabaseClient.auth.signUp.mockResolvedValue({ data: {}, error: null })

      render(<AuthForm mode="signup" />)

      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } })
      fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } })
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

      await waitFor(() => {
        expect(mockSupabaseClient.auth.signUp).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123',
          options: {
            emailRedirectTo: undefined
          }
        })
      })
    })

    it('displays error message when sign up fails', async () => {
      mockSupabaseClient.auth.signUp.mockResolvedValue({
        data: {},
        error: { message: 'Email already registered' }
      })

      render(<AuthForm mode="signup" />)

      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'existing@example.com' } })
      fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } })
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

      await waitFor(() => {
        expect(screen.getByText('Email already registered')).toBeInTheDocument()
      })
    })

    it('does not require email verification after sign up', async () => {
      mockSupabaseClient.auth.signUp.mockResolvedValue({
        data: { user: { id: '123' }, session: { access_token: 'token' } },
        error: null
      })

      render(<AuthForm mode="signup" />)

      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'new@example.com' } })
      fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } })
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

      await waitFor(() => {
        expect(mockSupabaseClient.auth.signUp).toHaveBeenCalledWith(
          expect.objectContaining({
            options: expect.not.objectContaining({
              data: expect.objectContaining({
                emailConfirm: true
              })
            })
          })
        )
      })
    })
  })

  describe('sign in mode', () => {
    it('renders sign in form with email and password fields', () => {
      render(<AuthForm mode="signin" />)

      expect(screen.getByLabelText('Email')).toBeInTheDocument()
      expect(screen.getByLabelText('Password')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    })

    it('calls signInWithPassword with email and password on submit', async () => {
      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({ data: {}, error: null })

      render(<AuthForm mode="signin" />)

      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } })
      fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } })
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

      await waitFor(() => {
        expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123'
        })
      })
    })
  })
})
