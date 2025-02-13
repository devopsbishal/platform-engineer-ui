import { StrictMode, Suspense } from 'react';
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { Loader } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from './components/ui/button';
import { ThemeProvider } from './context/ThemeContext';
import { queryClient, router } from './main';

interface ErrorFallbackProps {
  error: Error | null;
  resetErrorBoundary: () => void;
}

const THEME_CONFIG = {
  defaultTheme: 'light',
  storageKey: 'platform-engineering-theme',
} as const;

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => (
  <div role='alert' className='p-6 rounded-lg border border-red-200 bg-red-50'>
    <h2 className='text-lg font-semibold text-red-800'>An error occurred</h2>
    <pre className='mt-2 p-4 bg-white rounded-md text-red-600 text-sm overflow-auto'>
      {error?.message}
    </pre>
    <div className='mt-4 flex gap-2'>
      <Button onClick={resetErrorBoundary}>Try again</Button>
      <Button variant='outline' onClick={() => window.location.reload()}>
        Reload page
      </Button>
    </div>
  </div>
);

const LoadingFallback = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader className="size-10 animate-spin text-primary" />
        <p className="text-gray-600 animate-pulse">Loading application...</p>
      </div>
    </div>
  );

const App = () => (
  // TODO: REMOVE StrictMode IN Production
  <StrictMode>
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={ErrorFallback}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider
              defaultTheme={THEME_CONFIG.defaultTheme}
              storageKey={THEME_CONFIG.storageKey}
            >
              <Suspense fallback={<LoadingFallback />}>
                <RouterProvider router={router} />
              </Suspense>
            </ThemeProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  </StrictMode>
);

export default App;
