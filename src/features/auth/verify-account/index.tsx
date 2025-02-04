import { useEffect } from 'react';
import { useSearch } from '@tanstack/react-router';
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
