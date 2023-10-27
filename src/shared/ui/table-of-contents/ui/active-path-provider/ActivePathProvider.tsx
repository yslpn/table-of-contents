import { type ReactNode, createContext, useState } from 'react';

interface IPathState {
  activePath: string[];
  setActivePath: (activePath: string[]) => void;
}

export const PathContext = createContext<IPathState>({
  activePath: [],
  setActivePath: () => {
    // No-operation function: placeholder that will be replaced by the context provider's function.
  },
});

export const ActivePathProvider = ({ children }: { children: ReactNode }) => {
  const [activePath, setActivePath] = useState<string[]>([]);

  return (
    <PathContext.Provider value={{ activePath, setActivePath }}>
      {children}
    </PathContext.Provider>
  );
};
