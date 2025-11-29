import React, { ReactElement } from 'react';

import { Footer, Header } from '../layout';
import { Language, localeLink, translator } from '../../locale';

import { categories } from './categories';
import { back } from '../../img';

function Category({ children, url, img, portrait }: { children: string, url: string, img: string, portrait?: boolean }): ReactElement {
  return <a href={url}>
      <figure>
        <div>
          <img src={img} alt={children} className={portrait ? 'portrait' : 'landscape'} />
        </div>
        <figcaption>
          <span>{children}</span>
        </figcaption>
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

        <Category url={localeLink(language, '/showroom/concept')} img="/img/portfolio/concept/envio1.jpg" >
          {translation('pages.portfolio.category.concept.title')}
        </Category>

        <Category url={localeLink(language, '/showroom/illustration')} img="/img/portfolio/illustration/frog.jpg" portrait={true}>
          {translation('pages.portfolio.category.illustration.title')}
        </Category>

        <Category url={localeLink(language, '/showroom/vector')} img="/img/portfolio/vector/corgito-mockup.jpg" portrait={true}>
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
      <section className="index">
        <h2>{translation('layout.menu.portfolio')} - {translation(`pages.portfolio.category.${category?.title}.title`)}</h2>

        {category?.entries.map((sec, index) => <figure key={index}>
          <div>
            <img src={sec.images[0].path} alt={translation(sec.title)} className={sec.images[0].size.portrait ? 'portrait' : 'landscape'} />
          </div>
          <figcaption>{translation(sec.title)}</figcaption>
        </figure>)}
      </section>

      {category?.entries.map((sec, index) => <section key={index}>
        <h3>{translation(sec.title)}</h3>
        <h4>{translation(sec.description)}</h4>

        <div className="container" style={{ gridTemplateColumns: `repeat(${sec.grid.width}, 1fr)`, gridTemplateRows: `repeat(${sec.grid.height}, 1fr)` }}>
          {sec.images.map((image, index) => <figure key={index} style={{ gridColumn: `span ${image.size.width} / span ${image.size.width}`, gridRow: `span ${image.size.height} / span ${image.size.height}`, }}>
            <img src={image.path} />
          </figure>)}
        </div>
      </section>)}

      <a href={localeLink(language, '/portfolio')} id="back">
        <div dangerouslySetInnerHTML={{ __html: back }}></div>
        {translation('pages.portfolio.navigation.back')}
      </a>
    </main>
    <Footer language={language} />
  </>;
}
