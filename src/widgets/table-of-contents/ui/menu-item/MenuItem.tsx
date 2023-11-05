import { useCallback, useMemo, useRef } from 'react';
import { clsx } from 'clsx';

import Arrow from '../../assets/arrow.svg?react';
import {
  determineHighlightClasses,
  getHighlightedTextParts,
} from '../../lib/helpers';
import { useActivePath, useSearchTerm } from '../../lib/hooks';

import css from './index.module.css';

interface IItem {
  id: string;
  level: number;
  pages?: string[];
  parentId?: string;
  path: string[];
  title: string;
}

export const MenuItem = ({
  id,
  level,
  pages,
  parentId,
  path,
  title,
}: IItem) => {
  const { activePath, setActivePath, activeId, setActiveId } = useActivePath();
  const { searchTerm, setSearchTerm } = useSearchTerm();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isOpen = activePath.includes(id);
  const isActive = activeId === id;

  const { isFirstLevel, isSecondLevel } = determineHighlightClasses(
    parentId,
    id,
    activePath,
    level,
    isOpen,
    searchTerm,
  );

  const icon = useMemo(
    () => pages && <Arrow className={clsx(css.icon, isOpen && css.open)} />,
    [isOpen, pages],
  );

  const handleClick = useCallback(() => {
    setActiveId(id);

    if (searchTerm) {
      setSearchTerm('');

      setTimeout(() => {
        buttonRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 500);
    }

    if (isActive && activePath.at(-1) === id) {
      setActivePath(path.slice(0, -1));
      return;
    }

    if (pages) {
      setActivePath(path);
    } else {
      setActivePath(path.slice(0, -1));
    }
  }, [
    activePath,
    id,
    isActive,
    path,
    pages,
    searchTerm,
    setActiveId,
    setActivePath,
    setSearchTerm,
  ]);

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

  return (
    <button
      ref={buttonRef}
      role={'menuitem'}
      onClick={handleClick}
      style={{
        paddingLeft: `${level * 16 + 44}px`,
      }}
      className={clsx(
        isFirstLevel && css.highlightFirstLevel,
        isSecondLevel && css.highlightSecondLevel,
        isActive && css.active,
        css.item,
      )}
    >
      {icon}
      {searchTerm ? highlightSearchTerm(title, searchTerm) : title}
    </button>
  );
};
