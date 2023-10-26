import { useCallback, useMemo, useRef } from 'react';
import { SpringValue, animated } from 'react-spring';
import clsx from 'clsx';

import Arrow from '../../assets/arrow.svg?react';
import { useActivePath, useSearchTerm } from '../../lib/hooks';

import style from './index.module.css';

interface ITableOfContentsItem {
  id: string;
  level: number;
  newPath: string[];
  pages?: string[];
  parentId?: string;
  title: string;
  styles: {
    opacity: SpringValue<number>;
    height: SpringValue<number>;
    paddingTop: SpringValue<number>;
    paddingBottom: SpringValue<number>;
  };
}

export const TableOfContentsItem = ({
  id,
  level,
  newPath,
  pages,
  parentId,
  title,
  styles,
}: ITableOfContentsItem) => {
  const { activePath, setActivePath } = useActivePath();
  const { searchTerm, setSearchTerm } = useSearchTerm();
  const elementRef = useRef<HTMLDivElement>(null);

  const isOpen = activePath.includes(id);
  const isLastActive = activePath.at(-1) === id;
  const isParentActive = parentId && activePath.includes(parentId);

  const icon = useMemo(
    () => pages && <Arrow className={clsx(style.icon, isOpen && style.open)} />,
    [isOpen, pages],
  );

  let highLightClasses = '';

  if (!searchTerm && !isLastActive && (isOpen || isParentActive)) {
    const isParentLevelMoreThenOne =
      parentId && activePath.indexOf(parentId) > 0;
    const isCurrentLevel = activePath.at(-1) === parentId;

    if (isCurrentLevel && isParentLevelMoreThenOne) {
      highLightClasses = style.hightLightFirst;
    } else {
      highLightClasses = style.hightLightSecond;
    }
  }

  const handleClick = useCallback(() => {
    if (searchTerm) {
      setSearchTerm('');
    }

    if (elementRef.current) {
      elementRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }

    if (activePath.at(-1) === id) {
      setActivePath(newPath.slice(0, -1));
    } else {
      setActivePath(newPath);
    }
  }, [activePath, id, newPath, searchTerm, setActivePath, setSearchTerm]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleClick();
      }
    },
    [handleClick],
  );

  return (
    <animated.div
      ref={elementRef}
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
      {icon}
      {title}
    </animated.div>
  );
};
