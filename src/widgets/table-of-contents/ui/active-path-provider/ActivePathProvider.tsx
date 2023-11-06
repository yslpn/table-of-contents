import { type ReactNode, createContext, useState, useMemo } from 'react';

interface IPathState {
  activePath: string[];
  setActivePath: (activePath: string[]) => void;
  activeId: string;
  setActiveId: (activeId: string) => void;
}

export const PathContext = createContext<IPathState>({
  activePath: [],
  setActivePath: () => {
    // No-operation function: placeholder that will be replaced by the context provider's function.
  },
  activeId: '',
  setActiveId: () => {
    // No-operation function: placeholder that will be replaced by the context provider's function.
  },
});

export const ActivePathProvider = ({
  children,
  initialActiveId = '',
}: {
  children: ReactNode;
  initialActiveId?: string;
}) => {
  const [activePath, setActivePath] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string>(initialActiveId);

  const contextValue = useMemo(() => {
    return { activePath, setActivePath, activeId, setActiveId };
  }, [activePath, activeId]);

  return (
    <PathContext.Provider value={contextValue}>{children}</PathContext.Provider>
  );
};
