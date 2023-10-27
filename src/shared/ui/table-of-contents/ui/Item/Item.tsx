import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type KeyboardEvent,
} from 'react';
import { type SpringValue, animated } from '@react-spring/web';
import { clsx } from 'clsx';

import Arrow from '../../assets/arrow.svg?react';
import { getHighlightedTextParts } from '../../lib/helpers';
import { useActivePath, useSearchTerm } from '../../lib/hooks';

import css from './index.module.css';

interface IItem {
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

export const Item = ({
  id,
  level,
  newPath,
  pages,
  parentId,
  title,
  styles,
}: IItem) => {
  const { activePath, setActivePath } = useActivePath();
  const { searchTerm, setSearchTerm } = useSearchTerm();
  const elementRef = useRef<HTMLDivElement>(null);

  const isOpen = activePath.includes(id);
  const isLastActive = activePath.at(-1) === id;
  const isParentActive = parentId && activePath.includes(parentId);
  const isParentLevelNotFirst = parentId && activePath.indexOf(parentId) > 0;
  const isCurrentLevel = activePath.at(-1) === parentId;

  const icon = useMemo(
    () => pages && <Arrow className={clsx(css.icon, isOpen && css.open)} />,
    [isOpen, pages],
  );

  const handleClick = useCallback(() => {
    if (searchTerm) {
      setSearchTerm('');
    }

    if (activePath.at(-1) === id) {
      setActivePath(newPath.slice(0, -1));
    } else {
      setActivePath(newPath);
    }
  }, [activePath, id, newPath, searchTerm, setActivePath, setSearchTerm]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleClick();
      }
    },
    [handleClick],
  );

  const highlightSearchTerm = (text: string, searchTerm: string) => {
    const parts = getHighlightedTextParts(text, searchTerm);

    return (
      <span>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={index} className={css.highlightSearchTerm}>
              {part.text}
            </span>
          ) : (
            part.text
          ),
        )}
      </span>
    );
  };

  useEffect(() => {
    if (isLastActive) {
      setTimeout(() => {
        elementRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        // 200 is animation duration
      }, 200);
    }
  }, [isLastActive]);

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
      className={clsx(
        !searchTerm &&
          !isLastActive &&
          (isOpen || isParentActive) &&
          (isCurrentLevel && isParentLevelNotFirst
            ? css.highlightFirstLevel
            : css.highlightSecondLevel),
        css.item,
        isLastActive && css.last,
      )}
      onKeyDown={handleKeyDown}
    >
      {icon}
      {searchTerm ? highlightSearchTerm(title, searchTerm) : title}
    </animated.div>
  );
};
