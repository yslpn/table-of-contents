import { useContext } from 'react';
import {
  TableOfContentsContext,
  TableOfContentsState,
} from '../ui/table-of-contents-provider/TableOfContentsProvider';

export const useActivePath = (): TableOfContentsState => {
  return useContext(TableOfContentsContext);
};

export const useSearchTerm = (): TableOfContentsState => {
  return useContext(TableOfContentsContext);
};
