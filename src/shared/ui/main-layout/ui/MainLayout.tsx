import { ReactNode } from 'react';
import clsx from 'clsx';

import style from './index.module.css';

interface Props {
  children: ReactNode;
  className?: string;
}

export const MainLayout = ({ children, className }: Props) => {
  return <div className={clsx(style.container, className)}>{children}</div>;
};
