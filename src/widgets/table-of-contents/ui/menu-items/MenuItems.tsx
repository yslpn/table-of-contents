import { useAutoAnimate } from '@formkit/auto-animate/react';

import {
  type ITableOfContentsData,
  fetcher,
  handlePromiseWithSuspense,
} from '../../../../shared';

import { RecursiveTreeRenderer } from '../recursive-tree-renderer/RecursiveTreeRenderer';

const fetchData = handlePromiseWithSuspense(
  fetcher<ITableOfContentsData>('./toc-data.json'),
);

export const MenuItems = () => {
  const [animationParent] = useAutoAnimate();
  const data = fetchData();

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
