import VerifyAccount from '@/features/auth/verify-account'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(auth)/verify-account')({
  component: VerifyAccount,
})

