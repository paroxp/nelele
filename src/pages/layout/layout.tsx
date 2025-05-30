import moment from 'moment';
import React, { ReactElement, ReactNode } from 'react';

import { Config } from '../../config';
import { dog, social } from '../../img';

type HeaderProperties = {
  readonly page?: string;
}

type LinkProperties = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly href: string;
  readonly internal?: boolean;
}

type SocialLinkProperties = {
  readonly icon: string;
  readonly title: string;
  readonly url: string;
}

export function Link(props: LinkProperties): ReactElement {
  return <a
    className={props.className}
    href={props.href}
    target={!props.internal ? '_blank' : undefined}
    rel={!props.internal ? 'external nofollow noopener noreferrer' : undefined}>
      {props.children}
    </a>;
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
  return <header className={props.page}></header>;
}

export function Footer(): ReactElement {
  const currentYear = moment().year();

  return <footer>
    <div dangerouslySetInnerHTML={{ __html: dog.lurking }}></div>
  </footer>;
}

export function htmlDocument(config: Config, body: string): string {
  const title = `${config.name} - ${config.title}`;
  const pageTitle = `${config.subtitle ? `${config.subtitle} - ` : ''}${title}`;

  return `<!doctype html>
  <html lang="en">
    <head>
      <title>${pageTitle}</title>
      <meta content="${pageTitle}" property="og:title">

      <meta charset="utf-8">
      <meta name="theme-color" content="#3D9970"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
      <meta name="description" content="${config.description}"  property="og:description">
      <meta name="keywords" content="${config.keywords.join(',')}">
      <meta name="author" content="${config.name}">
      <meta name="copyright" content="Copyright 2014 - ${moment().year()}">

      <link rel="canonical" href="${new URL(config.path || '', config.url).href}">

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
      <link rel="manifest" href="/site.webmanifest">
      <meta name="msapplication-TileColor" content="#004643">
      <meta name="theme-color" content="#004643">

      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Hind+Siliguri:wght@300;500;700&display=swap">

      <style>${config.styles}</style>
    </head>

    <body>
      ${body}
      ${config.scripts ? `<script>${config.scripts}</script>` : ''}
    </body>
  </html>`;
}
