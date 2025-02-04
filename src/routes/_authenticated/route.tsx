import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { PATH } from '@/constants/PATH';
import { SearchProvider } from '@/context/SearchContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import SkipToMain from '@/components/SkipToMain';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { useAuth, useAuthStore } from '@/features/auth/stores/authStore';
import { fetchUserProfile } from '@/utils/fetchUserProfile';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ location }) => {
    // Get auth state directly from the store
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
      // Redirect to login with return URL
      throw redirect({
        to: PATH.signIn,
        search: {
          redirect: location.href,
        },
      });
    }
  },
  loader: async () => {
    // Get user ID from auth store
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const defaultOpen = Cookies.get('sidebar:state') !== 'false';

  const { isAuthenticated, user, accessToken } = useAuth();
  const navigate = useNavigate();

  // Double-check authentication in component for real-time protection
  useEffect(() => {
    if (!isAuthenticated) {
      navigate({
        to: PATH.signIn,
      });
    }
  }, [isAuthenticated, navigate]);

  // Optional: Add session expiry check
  useEffect(() => {
    if (!user) {
      navigate({
        to: PATH.signIn,
      });
    }
  }, [user, navigate]);

  useQuery({
    queryKey: ['userProfile', user?.id, accessToken],
    queryFn: () => fetchUserProfile(accessToken!),
    gcTime: 30 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    enabled: !!user && !!accessToken,
  });

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar />
        <div
          id='content'
          className={cn(
            'max-w-full w-full ml-auto',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'transition-[width] ease-linear duration-200',
            'h-svh flex flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'
          )}
        >
          <Outlet />
        </div>
      </SidebarProvider>
    </SearchProvider>
  );
}
