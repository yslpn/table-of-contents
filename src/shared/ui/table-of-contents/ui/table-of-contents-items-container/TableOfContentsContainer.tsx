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
  const { pages, id } = pageData;
  const newPath = [...path, id];

  return (
    <>
      <TableOfContentsItemAnimated pageData={pageData} newPath={newPath} />

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
