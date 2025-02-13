import { useNavigate, useRouter } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface GeneralErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string;
  message?: string;
  minimal?: boolean;
}

export default function CustomError({
  heading = 'Oops! Something went wrong',
  message = 'We apologize for the inconvenience. Please try again later.',
  minimal = false,
  className,
}: GeneralErrorProps) {
  const navigate = useNavigate();
  const { history } = useRouter();

  return (
    <div className={cn('h-svh w-full', className)}>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        {!minimal && (
          <h1 className='text-[7rem] font-bold leading-tight'>404</h1>
        )}
        <span className='font-medium'>{heading}</span>
        <p className='text-center  max-w-96 text-muted-foreground'>{message}</p>
        {!minimal && (
          <div className='mt-6 flex gap-4'>
            <Button variant='outline' onClick={() => history.back()}>
              Go Back
            </Button>
            <Button onClick={() => navigate({ to: '/' })}>Back to Home</Button>
          </div>
        )}
      </div>
    </div>
  );
}
