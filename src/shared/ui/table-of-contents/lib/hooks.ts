import { useContext } from 'react';
import {
  ITableOfContentsSearchState,
  TableOfContentsSearchContext,
} from '../ui/table-of-contents-search-provider/TableOfContentsSearchProvider';
import {
  ITableOfContentsPathState,
  TableOfContentsPathContext,
} from '../ui/table-of-contents-path-provider/TableOfContentsPathProvider';

export const useActivePath = (): ITableOfContentsPathState => {
  return useContext(TableOfContentsPathContext);
};

export const useSearchTerm = (): ITableOfContentsSearchState => {
  return useContext(TableOfContentsSearchContext);
};
