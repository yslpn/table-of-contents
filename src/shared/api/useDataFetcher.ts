import useSWR from 'swr';
import { fetcher } from './fetcher';

interface ApiResponse<T> {
  data: T | undefined;
}

export function useDataFetcher<T>(url: string): ApiResponse<T> {
  const { data } = useSWR<T>(url, fetcher);

  return {
    data,
  };
}
