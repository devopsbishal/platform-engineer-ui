import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { PATH } from '@/constants/PATH';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { InstanceCard } from './components/InstanceCard';
import { Pagination } from './components/Pagination';
import { useGetEC2Instance } from './hooks/useGetEC2Instance.hook';

export default function EC2() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // TODO: pagination
  const { data: EC2Instance } = useGetEC2Instance({
    page: currentPage,
    limit: rowsPerPage,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Add your page change logic here
  };

  const handleRowsPerPageChange = (value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing rows per page
    // Add your rows per page change logic here
  };

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <main className='flex-1'>
          {' '}
          {/* pt-16 to account for fixed header height */}
          <div className='mx-auto max-w-7xl px-4 py-4 flex flex-col min-h-[calc(100vh-64px)]'>
            {/* Header Section */}
            <div className='mb-8 flex items-center justify-between'>
              <div>
                <h1 className='text-3xl font-bold tracking-tight'>
                  EC2 Instances
                </h1>
                <p className='mt-1 text-sm text-gray-500'>
                  Manage your EC2 instances and their configurations
                </p>
              </div>
              <Link to={PATH.createInstance}>
                <Button size='lg' className='shadow-sm'>
                  Create Instance
                </Button>
              </Link>
            </div>

            {/* Content Container */}
            <div className='flex-1 flex flex-col'>
              {/* Grid Container */}
              <div className='flex-1 mb-8'>
                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                  {EC2Instance?.results?.length || 0 > 0 ? (
                    EC2Instance?.results.map((instance) => (
                      <InstanceCard key={instance._id} instance={instance} />
                    ))
                  ) : (
                    <div className='col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center'>
                      <h3 className='text-lg font-medium'>
                        No instances found
                      </h3>
                      <p className='mt-1 text-sm text-gray-500'>
                        Get started by creating your first EC2 instance
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Pagination */}
              <div className='mt-auto'>
                <Pagination
                  currentPage={currentPage}
                  totalPages={EC2Instance?.totalPages || 1}
                  totalEntries={EC2Instance?.totalCount || 0}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
