import { createLazyFileRoute } from '@tanstack/react-router'
import GeneralError from '@/features/errors/GeneralError'

export const Route = createLazyFileRoute('/(errors)/500')({
  component: GeneralError,
})
