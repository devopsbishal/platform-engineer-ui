import { useMutation } from '@tanstack/react-query'
import { createUser, loginUser, verifyAccount } from '@/features/auth/api/authApi'
import { useAuth } from '@/features/auth/stores/authStore'
import { toast } from '@/hooks/useToast'
import { useRedirectAfterLogin } from './useRedirectAfterLogin.hook'
import { useNavigate } from '@tanstack/react-router'
import { PATH } from '@/constants/PATH'
import { CreateUserErrorResponse, CreateUserResponse, LoginErrorResponse, LoginSuccessResponse } from '../types/IAuthTypes'

export function useLogin() {
  const { login } = useAuth()
  const redirectAfterLogin = useRedirectAfterLogin()

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data: LoginSuccessResponse) => {
      login(data.accessToken)

      toast({
        title: "Success",
        description: "Logged in successfully"
      })

      redirectAfterLogin()
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
      toast({
        title: "Success",
        description: "Sign up successfully"
      })

      navigate({ to: `${PATH.verifyAccount}?email=${data.user.email}` });
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
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Account verified successfully"
      })

      return data;
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