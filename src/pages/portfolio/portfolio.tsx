import React, { ReactElement } from 'react';

import { Footer, Header } from '../layout';
import { Language, translator } from '../../locale';

export function Portfolio({ language }: { language: Language}): ReactElement {
  const translation = translator(language);

  return <>
    <Header page="portfolio" language={language} />

    <main id="portfolio">
      <section>
        <h2>Ja tu <small>dalej</small> kreuję!</h2>
      </section>
    </main>
    <Footer language={language} />
  </>;
}
