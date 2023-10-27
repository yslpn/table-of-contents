import type { CSSProperties } from 'react';
import { clsx } from 'clsx';
import css from './index.module.css';

interface ISpinner {
  style?: CSSProperties;
  className?: string;
}

export const Spinner = ({ style, className }: ISpinner) => {
  return <div className={clsx(css.spinner, className)} style={style}></div>;
};
