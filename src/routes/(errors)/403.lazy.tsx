import { createLazyFileRoute } from '@tanstack/react-router'
import ForbiddenError from '@/features/errors/Forbidden'

export const Route = createLazyFileRoute('/(errors)/403')({
  component: ForbiddenError,
})
