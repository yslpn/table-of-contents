import { useNavigate } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import clsx from 'clsx';

import { IEntities, IPage } from '../../../../types/toc-data';
import Arrow from '../../assets/arrow.svg?react';
import { useActivePath, useSearchTerm } from '../../lib/hooks';

import style from './index.module.css';

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
  const { title, url, pages, id, parentId } = pageData;
  const { activePath, setActivePath } = useActivePath();
  const { searchTerm, setSearchTerm } = useSearchTerm();
  const navigate = useNavigate();

  const isSearchTermInTitle =
    searchTerm && title.toLowerCase().includes(searchTerm.toLowerCase());

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

  const newPath = [...path, id];
  const isOpen = activePath.includes(id);
  const isLastActive = activePath.at(-1) === id;

  const handleClick = () => {
    if (url) {
      navigate(url);
    }

    setSearchTerm('');

    if (activePath.at(-1) === id) {
      setActivePath(path);
    } else {
      setActivePath(newPath);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  const highLightClasses: string[] = [];

  if (
    !searchTerm &&
    !isLastActive &&
    parentId &&
    (activePath.includes(parentId) || isOpen)
  ) {
    if (activePath.at(-1) === parentId && activePath.indexOf(parentId) !== 0) {
      highLightClasses.push(style.hightLightFirst);
    } else {
      highLightClasses.push(style.hightLightSecond);
    }
  }

  return (
    <>
      {transitions(
        (styles, item) =>
          item && (
            <animated.div
              role={'menuitem'}
              tabIndex={0}
              onClick={handleClick}
              style={{
                ...styles,
                paddingLeft: `${pageData.level * 16 + 44}px`,
              }}
              className={clsx(
                ...highLightClasses,
                style.item,
                isLastActive && style.last,
              )}
              onKeyDown={handleKeyDown}
            >
              {pages && (
                <Arrow className={clsx(style.icon, isOpen && style.open)} />
              )}
              {title}
            </animated.div>
          ),
      )}
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
