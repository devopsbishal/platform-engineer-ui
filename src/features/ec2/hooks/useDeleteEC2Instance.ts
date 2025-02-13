import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEC2Instance } from '../api/deleteEC2Instance';
import { toast } from 'sonner';

export function useDeleteEC2Instance(instanceId: string, instanceName: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteEC2Instance(instanceId),
    onMutate: async () => {
      // Optionally, perform optimistic update here
      await queryClient.cancelQueries({ queryKey: ['ec2Instances'] });
      const previousInstances = queryClient.getQueryData(['ec2Instances']);
      queryClient.setQueryData(['ec2Instances'], (old: any) =>
        old?.filter((instance: any) => instance.id !== instanceId)
      );
      return { previousInstances };
    },
    onError: (error, _variables, context) => {
      toast.error(`Failed to delete instance ${instanceName}: ${error.message}`);
      if (context?.previousInstances) {
        queryClient.setQueryData(['ec2Instances'], context.previousInstances);
      }
    },
    onSuccess: () => {
      toast.success(`Instance ${instanceName} deleted successfully`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['ec2Instances'] });
    },
  });
}
