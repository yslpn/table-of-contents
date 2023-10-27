import { useEffect, useState } from 'react';
import { fetcher } from '../../../shared/api/fetcher';
import { MainLayout } from '../../../shared/ui/main-layout';
import type { ITableOfContentsData } from '../../../shared/types/toc-data';

import { Header } from '../../../widgets/header';
import { TableOfContents } from '../../../widgets/table-of-contents';

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
