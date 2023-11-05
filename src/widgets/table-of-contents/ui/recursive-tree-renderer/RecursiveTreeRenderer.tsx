import type { IEntities, IPage } from '../../../../shared';
import { checkIsVisible } from '../../lib/helpers';
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
  const { activePath } = useActivePath();
  const { searchTerm } = useSearchTerm();

  const { title, pages, id, parentId, level } = pageData;

  const newPath = [...path, id];

  const isVisibleItem = checkIsVisible({
    searchTerm,
    title,
    path,
    activePath,
    parentId,
  });

  return (
    <>
      {isVisibleItem && (
        <MenuItem
          id={id}
          level={level}
          path={newPath}
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
