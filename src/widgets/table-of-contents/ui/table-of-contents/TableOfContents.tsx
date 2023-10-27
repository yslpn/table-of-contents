import { useAutoAnimate } from '@formkit/auto-animate/react';
import { type ITableOfContentsData, Spinner } from '../../../../shared';

import { SearchTermInput } from '../search-term-input/SearchTermInput';
import { RecursiveTreeRenderer } from '../recursive-tree-renderer/RecursiveTreeRenderer';
import { SearchTermProvider } from '../search-term-provider/SearchTermProvider';
import { ActivePathProvider } from '../active-path-provider/ActivePathProvider';

import css from './index.module.css';

interface ITableOfContents {
  data?: ITableOfContentsData;
  withSearchInput: boolean;
}

export const TableOfContents = ({
  data,
  withSearchInput,
}: ITableOfContents) => {
  const [animationParent] = useAutoAnimate();

  return (
    <SearchTermProvider>
      <ActivePathProvider>
        <nav className={css.wrapper}>
          {withSearchInput && <SearchTermInput />}
          {data ? (
            <div role="menu" aria-label="Navigation menu" ref={animationParent}>
              {data.topLevelIds.map((topId) => (
                <RecursiveTreeRenderer
                  key={topId}
                  pageData={data.entities.pages[topId]}
                  entities={data.entities}
                  path={[]}
                />
              ))}
            </div>
          ) : (
            <div className={css.spinnerWrapper}>
              <Spinner />
            </div>
          )}
        </nav>
      </ActivePathProvider>
    </SearchTermProvider>
  );
};
