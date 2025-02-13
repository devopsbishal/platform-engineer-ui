import { useQuery } from '@tanstack/react-query';
import { getEC2Instance } from '../api/getEC2InstancesAPI';

export function useGetEC2Instance({ page = 1, limit = 10 }) {
    return useQuery({
        queryKey: ["ec2Instances", { page, limit }],
        queryFn: () => getEC2Instance(page, limit),
        gcTime: 30 * 60 * 1000,
        staleTime: 5 * 60 * 1000,
    });
}
