import { useEffect } from 'react';
import { useSearch } from '@tanstack/react-router';
import CustomError from '@/features/errors/CustomError';
import { useVerifyAccount } from '../hooks/useAuth.hook';
import Otp from '../otp';

interface Params {
  email?: string;
  otp?: string;
}

export default function VerifyAccount() {
  const { email, otp } = useSearch({
    from: '/(auth)/verify-account',
  }) as Params;

  const verifyAccount = useVerifyAccount();

  if (!email) {
    return (
      <CustomError
        heading='Invalid URL format'
        message="The page you're looking for doesn't exist. Please check the URL or return to the homepage."
      />
    );
  }

  useEffect(() => {
    const data = {
      email: email || '',
      otp: Number(otp) || 0,
    };

    if (email && otp) {
      verifyAccount.mutate(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, otp]);

  return (
    <>
      <Otp />
    </>
  );
}
