import { useQuery } from '@tanstack/react-query';
import { getInstancetype } from '../api';

export function useInstanceType() {
    return useQuery({
        queryKey: ["Instance Type"],
        queryFn: getInstancetype,
        gcTime: 30 * 60 * 1000,
        staleTime: 5 * 60 * 1000,
    });
}
