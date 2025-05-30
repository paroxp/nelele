import React, { ReactElement } from 'react';

import { ErrorPage } from './error';

export function NotFound(): ReactElement {
  return <ErrorPage id="not-found" title="O nie!">
    <p>Ten zakątek jeszcze nie istnieje... Spróbuj zacząć od <a href="/">strony głównej</a>!</p>
  </ErrorPage>;
}
