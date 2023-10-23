import { IEntities, IPage } from '../../../../types/toc-data';
import { useActivePath, useSearchTerm } from '../../lib/hooks';
import { TableOfContentsItemAnimated } from '../table-of-contents-item-animated/TableOfContentsItemAnimated';

interface ITableOfContentsItemsContainer {
  pageData: IPage;
  entities: IEntities;
  path: string[];
}

export const TableOfContentsItemsContainer = ({
  pageData,
  entities,
  path,
}: ITableOfContentsItemsContainer) => {
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
        <TableOfContentsItemsContainer
          key={pageId}
          pageData={entities.pages[pageId]}
          entities={entities}
          path={newPath}
        />
      ))}
    </>
  );
};
