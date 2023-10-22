import useSWR from 'swr';
import { fetcher } from '../../../shared/api/fetcher';
import { MainLayout } from '../../../shared/ui/main-layout';
import { ITOCData } from '../../../shared/types/toc-data';

import { Header } from '../../../widgets/header';
import { Navigation } from '../../../widgets/navigation/ui/Navigation';

export const HomePage = () => {
  const { data } = useSWR<ITOCData>('./toc-data.json', fetcher);

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
