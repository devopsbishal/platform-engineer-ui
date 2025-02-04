import { createLazyFileRoute } from '@tanstack/react-router'
import NotFoundError from '@/features/errors/NotFoundError'

export const Route = createLazyFileRoute('/(errors)/404')({
  component: NotFoundError,
})
