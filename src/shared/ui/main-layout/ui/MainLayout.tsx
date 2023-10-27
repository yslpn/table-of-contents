import type { CSSProperties, ReactNode } from 'react';
import { clsx } from 'clsx';

import style from './index.module.css';

interface IMainLayout {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const MainLayout = ({ children, className }: IMainLayout) => {
  return (
    <div className={clsx(style.container, className)} style={style}>
      {children}
    </div>
  );
};
