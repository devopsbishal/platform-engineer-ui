import { useMutation } from '@tanstack/react-query'
import { createUser, loginUser, verifyAccount } from '@/features/auth/api/auth'
import { useAuth } from '@/features/auth/stores/authStore'
import { toast } from '@/hooks/useToast'
import { useRedirectAfterLogin } from './useRedirectAfterLogin'
import { useNavigate } from '@tanstack/react-router'
import { PATH } from '@/constants/PATH'

interface LoginSuccessResponse {
  accessToken: string;
  message: string;
  success: boolean;
}

interface LoginErrorResponse {
  success: boolean
  status: number
  message: string
  stack: object
}

interface CreateUserResponse {
  message: string;
  success: boolean;
  user: {
    role: string;
    email: string;
    status: "active" | "inactive";
    isDeleted: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
}

interface CreateUserErrorResponse {
  error: string;
  message: string;
}

export function useLogin() {
  const { login } = useAuth()
  const redirectAfterLogin = useRedirectAfterLogin()

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data: LoginSuccessResponse) => {
      try {
        login(data.accessToken)

        toast({
          title: "Success",
          description: "Logged in successfully"
        })

        redirectAfterLogin()
      } catch (error) {
        console.error('Login processing failed:', error)
        toast({
          variant: 'destructive',
          title: 'Login failed',
          description: 'Error processing authentication data'
        })
      }
    },
    onError: (error: LoginErrorResponse) => {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: error?.message || 'Something went wrong'
      })
    }
  })
}

export function useSignUp() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: createUser,
    onSuccess: (data: CreateUserResponse) => {
      try {
        toast({
          title: "Success",
          description: "Sign up successfully"
        })

        navigate({ to: `${PATH.verifyAccount}?email=${data.user.email}` });
      } catch (error) {
        console.error('SignUp processing failed:', error)

        toast({
          variant: 'destructive',
          title: 'SignUp failed',
          description: 'Error creating user data'
        })

      }
    },
    onError: (error: CreateUserErrorResponse) => {
      toast({
        variant: 'destructive',
        title: 'SignUp failed',
        description: error?.message || 'Something went wrong'
      })
    }
  })
}

export function useVerifyAccount() {
  return useMutation({
    mutationFn: verifyAccount,
    // VerifyAccountResponse
    onSuccess: (data) => {
      try {
        toast({
          title: "Success",
          description: "Account verified successfully"
        })

        return data;
      } catch (error) {
        console.error('Account verification processing failed:', error)
        toast({
          variant: 'destructive',
          title: 'Account verification failed',
          description: 'Error verifying account'
        })
      }
    },
    onError: (error: CreateUserErrorResponse) => {
      toast({
        variant: 'destructive',
        title: 'Verification failed',
        description: error?.message || 'Something went wrong'
      })
    }
  })
}