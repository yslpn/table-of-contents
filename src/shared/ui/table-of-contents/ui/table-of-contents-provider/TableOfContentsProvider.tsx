import { createContext, useState } from 'react';

export interface TableOfContentsState {
  activePath: string[];
  setActivePath: (activePath: string[]) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const TableOfContentsContext = createContext<TableOfContentsState>({
  activePath: [],
  setActivePath: () => {
    // init
  },
  searchTerm: '',
  setSearchTerm: () => {
    // init
  },
});

export const TableOfContentsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activePath, setActivePath] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <TableOfContentsContext.Provider
      value={{ activePath, setActivePath, searchTerm, setSearchTerm }}
    >
      {children}
    </TableOfContentsContext.Provider>
  );
};
