import { createFileRoute } from '@tanstack/react-router'
import GeneralError from '@/features/errors/GeneralError'

export const Route = createFileRoute('/(auth)/500')({
  component: GeneralError,
})
