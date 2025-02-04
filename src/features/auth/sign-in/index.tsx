import { useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { PATH } from '@/constants/PATH';
import { Card } from '@/components/ui/card';
import AuthLayout from '../AuthLayout';
import { useRedirectAfterLogin } from '../hooks/useRedirectAfterLogin';
import { useAuth } from '../stores/authStore';
import { UserAuthForm } from './components/UserAuthForm';

export default function SignIn() {
  const { isAuthenticated, user } = useAuth();
  const redirectAfterLogin = useRedirectAfterLogin();

  // Double-check authentication in component for real-time protection
  useEffect(() => {
    if (isAuthenticated) {
      redirectAfterLogin();
    }
  }, [isAuthenticated, redirectAfterLogin]);

  // Optional: Add session expiry check
  useEffect(() => {
    if (user) {
      redirectAfterLogin();
    }
  }, [redirectAfterLogin, user]);

  return (
    <AuthLayout>
      <Card className='p-6'>
        <div className='flex flex-col space-y-2 text-left'>
          <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
          <p className='text-sm text-muted-foreground'>
            Enter your email and password below <br />
            to log into your account
          </p>
        </div>
        <UserAuthForm />
        <p className='text-center mt-4'>
          Don't have an account yet? <Link className='underline underline-offset-4' to={PATH.signUp}>Sign Up</Link>
        </p>
        <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
          By clicking login, you agree to our{' '}
          <a
            href='/terms'
            className='underline underline-offset-4 hover:text-primary'
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href='/privacy'
            className='underline underline-offset-4 hover:text-primary'
          >
            Privacy Policy
          </a>
          .
        </p>
      </Card>
    </AuthLayout>
  );
}
