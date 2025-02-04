import { Link, useCanGoBack, useRouter } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { PATH } from '@/constants/PATH';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AuthLayout from '../AuthLayout';
import { OtpForm } from './components/OtpForm';

export default function Otp() {
  const router = useRouter();
  const canGoBack = useCanGoBack();

  return (
    <AuthLayout>
      <Card className='p-6'>
        <div className='mb-2 flex flex-col space-y-2 text-left'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Check your inbox
          </h1>
          <p className='text-sm text-muted-foreground'>
            Please enter the authentication code. <br /> We have sent the
            authentication code to your email.
          </p>
        </div>
        <OtpForm />
        <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
          Haven't received it?{' '}
          <Link
            to={PATH.signIn}
            className='underline underline-offset-4 hover:text-primary'
          >
            Resend a new code..
          </Link>
        </p>
      </Card>
      {canGoBack && (
        <>
          <Button
            className='mx-auto mt-4 flex gap-2'
            variant={'ghost'}
            onClick={() => router.history.back()}
          >
            <ArrowLeft />
            Go Back
          </Button>
        </>
      )}
    </AuthLayout>
  );
}
