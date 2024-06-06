import { useMemo } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Location } from '@/app/shared/types';
import { routes } from '@/constants/routes';

export function useWoeid(location: Location) {
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['woeid'],
    queryFn: async () => {
      const res = await axios({
        method: 'GET',
        url: `${routes.woeid}`,
        params: {
          lat: location.lat,
          long: location.long
        },
        withCredentials: true,
      });

      return res.data.data[0].woeid;
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
