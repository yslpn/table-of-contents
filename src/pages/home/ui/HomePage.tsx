import useSWR from 'swr';
import { fetcher } from '../../../shared/api/fetcher';
import { MainLayout } from '../../../shared/ui/main-layout';
import { ITOCData } from '../../../shared/types/toc-data';
import { TableOfContents } from '../../../shared/ui/table-of-contents';

export const HomePage = () => {
  const { data } = useSWR<ITOCData>('./toc-data.json', fetcher);

  return (
    <main>
      <MainLayout>
        <h1>Home</h1>
        {data ? (
          <TableOfContents>
            {data.topLevelIds.map((topId) => (
              <TableOfContents.Item
                key={topId}
                pageData={data.entities.pages[topId]}
                entities={data.entities}
                path={[]}
              />
            ))}
          </TableOfContents>
        ) : (
          <div>Loading...</div>
        )}
      </MainLayout>
    </main>
  );
};
