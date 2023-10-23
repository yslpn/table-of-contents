import { IEntities, IPage } from '../../../../types/toc-data';
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
  const newPath = [...path, id];

  return (
    <>
      <TableOfContentsItemAnimated
        title={title}
        pages={pages}
        level={pageData.level}
        id={id}
        newPath={newPath}
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
