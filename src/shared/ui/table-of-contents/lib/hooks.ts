import { useContext } from 'react';
import {
  ActiveItemState,
  ActivePathContext,
} from '../ui/active-path-provider/ActivePathProvider';

export const useActivePath = (): ActiveItemState => {
  return useContext(ActivePathContext);
};

export const useSearchTerm = (): ActiveItemState => {
  return useContext(ActivePathContext);
};
