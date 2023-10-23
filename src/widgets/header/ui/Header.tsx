import { memo } from 'react';
import { MainLayout } from '../../../shared/ui/main-layout';

import HomeIcon from '../assets/home.svg?react';
import style from './index.module.css';

export const Header = memo(() => {
  return (
    <header className={style.header}>
      <MainLayout>
        <p className={style.text}>
          <HomeIcon />
          Product name
        </p>
      </MainLayout>
    </header>
  );
});

Header.displayName = 'Header';
