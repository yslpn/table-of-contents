import { SpringValue, animated } from 'react-spring';
import clsx from 'clsx';

import Arrow from '../../assets/arrow.svg?react';

import style from './index.module.css';

interface ITableOfContentsItem {
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
  styles: {
    opacity: SpringValue<number>;
    height: SpringValue<number>;
    paddingTop: SpringValue<number>;
    paddingBottom: SpringValue<number>;
  };
}

export const TableOfContentsItem = ({
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
  styles,
}: ITableOfContentsItem) => {
  const isOpen = activePath.includes(id);
  const isLastActive = activePath.at(-1) === id;

  const handleClick = () => {
    setSearchTerm('');

    if (activePath.at(-1) === id) {
      setActivePath(newPath.slice(0, -1));
    } else {
      setActivePath(newPath);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  let highLightClasses = '';

  if (
    !searchTerm &&
    !isLastActive &&
    parentId &&
    (activePath.includes(parentId) || isOpen)
  ) {
    if (activePath.at(-1) === parentId && activePath.indexOf(parentId) !== 0) {
      highLightClasses = style.hightLightFirst;
    } else {
      highLightClasses = style.hightLightSecond;
    }
  }

  return (
    <animated.div
      role={'menuitem'}
      tabIndex={0}
      onClick={handleClick}
      style={{
        ...styles,
        paddingLeft: `${level * 16 + 44}px`,
      }}
      className={clsx(highLightClasses, style.item, isLastActive && style.last)}
      onKeyDown={handleKeyDown}
    >
      {pages && <Arrow className={clsx(style.icon, isOpen && style.open)} />}
      {title}
    </animated.div>
  );
};
