import { animated, useTransition } from 'react-spring';
import clsx from 'clsx';

import Arrow from '../../assets/arrow.svg?react';

import style from './index.module.css';

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
  pages,
  setSearchTerm,
  title,
  setActivePath,
  newPath,
  searchTerm,
  parentId,
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

  const isOpen = activePath.includes(id);
  const isLastActive = activePath.at(-1) === id;

  const handleClick = () => {
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

  return transitions(
    (styles, item) =>
      item && (
        <animated.div
          role={'menuitem'}
          tabIndex={0}
          onClick={handleClick}
          style={{
            ...styles,
            paddingLeft: `${level * 16 + 44}px`,
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
  );
};
