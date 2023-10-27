import type { IEntities, IPage } from '../../../../types/toc-data';
import { AnimatedWrapper } from '../animated-wrapper/AnimatedWrapper';

interface IRecursiveTreeRenderer {
  pageData: IPage;
  entities: IEntities;
  path: string[];
}

export const RecursiveTreeRenderer = ({
  pageData,
  entities,
  path,
}: IRecursiveTreeRenderer) => {
  const { pages, id } = pageData;
  const newPath = [...path, id];

  return (
    <>
      <AnimatedWrapper pageData={pageData} newPath={newPath} />

      {pages?.map((pageId) => (
        <RecursiveTreeRenderer
          key={pageId}
          pageData={entities.pages[pageId]}
          entities={entities}
          path={newPath}
        />
      ))}
    </>
  );
};
