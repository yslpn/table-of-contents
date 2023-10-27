import type { ReactNode } from 'react';
import { SearchTermInput } from '../search-term-input/SearchTermInput';
import { RecursiveTreeRenderer } from '../recursive-tree-renderer/RecursiveTreeRenderer';
import { Spinner } from '../../../spinner';

import { SearchTermProvider } from '../search-term-provider/SearchTermProvider';
import { ActivePathProvider } from '../active-path-provider/ActivePathProvider';

import css from './index.module.css';

interface ITableOfContents {
  children: ReactNode;
  withSearchInput: boolean;
}

export const TableOfContents = ({
  children,
  withSearchInput,
}: ITableOfContents) => {
  return (
    <SearchTermProvider>
      <ActivePathProvider>
        <div className={css.wrapper} role={'menu'}>
          {withSearchInput && <SearchTermInput />}
          {children ? (
            children
          ) : (
            <div className={css.spinnerWrapper}>
              <Spinner />
            </div>
          )}
        </div>
      </ActivePathProvider>
    </SearchTermProvider>
  );
};

TableOfContents.RecursiveTreeRenderer = RecursiveTreeRenderer;
