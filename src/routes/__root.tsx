import { useEffect } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Toaster } from 'sonner';
import { useAuthStore } from '@/features/auth/stores/authStore';
import GeneralError from '@/features/errors/GeneralError';
import NotFoundError from '@/features/errors/NotFoundError';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  beforeLoad: () => {
    // Initialize auth state before any route loads
    useAuthStore.getState().initialize();
  },
  component: RootComponent,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
});

function RootComponent() {
  // Optionally reinitialize auth on mount
  useEffect(() => {
    // Check if an authentication token exists.
    // If a token is found, call the login function with the token.
    useAuthStore.getState().initialize();
  }, []);

  return (
    <>
      <Outlet />
      <Toaster position='top-right' />
      {import.meta.env.MODE === 'development' && (
        <>
          <ReactQueryDevtools buttonPosition='bottom-left' />
          <TanStackRouterDevtools position='bottom-right' />
        </>
      )}
    </>
  );
}
