import { format } from 'date-fns';
import { Copy, Server, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CustomTooltip from '@/components/ui/custom/CustomTooltip';
import { useDeleteEC2Instance } from '../hooks/useDeleteEC2Instance';

interface InstanceCardProps {
  instance: {
    _id: string;
    instanceName: string;
    resourceId: string;
    instanceType: string;
    amiId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    ipAddress?: {
      publicIP: string;
      privateIP: string;
    };
    tags?: Array<Record<string, string>>;
  };
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'running':
      return 'bg-emerald-500';
    case 'stopped':
      return 'bg-red-500';
    case 'pending':
      return 'bg-amber-500';
    default:
      return 'bg-gray-500';
  }
};

export const InstanceCard = ({ instance }: InstanceCardProps) => {
  const deleteEC2Intance = useDeleteEC2Instance(
    instance._id,
    instance.instanceName
  );

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const handleDelete = () => {
    // Add your delete logic here
    // promise toast
    deleteEC2Intance.mutate();
  };

  return (
    <Card className='p-4 sm:p-6 relative transition-all duration-300 hover:shadow-lg animate-fade-in'>
      {/* Header Section */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-3'>
        <div className='flex items-start sm:items-center gap-3 min-w-0'>
          <div className='rounded-full bg-gray-100 p-2 shrink-0'>
            <Server className='h-5 w-5 text-gray-600' />
          </div>
          <div className='min-w-0 flex-1'>
            <h3 className='font-medium truncate'>
              <CustomTooltip
                triggerElement={instance.instanceName}
                tooltipContent={instance.instanceName}
              />
            </h3>
            <p className='text-sm text-gray-500 truncate'>
              {/* TODO: Copy to clipboard */}
              <CustomTooltip
                triggerElement={instance.resourceId}
                tooltipContent={instance.resourceId}
              />
            </p>
          </div>
        </div>

        <div className='flex items-center justify-between sm:justify-end gap-3 sm:gap-4 ml-11 sm:ml-0'>
          <div className='flex items-center gap-2 min-w-[90px]'>
            <div
              className={`h-2 w-2 rounded-full shrink-0 ${getStatusColor(instance.status)}`}
            />
            <span className='text-sm font-medium capitalize truncate'>
              {instance.status}
            </span>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='ghost' size='icon' className='h-8 w-8 shrink-0'>
                <Trash2 className='h-4 w-4 text-red-500 hover:text-red-600' />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Instance</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete instance "
                  {instance.instanceName}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className='bg-red-500 hover:bg-red-600'
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Instance Details Grid */}
      <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div>
          <p className='text-sm text-gray-500'>Instance Type</p>
          <p className='font-medium truncate'>{instance.instanceType}</p>
        </div>
        <div>
          <p className='text-sm text-gray-500'>AMI ID</p>
          <p className='font-medium truncate'>
            <CustomTooltip
              triggerElement={instance.amiId}
              tooltipContent={instance.amiId}
            />
          </p>
        </div>
      </div>

      {/* IP Addresses Section */}
      <div className='mt-4 space-y-2'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between rounded-md bg-gray-50 p-2 gap-2'>
          <span className='text-sm text-gray-600'>Public IP</span>
          <div className='flex items-center gap-2 overflow-x-auto'>
            <span className='font-mono text-sm whitespace-nowrap'>
              {instance?.ipAddress?.publicIP}
            </span>
            {!!instance?.ipAddress?.publicIP && (
              <Button
                variant='ghost'
                size='sm'
                className='h-8 w-8 p-0 shrink-0'
                onClick={() =>
                  copyToClipboard(instance?.ipAddress?.publicIP ?? '', 'Public IP')
                }
              >
                <Copy className='h-4 w-4' />
              </Button>
            )}
          </div>
        </div>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between rounded-md bg-gray-50 p-2 gap-2'>
          <span className='text-sm text-gray-600'>Private IP</span>
          <div className='flex items-center gap-2 overflow-x-auto'>
            <span className='font-mono text-sm whitespace-nowrap'>
              {instance?.ipAddress?.privateIP}
            </span>
            {!!instance?.ipAddress?.privateIP && (
              <Button
                variant='ghost'
                size='sm'
                className='h-8 w-8 p-0 shrink-0'
                onClick={() =>
                  copyToClipboard(instance?.ipAddress?.privateIP ?? '', 'Private IP')
                }
              >
                <Copy className='h-4 w-4' />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Tags Section */}
      <div className='mt-4 flex flex-wrap gap-2'>
        {Array.isArray(instance?.tags) && instance.tags.length > 0 &&
          instance?.tags?.map((tag, index) => {
            const [key, value] = Object.entries(tag)[0];
            return (
              <Badge key={index} variant='secondary' className='text-xs'>
                {key}: {value}
              </Badge>
            );
          })}
      </div>

      {/* Timestamps Section */}
      <div className='mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-gray-500 gap-2'>
        <span>
          Created {format(new Date(instance.createdAt), 'MMM d, yyyy')}
        </span>
        <span>
          Updated {format(new Date(instance.updatedAt), 'MMM d, yyyy')}
        </span>
      </div>
    </Card>
  );
};
