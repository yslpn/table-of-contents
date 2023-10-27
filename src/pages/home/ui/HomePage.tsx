import { useEffect, useState } from 'react';

import {
  type ITableOfContentsData,
  MainLayout,
  fetcher,
} from '../../../shared';

import { Header, TableOfContents } from '../../../widgets';

export const HomePage = () => {
  const [data, setData] = useState<ITableOfContentsData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetcher<ITableOfContentsData>('./toc-data.json');

        setData(result);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    void fetchData();
  }, []);

  return (
    <>
      <Header />
      <main>
        <MainLayout>
          <TableOfContents data={data} withSearchInput={true} />
        </MainLayout>
      </main>
    </>
  );
};
