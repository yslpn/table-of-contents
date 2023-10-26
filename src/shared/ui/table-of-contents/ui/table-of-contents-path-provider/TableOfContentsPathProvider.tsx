import { createContext, useState } from 'react';

export interface ITableOfContentsPathState {
  activePath: string[];
  setActivePath: (activePath: string[]) => void;
}

export const TableOfContentsPathContext =
  createContext<ITableOfContentsPathState>({
    activePath: [],
    setActivePath: () => {
      // No-operation function: placeholder that will be replaced by the context provider's function.
    },
  });

export const TableOfContentsPathProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activePath, setActivePath] = useState<string[]>([]);

  return (
    <TableOfContentsPathContext.Provider value={{ activePath, setActivePath }}>
      {children}
    </TableOfContentsPathContext.Provider>
  );
};
