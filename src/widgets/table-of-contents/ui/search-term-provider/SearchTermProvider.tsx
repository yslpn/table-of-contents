import { type ReactNode, createContext, useMemo, useState } from 'react';

interface ISearchTermState {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const SearchTermContext = createContext<ISearchTermState>({
  searchTerm: '',
  setSearchTerm: () => {
    // No-operation function: placeholder that will be replaced by the context provider's function.
  },
});

export const SearchTermProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const contextValue = useMemo(() => {
    return { searchTerm, setSearchTerm };
  }, [searchTerm]);

  return (
    <SearchTermContext.Provider value={contextValue}>
      {children}
    </SearchTermContext.Provider>
  );
};
