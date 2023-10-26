import { TableOfContentsSearch } from '../table-of-contents-search/TableOfContentsSearch';
import { TableOfContentsItemsContainer } from '../table-of-contents-items-container/TableOfContentsContainer';
import { Spinner } from '../../../spinner';

import style from './index.module.css';
import { TableOfContentsSearchProvider } from '../table-of-contents-search-provider/TableOfContentsSearchProvider';
import { TableOfContentsPathProvider } from '../table-of-contents-path-provider/TableOfContentsPathProvider';

interface ITableOfContents {
  children: React.ReactNode;
  withSearch: boolean;
}

export const TableOfContents = ({ children, withSearch }: ITableOfContents) => {
  return (
    <TableOfContentsSearchProvider>
      <TableOfContentsPathProvider>
        <div className={style.wrapper} role={'menu'}>
          {withSearch && <TableOfContentsSearch />}
          {children ? (
            children
          ) : (
            <div className={style.spinnerWrapper}>
              <Spinner />
            </div>
          )}
        </div>
      </TableOfContentsPathProvider>
    </TableOfContentsSearchProvider>
  );
};

TableOfContents.ItemsContainer = TableOfContentsItemsContainer;
