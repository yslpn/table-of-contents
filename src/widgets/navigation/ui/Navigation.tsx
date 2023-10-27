import { TableOfContents } from '../../../shared/ui/table-of-contents';
import type { ITableOfContentsData } from '../../../shared/types/toc-data';

interface INavigation {
  data?: ITableOfContentsData;
}

export const Navigation = ({ data }: INavigation) => {
  return (
    <TableOfContents withSearchInput={true}>
      {data?.topLevelIds.map((topId) => (
        <TableOfContents.RecursiveTreeRenderer
          key={topId}
          pageData={data.entities.pages[topId]}
          entities={data.entities}
          path={[]}
        />
      ))}
    </TableOfContents>
  );
};
