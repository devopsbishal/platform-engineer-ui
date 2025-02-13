import { createLazyFileRoute } from '@tanstack/react-router';
import CreateInstance from '@/features/ec2/create-instance';

export const Route = createLazyFileRoute(
  '/_authenticated/ec2/create-instance/'
)({
  component: CreateInstance,
});
