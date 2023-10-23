import { TableOfContentsProvider } from '../table-of-contents-provider/TableOfContentsProvider';
import { TableOfContentsSearch } from '../table-of-contents-search/TableOfContentsSearch';
import { TableOfContentsItemsContainer } from '../table-of-contents-items-container/TableOfContentsContainer';
import { Spinner } from '../../../spinner';

import style from './index.module.css';

interface ITableOfContents {
  children: React.ReactNode;
  withSearch: boolean;
}

export const TableOfContents = ({ children, withSearch }: ITableOfContents) => {
  return (
    <TableOfContentsProvider>
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
    </TableOfContentsProvider>
  );
};

TableOfContents.ItemsContainer = TableOfContentsItemsContainer;
