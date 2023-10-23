import { useTransition } from 'react-spring';
import { TableOfContentsItem } from '../table-of-contents-item/TableOfContentsItem';

interface ITableOfContentsItemAnimated {
  activePath: string[];
  id: string;
  level: number;
  newPath: string[];
  pages?: string[];
  searchTerm: string;
  setActivePath: (path: string[]) => void;
  setSearchTerm: (searchTerm: string) => void;
  title: string;
  parentId?: string;
}

export const TableOfContentsItemAnimated = ({
  activePath,
  id,
  level,
  setSearchTerm,
  title,
  setActivePath,
  newPath,
  searchTerm,
  parentId,
  pages,
}: ITableOfContentsItemAnimated) => {
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
          activePath={activePath}
          id={id}
          level={level}
          newPath={newPath}
          searchTerm={searchTerm}
          setActivePath={setActivePath}
          setSearchTerm={setSearchTerm}
          title={title}
          styles={styles}
          pages={pages}
          parentId={parentId}
        />
      ),
  );
};
