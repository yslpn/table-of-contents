import React, { createContext, useContext, useState } from 'react';

export interface ActiveItemState {
  activePath: string[];
  setActivePath: (activePath: string[]) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

const ActivePathContext = createContext<ActiveItemState>({
  activePath: [],
  setActivePath: () => {
    // init
  },
  searchTerm: '',
  setSearchTerm: () => {
    // init
  },
});

export const ActivePathProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activePath, setActivePath] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <ActivePathContext.Provider
      value={{ activePath, setActivePath, searchTerm, setSearchTerm }}
    >
      {children}
    </ActivePathContext.Provider>
  );
};

export const useActivePath = (): ActiveItemState => {
  return useContext(ActivePathContext);
};

export const useSearchTerm = (): ActiveItemState => {
  return useContext(ActivePathContext);
};
