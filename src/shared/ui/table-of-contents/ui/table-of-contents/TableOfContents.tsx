import { TableOfContentsProvider } from '../table-of-contents-provider/TableOfContentsProvider';
import { TableOfContentsSearch } from '../table-of-contents-search/TableOfContentsSearch';
import { TableOfContentsItem } from '../table-of-contents-item/TableOfContentsItem';

import style from './index.module.css';
import { Spinner } from '../../../spinner';

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

TableOfContents.Item = TableOfContentsItem;
