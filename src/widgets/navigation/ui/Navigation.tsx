import { TableOfContents } from '../../../shared/ui/table-of-contents';
import { ITOCData } from '../../../shared/types/toc-data';

interface INavigation {
  data?: ITOCData;
}

export const Navigation = ({ data }: INavigation) => {
  return (
    <TableOfContents withSearch={true}>
      {data?.topLevelIds.map((topId) => (
        <TableOfContents.ItemsContainer
          key={topId}
          pageData={data.entities.pages[topId]}
          entities={data.entities}
          path={[]}
        />
      ))}
    </TableOfContents>
  );
};
