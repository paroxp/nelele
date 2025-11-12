import React, { ReactElement } from 'react';

import { Footer, Header } from '../layout';
import { Language, localeLink, translator } from '../../locale';

import { categories } from './categories';

function Category({ children, url, img }: { children: string, url: string, img: string }): ReactElement {
  return <a href={url}>
      <figure>
        <div style={{ backgroundImage: `url(${img})` }}></div>
        <figcaption>{children}</figcaption>
      </figure>
    </a>;
}

export function Portfolio({ language }: { language: Language }): ReactElement {
  const translation = translator(language);

  return <>
    <Header page="portfolio" language={language} />

    <main id="portfolio">
      <section>
        <h2>{translation('pages.portfolio.title.digital')}</h2>

        <Category url={localeLink(language, '/showroom/concept')} img="/img/portfolio/concept/envio1.jpg">
          {translation('pages.portfolio.category.concept.title')}
        </Category>

        <Category url={localeLink(language, '/showroom/illustration')} img="/img/portfolio/illustration/frog.jpg">
          {translation('pages.portfolio.category.illustration.title')}
        </Category>

        <Category url={localeLink(language, '/showroom/vector')} img="/img/portfolio/vector/corgito-mockup.jpg">
          {translation('pages.portfolio.category.vector.title')}
        </Category>

        <Category url={localeLink(language, '/showroom/design')} img="/img/portfolio/design/rp.png">
          {translation('pages.portfolio.category.design.title')}
        </Category>
      </section>

      <section>
        <h2>{translation('pages.portfolio.title.traditional')}</h2>

        <Category url={localeLink(language, '/showroom/painting')} img="/img/portfolio/painting/sunset.jpg">
          {translation('pages.portfolio.category.painting.title')}
        </Category>

        {/*
        <Category url={localeLink(language, '/showroom/drawing')} img="">
          {translation('pages.portfolio.category.drawing.title')}
        </Category>
        */}
      </section>
    </main>
    <Footer language={language} />
  </>;
}

export function PortfolioCategory({ language, page }: { language: Language, page: string }): ReactElement {
  const translation = translator(language);
  const category = categories.find(category => category.title === page);

  return <>
    <Header page="portfolio" language={language} />

    <main id="showroom">
      {category?.entries.map((sec, index) => <section key={index}>
        <h2>{translation(sec.title)}</h2>
        <h3>{translation(sec.description)}</h3>

        <div className="container" style={{ gridTemplateColumns: `repeat(${sec.grid.width}, 1fr)`, gridTemplateRows: `repeat(${sec.grid.height}, 1fr)` }}>
          {sec.images.map((image, index) => <figure key={index} style={{ gridColumn: `span ${image.size.width} / span ${image.size.width}`, gridRow: `span ${image.size.height} / span ${image.size.height}`, }}>
            <img src={image.path} />
          </figure>)}
        </div>
      </section>)}
    </main>
    <Footer language={language} />
  </>;
}
