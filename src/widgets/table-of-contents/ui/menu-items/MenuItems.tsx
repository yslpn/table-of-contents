import { useLayoutEffect } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import {
  type ITableOfContentsData,
  fetcher,
  handlePromiseWithSuspense,
} from '../../../../shared';

import { useActivePath } from '../../lib/hooks';
import { findPathById } from '../../lib/helpers';

import { RecursiveTreeRenderer } from '../recursive-tree-renderer/RecursiveTreeRenderer';

const fetchData = handlePromiseWithSuspense(
  fetcher<ITableOfContentsData>('./toc-data.json'),
);

export const MenuItems = () => {
  const { setActivePath, activeId } = useActivePath();
  const [animationParent] = useAutoAnimate();
  const data = fetchData();

  useLayoutEffect(() => {
    if (activeId) {
      setActivePath(
        findPathById({ pages: data.entities.pages, targetId: activeId }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      role="menu"
      aria-label="Navigation menu"
      ref={animationParent}
      data-test-id="toc-menu"
    >
      {data.topLevelIds.map((topId) => (
        <RecursiveTreeRenderer
          key={topId}
          pageData={data.entities.pages[topId]}
          entities={data.entities}
          path={[]}
        />
      ))}
    </div>
  );
};
