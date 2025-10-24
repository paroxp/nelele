import React, { ReactElement } from 'react';

import { Footer } from '../layout';
import { logo } from '../../img';
import { Language, localeLink, translator } from '../../locale';

export function Home({ language }: { language: Language}): ReactElement {
  const translation = translator(language);

  return <>
    <main id="home">
      <figure>
        <div dangerouslySetInnerHTML={{ __html: logo }}></div>
        <figcaption>
          <h1>Barbara Prochownik</h1>

          <h2>
            Professional artist in progress
          </h2>
        </figcaption>
      </figure>

      <nav>
        <ul>
          <li><a href={localeLink(language, '/about')}>{translation('layout.menu.about')}</a></li>
          <li><a href={localeLink(language, '/portfolio')}>{translation('layout.menu.portfolio')}</a></li>
        </ul>
      </nav>
    </main>
    <Footer language={language} />
  </>;
}
