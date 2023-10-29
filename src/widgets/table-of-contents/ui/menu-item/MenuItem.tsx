import {
  useCallback,
  useMemo,
  useRef,
  type MouseEvent,
  useEffect,
} from 'react';
import { clsx } from 'clsx';

import { IPage } from '../../../../shared';

import Arrow from '../../assets/arrow.svg?react';
import { useActivePath, useSearchTerm } from '../../lib/hooks';
import {
  determineBackgroundColor,
  getHighlightedTextParts,
} from '../../lib/helpers';

import css from './index.module.css';

interface IItem {
  id: string;
  level: number;
  title: string;
  pages?: string[];
  isExpanded: boolean;
  parentId?: string;
  path: string[];
  setExpandedNodes: React.Dispatch<React.SetStateAction<Set<string>>>;

  allPages: Record<string, IPage>;
}

export const MenuItem = ({
  id,
  level,
  pages,
  title,
  isExpanded,
  path,
  setExpandedNodes,
  allPages,
}: IItem) => {
  const { activePath, setActivePath, activeId, setActiveId } = useActivePath();

  const { searchTerm, setSearchTerm } = useSearchTerm();
  const elementRef = useRef<HTMLDivElement>(null);

  const backgroundColorKey = determineBackgroundColor(
    id,
    allPages,
    activePath,
    searchTerm,
  );

  const highlightSearchTerm = useCallback(
    (text: string, searchTerm: string) => {
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
    },
    [],
  );

  const handleClick = useCallback(() => {
    if (searchTerm) {
      setSearchTerm('');
    }

    if (pages) {
      setActivePath(path);
    } else {
      setActivePath(path.slice(0, -1));
    }

    setActiveId(id);

    // toggleNode(id);
  }, [pages, setActiveId, id, setActivePath, path, searchTerm, setSearchTerm]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        handleClick();
      }
    },
    [handleClick],
  );

  const toggleNode = useCallback(
    (nodeId: string) => {
      setExpandedNodes((prevState) => {
        const newSet = new Set(prevState);
        if (newSet.has(nodeId)) {
          newSet.delete(nodeId);
        } else {
          newSet.add(nodeId);
        }
        return newSet;
      });
    },
    [setExpandedNodes],
  );

  const toggle = useMemo(
    () =>
      pages && (
        <button
          className={css.toggle}
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            toggleNode(id);
          }}
          type="button"
          aria-label={`Toggle ${title}`}
        >
          <Arrow
            className={clsx(
              css.toggleIcon,
              isExpanded && css.toggleIconExpanded,
            )}
          />
        </button>
      ),
    [id, isExpanded, pages, title, toggleNode],
  );

  useEffect(() => {
    if (activePath.at(-1) === id) {
      const timeout = setTimeout(() => {
        elementRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 250);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [activePath, id]);

  return (
    <div
      ref={elementRef}
      tabIndex={0}
      role={'menuitem'}
      style={{
        paddingLeft: `${level * 16 + 44}px`,
      }}
      className={clsx(
        css.item,
        backgroundColorKey === 'SECOND_LEVEL' && css.highlightSecondLevel,
        backgroundColorKey === 'FIRST_LEVEL' && css.highlightFirstLevel,
        activeId === id && css.lastActive,
      )}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
    >
      {toggle}
      {searchTerm ? highlightSearchTerm(title, searchTerm) : title}
    </div>
  );
};
