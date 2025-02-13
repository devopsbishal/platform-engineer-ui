import { useQuery } from '@tanstack/react-query';
import { getAMIList } from '../api';

export function useAMIList() {
    return useQuery({
        queryKey: ["AMI list"],
        queryFn: getAMIList,
        gcTime: 30 * 60 * 1000,
        staleTime: 5 * 60 * 1000,
    });
}
