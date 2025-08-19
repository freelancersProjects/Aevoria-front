import { useQuery } from '@tanstack/react-query';
import apiService from '../services/apiService';

const useFetch = (endpoint, options = {}) => {
  const {
    enabled = true,
    ...queryOptions
  } = options;

  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      if (!endpoint) return null;
      const response = await apiService.get(endpoint);
      return response;
    },
    enabled: !!endpoint && enabled,
    ...queryOptions,
  });
};

export default useFetch;
