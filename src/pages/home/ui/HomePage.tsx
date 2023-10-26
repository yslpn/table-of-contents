import { useEffect, useState } from 'react';
import { fetcher } from '../../../shared/api/fetcher';
import { MainLayout } from '../../../shared/ui/main-layout';
import { ITOCData } from '../../../shared/types/toc-data';

import { Header } from '../../../widgets/header';
import { Navigation } from '../../../widgets/navigation/ui/Navigation';

export const HomePage = () => {
  const [data, setData] = useState<ITOCData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetcher<ITOCData>('./toc-data.json');

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
          <Navigation data={data} />
        </MainLayout>
      </main>
    </>
  );
};
