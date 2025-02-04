import { HTMLAttributes, useRef, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearch } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useVerifyAccount } from '../../hooks/useAuth.hook';

type OtpFormProps = HTMLAttributes<HTMLDivElement>;

const formSchema = z.object({
  otp: z.string().length(6, { message: 'OTP must be 6 digits long.' }),
});

export function OtpForm({ className, ...props }: OtpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(7).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  const { email } = useSearch({ from: '/(auth)/verify-account' }) as {
    email?: string;
  };
  const verifyAccount = useVerifyAccount();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: '' },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    verifyAccount.mutate(
      {
        email: email || '',
        otp: Number(data.otp),
      },
      {
        onSuccess: () => {
          console.log('Success');
        },
        onError: (error) => {
          console.error('Error:', error);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // Only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Update form value
    const otpString = newOtp.join('');
    form.setValue('otp', otpString);

    // Move focus to next field if a digit is entered
    if (value && index < 6) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when last digit is filled
    if (index === 5 && otpString.length === 6) {
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='otp'
              render={() => (
                <FormItem className='space-y-1'>
                  <FormControl>
                    <div className='flex h-10 justify-between'>
                      {Array.from({ length: 6 }, (_, i) => {
                        return (
                          <Input
                            key={i}
                            ref={(el) => {
                              inputRefs.current[i] = el;
                            }}
                            id={`otp-${i}`}
                            className={`w-10 text-center ${form.getFieldState('otp').invalid ? 'border-red-500' : ''}`}
                            maxLength={1}
                            value={otp[i]}
                            onChange={(e) => handleChange(e.target.value, i)}
                            onKeyDown={(e) => {
                              if (e.key === 'Backspace' && !otp[i] && i > 0) {
                                inputRefs.current[i - 1]?.focus();
                              }
                            }}
                          />
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Button
              className='mt-2'
              disabled={isLoading || otp.join('').length < 6}
            >
              Verify Email
            </Button> */}
          </div>
        </form>
      </Form>
    </div>
  );
}
