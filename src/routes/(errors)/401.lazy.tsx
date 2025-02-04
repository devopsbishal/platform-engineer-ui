import { createLazyFileRoute } from '@tanstack/react-router'
import UnauthorisedError from '@/features/errors/UnauthorizedError'

export const Route = createLazyFileRoute('/(errors)/401')({
  component: UnauthorisedError,
})
