import { useTransition } from 'react-spring';
import { useActivePath, useSearchTerm } from '../../lib/hooks';
import { TableOfContentsItem } from '../table-of-contents-item/TableOfContentsItem';

interface ITableOfContentsItemAnimated {
  id: string;
  level: number;
  newPath: string[];
  pages?: string[];
  title: string;
  parentId?: string;
}

export const TableOfContentsItemAnimated = ({
  id,
  level,
  title,
  newPath,
  parentId,
  pages,
}: ITableOfContentsItemAnimated) => {
  const { activePath } = useActivePath();
  const { searchTerm } = useSearchTerm();

  const isSearchTermInTitle =
    searchTerm && title.toLowerCase().includes(searchTerm.toLowerCase());
  const path = newPath.slice(0, -1);
  const isTopLevelItem = path.length === 0;
  const isParentItemActive = parentId && activePath.includes(parentId);
  const isVisibleItem = searchTerm
    ? isSearchTermInTitle
    : isTopLevelItem || isParentItemActive;

  const transitions = useTransition(isVisibleItem, {
    from: {
      opacity: 0,
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    enter: {
      opacity: 1,
      height: 'auto',
      paddingTop: 8,
      paddingBottom: 8,
    },
    leave: {
      opacity: 0,
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    config: { tension: 1000, friction: 120, duration: 200 },
  });

  return transitions(
    (styles, item) =>
      item && (
        <TableOfContentsItem
          id={id}
          level={level}
          newPath={newPath}
          title={title}
          styles={styles}
          pages={pages}
          parentId={parentId}
        />
      ),
  );
};
