import { Helmet } from 'react-helmet';
import { useState } from 'react';

import { BreadCrumbs } from 'components/BreadCrumbs/BreadCrumbs';
import { Header } from 'components/Header/Header';
import { Button } from 'components/ui/button';

export const Debug = () => {
  const [shouldRenderError, setShouldRenderError] = useState(false);

  return (
    <div>
      <Helmet>
        <title>Debug | Generatory 3.0</title>
      </Helmet>
      <div className="pl-0 max-md:pl-2 pr-2 max-md:pr-4">
        <Header>
          <BreadCrumbs
            crumbs={[
              {
                content: <span className="whitespace-nowrap">Generatory 3.0</span>,
                id: 'root',
                to: '/',
              },
              {
                content: 'Debug',
              },
            ]}
          />
        </Header>
      </div>
      <main className="px-4 md:px-2 py-12 flex gap-2 flex-row items-center justify-center">
        {shouldRenderError && renderError()}
        <Button
          variant="destructive"
          onClick={() => {
            setShouldRenderError(true);
          }}
        >
          Error during render
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            throw new Error('This is your first error!');
          }}
        >
          Error in the handler
        </Button>
      </main>
    </div>
  );
};

function renderError(): never {
  throw new Error('This is your first error!');
}
