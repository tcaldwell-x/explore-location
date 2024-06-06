import { useMemo } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { routes } from '@/constants/routes';

export function useTrends(woeid: string) {
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['trends', woeid],
    queryFn: async () => {
      const res = await axios({
        method: 'GET',
        url: routes.trends(woeid),
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