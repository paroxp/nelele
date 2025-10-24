import React, { ReactElement, ReactNode } from 'react';

import { Footer, Header } from '../layout';
import { Language } from '../../locale';

type ErrorPageProperties = {
  readonly children: ReactNode;
  readonly language: Language;
  readonly id?: string;
  readonly title: string;
};

export function ErrorPage(props: ErrorPageProperties): ReactElement {
  return <>
    <Header page="error" language={props.language} />
    <main id={props.id}>
      <h1>{props.title}</h1>

      {props.children}
    </main>
    <Footer language={props.language} />
  </>;
}
