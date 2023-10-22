import React, { createContext, useContext, useState } from 'react';

export interface ActiveItemState {
  activePath: string[];
  setActivePath: (activePath: string[]) => void;
}

const ActivePathContext = createContext<ActiveItemState>({
  activePath: [],
  setActivePath: () => {
    // init
  },
});

export const ActivePathProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activePath, setActivePath] = useState<string[]>([]);

  return (
    <ActivePathContext.Provider value={{ activePath, setActivePath }}>
      {children}
    </ActivePathContext.Provider>
  );
};

export const useActivePath = (): ActiveItemState => {
  return useContext(ActivePathContext);
};
