import { useMutation } from '@tanstack/react-query';
import { createInstance } from '../api/createEC2InstancesApi';
import { toast } from '@/hooks/useToast';

export function useCreateInstance() {
    return useMutation({
        mutationFn: createInstance,
        onSuccess: (data) => {
            toast({
                title: "Instance Created",
                description: "The EC2 instance was successfully created."
            });

            return data;
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Failed to Create Instance',
                description: error?.message || 'Something went wrong'
            });
        }
    });
}
