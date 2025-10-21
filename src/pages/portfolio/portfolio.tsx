import React, { ReactElement } from 'react';

import { Footer, Header } from '../layout';

export function Portfolio(): ReactElement {
  return <>
    <Header page="portfolio" />

    <main id="portfolio">
      <section>
        <h2>Ja tu <small>dalej</small> kreuję!</h2>
      </section>
    </main>
    <Footer />
  </>;
}
