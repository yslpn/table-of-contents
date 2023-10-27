import type { CSSProperties, ReactNode } from 'react';
import { clsx } from 'clsx';

import css from './index.module.css';

interface IMainLayout {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const MainLayout = ({ children, className, style }: IMainLayout) => {
  return (
    <div className={clsx(css.container, className)} style={style}>
      {children}
    </div>
  );
};
