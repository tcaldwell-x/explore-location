import { useMemo } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { routes } from '@/constants/routes';

export function usePostData(query: string) {
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axios({
        method: 'GET',
        url: `${routes.posts}`,
        params: {
          query: query
        },
        withCredentials: true,
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
