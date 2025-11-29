import path from 'path';

import moment from 'moment';
import React, { ReactElement } from 'react';

import { Config } from '../../config';
import { logo, social } from '../../img';
import { Language, localeLink, translator } from '../../locale';

type HeaderProperties = {
  readonly language: Language;
  readonly page?: string;
}

type SocialLinkProperties = {
  readonly icon: string;
  readonly title: string;
  readonly url: string;
}

function SocialLink(props: SocialLinkProperties): ReactElement {
  const image = social[props.icon];

  return <li>
    <a
      href={props.url}
      target="_blank"
      rel="external nofollow noopener noreferrer me"
      title={props.title}
      className={props.icon}>
      <span className={['icon', props.icon].join(' ')} dangerouslySetInnerHTML={{ __html: image }}></span>
      <span className="visually-hidden">{props.title}</span>
    </a>
  </li>;
}

export function Header(props: HeaderProperties): ReactElement {
  const translation = translator(props.language);
  const active = (name: string) => name === props.page ? 'active' : '';

  return <header className={props.page}>
    <h1>
      Barbara Prochownik
      <small>Graphic Designer</small>
    </h1>

    <nav className='no-print'>
      <ol>
        <li><a href={localeLink(props.language, '/')} className="logo" dangerouslySetInnerHTML={{ __html: logo }}></a></li>
        <li><a href={localeLink(props.language, '/about')} className={active("about")}>{translation('layout.menu.about')}</a></li>
        <li><a href={localeLink(props.language, '/portfolio')} className={active("portfolio")}>{translation('layout.menu.portfolio')}</a></li>
      </ol>
    </nav>
  </header>;
}

export function Footer({ language }: { language: Language}): ReactElement {
  const translation = translator(language);
  const currentYear = moment().year();

  return <footer className='no-print'>
    <ul className="icons">
      <SocialLink icon="instagram" url="https://www.instagram.com/nevandela" title={translation('layout.footer.social.instagram')} />
    </ul>
    &copy; 2014 - {currentYear}
  </footer>;
}

function languageSelector(language: Language) {
  if (language === 'pl') {
    return { path: '/', title: 'English' };
  }

  return { path: '/pl', title: 'Polski' };
}

export function htmlDocument(config: Config, body: string): string {
  const language = config.language || 'en';
  const translation = translator(language);
  const langSelector = languageSelector(language);
  const title = `${config.name} - ${translation('meta.title')}`;
  const pageTitle = `${config.subtitle ? `${config.subtitle} - ` : ''}${title}`;

  return `<!doctype html>
  <html lang="en" data-page="${config.page || ''}">
    <head>
      <title>${pageTitle}</title>
      <meta content="${pageTitle}" property="og:title">

      <meta charset="utf-8">
      <meta name="theme-color" content="#3D9970"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
      <meta name="description" content="${translation('meta.description')}"  property="og:description">
      <meta name="keywords" content="${config.keywords.join(',')}">
      <meta name="author" content="${config.name}">
      <meta name="copyright" content="Copyright 2014 - ${moment().year()}">

      <link rel="canonical" href="${new URL(config.path || '', config.url).href}">

      <link rel="apple-touch-icon" sizes="180x180" href="/img/favicon/apple-touch-icon.png">
      <link rel="icon" type="image/png" href="/img/favicon/favicon-96x96.png" sizes="96x96">
      <link rel="icon" type="image/svg+xml" href="/img/favicon/favicon.svg">
      <link rel="manifest" href="/img/favicon/site.webmanifest">
      <link rel="shortcut icon" href="/img/favicon/favicon.ico">
      <meta name="apple-mobile-web-app-title" content="Barbara Prochownik">
      <meta name="msapplication-TileColor" content="#FFEFCF">
      <meta name="theme-color" content="#FFEFCF">

      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

      <style>${config.styles}</style>
    </head>

    <body>
      <div class="page background"></div>
      <div class="language-selection">
        <a data-language="${langSelector.title}" href="${path.join(langSelector.path, (config.path || '').replace(`/${language}`, ''))}" title="${langSelector.title}"></a>
      </div>
      ${body}
      ${config.scripts ? `<script>${config.scripts}</script>` : ''}
    </body>
  </html>`;
}
