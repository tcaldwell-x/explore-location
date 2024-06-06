import { useMemo } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { routes } from '@/constants/routes';

export function useSpaces(queries: string[]) {
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['spaces', queries],
    queryFn: async () => {
      const res = await axios({
        method: 'GET',
        url: `${routes.spaces}`,
        params: {
            queries: queries.join(',')
        },
        withCredentials: true,
      });

      return res.data.data;
    },
    enabled: false,
  });

  return useMemo(
    () => ({
      data,
      isLoading,
      isFetching,
      error,
      refetch
    }),
    [data, error, isLoading, refetch]
  );
}
