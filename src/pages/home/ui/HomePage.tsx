import { MainLayout } from '../../../shared';

import { Header, TableOfContents } from '../../../widgets';

export const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <MainLayout>
          <TableOfContents withSearchInput={true} />
        </MainLayout>
      </main>
    </>
  );
};
