import { createLazyFileRoute } from '@tanstack/react-router'
import ComingSoon from '@/components/ComingSoon'

export const Route = createLazyFileRoute('/_authenticated/help-center/')({
  component: ComingSoon,
})
