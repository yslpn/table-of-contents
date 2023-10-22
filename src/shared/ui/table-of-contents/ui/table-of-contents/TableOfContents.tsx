import { ActivePathProvider } from '../active-path-provider/ActivePathProvider';
import { TableOfContentsSearch } from '../search-input/TableOfContentsSearch';
import { TableOfContentsItem } from '../table-of-contents-item/TableOfContentsItem';

import style from './index.module.css';

interface ITableOfContents {
  children: React.ReactNode;
}

export const TableOfContents = ({ children }: ITableOfContents) => {
  if (!children) {
    return 'Loading...';
  }

  return (
    <ActivePathProvider>
      <div className={style.wrapper} role={'menu'}>
        {children}
      </div>
    </ActivePathProvider>
  );
};

TableOfContents.Item = TableOfContentsItem;
TableOfContents.Search = TableOfContentsSearch;
