import React, { ReactElement } from 'react';

import { ErrorPage } from './error';
import { Language, localeLink, translator } from '../../locale';

export function NotFound({ language }: { language: Language}): ReactElement {
  const translation = translator(language);

  return <ErrorPage id="not-found" title={translation('pages.404.title')} language={language}>
    <p>{translation('pages.404.content')} <a href={localeLink(language, '/')}>{translation('pages.404.content_home')}</a>!</p>
  </ErrorPage>;
}
