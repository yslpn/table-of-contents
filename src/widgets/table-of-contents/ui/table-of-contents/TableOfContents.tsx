import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Spinner } from '../../../../shared';

import { SearchTermInput } from '../search-term-input/SearchTermInput';
import { SearchTermProvider } from '../search-term-provider/SearchTermProvider';
import { ActivePathProvider } from '../active-path-provider/ActivePathProvider';
import { MenuItems } from '../menu-items/MenuItems';

import css from './index.module.css';

interface ITableOfContents {
  withSearchInput: boolean;
}

export const TableOfContents = ({ withSearchInput }: ITableOfContents) => {
  const suspenseFallback = (
    <div className={css.fallbackWrapper}>
      <Spinner />
    </div>
  );

  const errorFallback = (
    <div className={css.fallbackWrapper}>Something went wrong</div>
  );

  return (
    <SearchTermProvider>
      <ActivePathProvider>
        <nav className={css.wrapper}>
          {withSearchInput && <SearchTermInput />}
          <ErrorBoundary fallback={errorFallback}>
            <Suspense fallback={suspenseFallback}>
              <MenuItems />
            </Suspense>
          </ErrorBoundary>
        </nav>
      </ActivePathProvider>
    </SearchTermProvider>
  );
};
