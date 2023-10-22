import { ActivePathProvider } from '../active-path-provider/ActivePathProvider';
import { TableOfContentsItem } from '../table-of-contents-item/TableOfContentsItem';

import style from './index.module.css';

interface ITableOfContents {
  children: React.ReactNode;
}

export const TableOfContents = ({ children }: ITableOfContents) => {
  return (
    <ActivePathProvider>
      <div className={style.wrapper} role={'menu'}>
        {children}
      </div>
    </ActivePathProvider>
  );
};

TableOfContents.Item = TableOfContentsItem;
