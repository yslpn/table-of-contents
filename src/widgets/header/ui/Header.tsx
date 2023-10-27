import { memo } from 'react';

import HomeIcon from '../assets/home.svg?react';
import css from './index.module.css';
import { MainLayout } from '../../../shared';

export const Header = memo(() => {
  return (
    <header className={css.header}>
      <MainLayout>
        <p className={css.text}>
          <HomeIcon />
          Product name
        </p>
      </MainLayout>
    </header>
  );
});

Header.displayName = 'Header';
