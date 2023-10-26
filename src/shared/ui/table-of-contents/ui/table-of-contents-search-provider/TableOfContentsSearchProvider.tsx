import { createContext, useMemo, useState } from 'react';

export interface ITableOfContentsSearchState {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const TableOfContentsSearchContext =
  createContext<ITableOfContentsSearchState>({
    searchTerm: '',
    setSearchTerm: () => {
      // init
    },
  });

export const TableOfContentsSearchProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const contextValue = useMemo(() => {
    return { searchTerm, setSearchTerm };
  }, [searchTerm]);

  return (
    <TableOfContentsSearchContext.Provider value={contextValue}>
      {children}
    </TableOfContentsSearchContext.Provider>
  );
};
