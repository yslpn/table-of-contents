import { useEffect, useState, useCallback, useMemo } from 'react';
import type { IEntities, IPage } from '../../../../shared';
import { useActivePath, useSearchTerm } from '../../lib/hooks';
import { MenuItem } from '../menu-item/MenuItem';

interface IRecursiveTreeRenderer {
  pageData: IPage;
  entities: IEntities;
  path: string[];
  allPages: Record<string, IPage>;
  enableAnimations?: (enable: boolean) => void;
}

export const RecursiveTreeRenderer = ({
  pageData,
  entities,
  path,
  allPages,
  enableAnimations,
}: IRecursiveTreeRenderer) => {
  const { title, pages, id, level } = pageData;

  const { searchTerm } = useSearchTerm();
  const { activePath } = useActivePath();
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const isSearchTermPresent = useCallback(
    (page: IPage): boolean => {
      if (!searchTerm) {
        return false;
      }

      if (page.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }

      if (page.pages) {
        for (const childPageId of page.pages) {
          const childPage = entities.pages[childPageId];
          if (isSearchTermPresent(childPage)) {
            return true;
          }
        }
      }

      return false;
    },
    [searchTerm, entities.pages],
  );

  useEffect(() => {
    if (searchTerm === '') {
      setExpandedNodes(new Set(activePath));
    } else {
      const newExpandedNodes = new Set<string>();

      for (const pageId in entities.pages) {
        const page = entities.pages[pageId];
        if (isSearchTermPresent(page)) {
          newExpandedNodes.add(pageId);
        }
      }

      setExpandedNodes(newExpandedNodes);
    }
  }, [searchTerm, entities.pages, isSearchTermPresent, activePath]);

  useEffect(() => {
    if (enableAnimations) {
      if (searchTerm) {
        enableAnimations(false);
      } else {
        const timeout = setTimeout(() => {
          enableAnimations(true);
        }, 250);

        return () => {
          clearTimeout(timeout);
        };
      }
    }
  }, [searchTerm, enableAnimations]);

  const isExpanded = expandedNodes.has(id);
  const isVisibleItem = searchTerm
    ? title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    : true;
  const newPath = useMemo(() => {
    return [...path, id];
  }, [path, id]);

  return (
    <>
      {isVisibleItem && (
        <MenuItem
          id={id}
          title={title}
          pages={pages}
          setExpandedNodes={setExpandedNodes}
          isExpanded={isExpanded}
          level={level}
          path={newPath}
          allPages={allPages}
        />
      )}

      {isExpanded &&
        pages?.map((pageId) => (
          <RecursiveTreeRenderer
            key={pageId}
            pageData={entities.pages[pageId]}
            entities={entities}
            path={newPath}
            allPages={allPages}
            enableAnimations={enableAnimations}
          />
        ))}
    </>
  );
};
