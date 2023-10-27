import { ITableOfContentsData } from '../../../../shared/types/toc-data';
import { Spinner } from '../../../../shared/ui/spinner';
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
  return (
    <SearchTermProvider>
      <ActivePathProvider>
        <div className={css.wrapper} role={'menu'}>
          {withSearchInput && <SearchTermInput />}
          {data ? (
            data.topLevelIds.map((topId) => (
              <RecursiveTreeRenderer
                key={topId}
                pageData={data.entities.pages[topId]}
                entities={data.entities}
                path={[]}
              />
            ))
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
