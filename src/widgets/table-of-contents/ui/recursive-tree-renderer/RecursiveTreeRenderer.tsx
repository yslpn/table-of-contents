import type { IEntities, IPage } from '../../../../shared';
import { useActivePath, useSearchTerm } from '../../lib/hooks';
import { MenuItem } from '../menu-item/MenuItem';

interface IRecursiveTreeRenderer {
  pageData: IPage;
  entities: IEntities;
  path: string[];
}

export const RecursiveTreeRenderer = ({
  pageData,
  entities,
  path,
}: IRecursiveTreeRenderer) => {
  const { title, pages, id, parentId, level } = pageData;

  const newPath = [...path, id];

  const { activePath } = useActivePath();
  const { searchTerm } = useSearchTerm();

  const isSearchTermInTitle =
    searchTerm && title.toLowerCase().includes(searchTerm.toLowerCase());
  const isTopLevelItem = path.length === 0;
  const isParentItemActive = parentId && activePath.includes(parentId);
  const isVisibleItem = searchTerm
    ? isSearchTermInTitle
    : isTopLevelItem || isParentItemActive;

  return (
    <>
      {isVisibleItem && (
        <MenuItem
          id={id}
          level={level}
          newPath={newPath}
          title={title}
          pages={pages}
          parentId={parentId}
        />
      )}
      {pages?.map((pageId) => (
        <RecursiveTreeRenderer
          key={pageId}
          pageData={entities.pages[pageId]}
          entities={entities}
          path={newPath}
        />
      ))}
    </>
  );
};
