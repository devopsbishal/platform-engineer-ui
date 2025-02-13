import ReactDOM from 'react-dom/client';
import { AxiosError } from 'axios';
import { QueryCache, QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { handleServerError } from '@/utils/helperServerError';
import { toast } from '@/hooks/useToast';
import { useAuthStore } from '@/features/auth/stores/authStore';
import App from './App';
import { PATH } from './constants/PATH';
import './index.css';
import { routeTree } from './routeTree.gen';

const HTTP_STATUS = {
  NOT_MODIFIED: 304,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  SERVER_ERROR: 500,
} as const;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (import.meta.env.DEV) console.log({ failureCount, error });

        const maxRetries = import.meta.env.PROD ? 3 : 0;
        if (failureCount > maxRetries) return false;

        return !(
          error instanceof AxiosError &&
          [HTTP_STATUS.UNAUTHORIZED, HTTP_STATUS.FORBIDDEN].includes(
            (error.response?.status ?? 0) as
              | typeof HTTP_STATUS.UNAUTHORIZED
              | typeof HTTP_STATUS.FORBIDDEN
          )
        );
      },
      refetchOnWindowFocus: import.meta.env.PROD,
      staleTime: 10 * 1000, // 10s
    },
    mutations: {
      onError: (error) => {
        handleServerError(error);

        if (error instanceof AxiosError) {
          if (error.response?.status === HTTP_STATUS.NOT_MODIFIED) {
            toast({
              variant: 'destructive',
              title: 'Content not modified!',
            });
          }
        }
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          toast({
            variant: 'destructive',
            title: 'Session expired!',
          });
          useAuthStore.getState().logout();
          const redirect = `${router.history.location.href}`;
          router.navigate({ to: PATH.signIn, search: { redirect } });
        }
        if (error.response?.status === HTTP_STATUS.SERVER_ERROR) {
          toast({
            variant: 'destructive',
            title: 'Internal Server Error!',
          });
          router.navigate({ to: '/500' });
        }
        if (error.response?.status === HTTP_STATUS.FORBIDDEN) {
          router.navigate({ to: '/403', replace: true });
        }
      }
    },
  }),
});

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Store the root instance separately
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

