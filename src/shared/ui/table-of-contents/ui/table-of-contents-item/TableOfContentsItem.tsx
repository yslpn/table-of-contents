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
  id,
  level,
  pages,
  title,
  newPath,
  parentId,
  styles,
}: ITableOfContentsItem) => {
  const { activePath, setActivePath } = useActivePath();
  const { searchTerm, setSearchTerm } = useSearchTerm();
  const elementRef = useRef<HTMLDivElement>(null);

  const isOpen = activePath.includes(id);
  const isLastActive = activePath.at(-1) === id;

  const icon = useMemo(
    () => pages && <Arrow className={clsx(style.icon, isOpen && style.open)} />,
    [isOpen, pages],
  );

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

  const handleClick = useCallback(() => {
    setSearchTerm('');

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
  }, [activePath, id, newPath, setActivePath, setSearchTerm]);

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
