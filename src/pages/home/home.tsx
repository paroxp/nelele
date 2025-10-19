import React, { ReactElement } from 'react';

import { Footer } from '../layout';
import { logo } from '../../img';

export function Home(): ReactElement {
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
          <li><a href="/about">O Mnie</a></li>
          <li><a href="/portfolio">Portfolio</a></li>
        </ul>
      </nav>
    </main>
    <Footer />
  </>;
}
