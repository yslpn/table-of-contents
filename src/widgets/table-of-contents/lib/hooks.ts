import { useContext } from 'react';
import { SearchTermContext } from '../ui/search-term-provider/SearchTermProvider';
import { PathContext } from '../ui/active-path-provider/ActivePathProvider';

export const useActivePath = () => {
  return useContext(PathContext);
};

export const useSearchTerm = () => {
  return useContext(SearchTermContext);
};
