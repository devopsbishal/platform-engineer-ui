import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalEntries: number;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalEntries,
  rowsPerPage,
  onRowsPerPageChange,
}: PaginationProps) => {
  const startEntry = (currentPage - 1) * rowsPerPage + 1;
  const endEntry = Math.min(currentPage * rowsPerPage, totalEntries);

  return (
    <div className='flex items-center justify-between py-4'>
      {/* Entries info */}
      <div className='text-sm text-gray-600'>
        Showing {startEntry} to {endEntry} of {totalEntries} entries
      </div>

      {/* Rows per page selector */}
      <div className='flex items-center gap-2'>
        <span className='text-sm text-gray-600'>Rows per page</span>
        <Select
          value={rowsPerPage.toString()}
          onValueChange={(value) => onRowsPerPageChange(Number(value))}
        >
          <SelectTrigger className='w-16'>
            <SelectValue placeholder='10' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='5'>5</SelectItem>
            <SelectItem value='10'>10</SelectItem>
            <SelectItem value='20'>20</SelectItem>
            <SelectItem value='50'>50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Page navigation */}
      <div className='flex items-center gap-2'>
        <div className='text-sm text-gray-600 mr-4'>
          Page {currentPage} of {totalPages}
        </div>
        <Button
          variant='outline'
          size='icon'
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className='h-8 w-8'
        >
          <DoubleArrowLeftIcon className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          size='icon'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='h-8 w-8'
        >
          <ChevronLeftIcon className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          size='icon'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='h-8 w-8'
        >
          <ChevronRightIcon className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          size='icon'
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className='h-8 w-8'
        >
          <DoubleArrowRightIcon className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
