import React from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { ChevronRight, Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

interface CustomBreadcrumbProps {
  separator?: React.ReactNode;
  showHomeIcon?: boolean;
}

export default function CustomBreadcrumb({
  separator = <ChevronRight className='h-4 w-4' />,
  showHomeIcon = true,
}: CustomBreadcrumbProps) {
  const router = useRouter();
  const currentRoute = router.state.location.pathname;

  // Generate breadcrumb items from the current route

  const generateBreadcrumbItems = (path: string): BreadcrumbItem[] => {
    const segments = path.split('/').filter(Boolean);

    return segments.map((segment, index) => {
      const currentPath = `/${segments.slice(0, index + 1).join('/')}`;

      // Convert kebab-case to title case (e.g., "product-category" => "Product Category")
      const label = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(' '); // Join them back with a space

      return {
        label,
        path: currentPath,
      };
    });
  };

  const items = generateBreadcrumbItems(currentRoute);

  return (
    <Breadcrumb className=''>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              to='/'
              className='flex items-center hover:text-primary transition-colors'
            >
              {showHomeIcon && <Home className='h-4 w-4 mr-1' />}
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={item.path}>
              <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className='flex items-center'>
                    {item.icon && <span className='mr-1'>{item.icon}</span>}
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      to={item.path}
                      className='flex items-center hover:text-primary transition-colors'
                    >
                      {item.icon && <span className='mr-1'>{item.icon}</span>}
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
