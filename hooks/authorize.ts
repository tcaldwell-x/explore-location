import { useMemo } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { routes } from '@/constants/routes';

export function useAuthorize() {
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['authorize'],
    queryFn: async () => {
      const res = await axios({
        method: 'GET',
        url: `${routes.authorize}`,
      });

      return res.data;
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