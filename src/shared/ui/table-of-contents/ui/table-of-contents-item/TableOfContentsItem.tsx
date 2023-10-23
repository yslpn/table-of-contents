import { IEntities, IPage } from '../../../../types/toc-data';
import { useActivePath, useSearchTerm } from '../../lib/hooks';
import { TableOfContentsItemAnimated } from '../table-of-contents-item-animated/TableOfContentsItemAnimated';

interface ITableOfContentsItem {
  pageData: IPage;
  entities: IEntities;
  path: string[];
}

export const TableOfContentsItem = ({
  pageData,
  entities,
  path,
}: ITableOfContentsItem) => {
  const { title, pages, id, parentId } = pageData;
  const { activePath, setActivePath } = useActivePath();
  const { searchTerm, setSearchTerm } = useSearchTerm();

  const newPath = [...path, id];

  return (
    <>
      <TableOfContentsItemAnimated
        title={title}
        pages={pages}
        level={pageData.level}
        activePath={activePath}
        id={id}
        newPath={newPath}
        searchTerm={searchTerm}
        setActivePath={setActivePath}
        setSearchTerm={setSearchTerm}
        parentId={parentId}
      />
      {pages?.map((pageId) => (
        <TableOfContentsItem
          key={pageId}
          pageData={entities.pages[pageId]}
          entities={entities}
          path={newPath}
        />
      ))}
    </>
  );
};
