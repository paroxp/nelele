import React, { ReactElement } from 'react';

import { Footer, Header } from '../layout';

export function Holding(): ReactElement {
  return <>
    <Header page="holding" />
    <main id="holding">
      <h1>No hej!</h1>

      <p>
        Też tutaj czekasz na stronę?
      </p>
    </main>
    <Footer />
  </>;
}
