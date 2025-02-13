import EC2 from '@/features/ec2';
import { createLazyFileRoute } from '@tanstack/react-router';


export const Route = createLazyFileRoute('/_authenticated/ec2/')({
  component: EC2,
});

