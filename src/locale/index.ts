import jsonpath from 'jsonpath';

import * as en from './en.json';
import * as pl from './pl.json';

export type Language = 'en' | 'pl';

function translation(language: Language, key: string): any {
  const dictionairy = { en, pl };
  const results = jsonpath.query(dictionairy[language], `$.${key}`);
  if (results.length < 1) {
    throw new Error(`unable to find a translation for '${language}' under path '${key}'.`);
  }

  return results[0];
}

export const translator = (language: Language) => (key: string) => translation(language, key);

export function localeLink(language: Language, path: string): string {
  return `${language === 'en' ? '' : `/${language}`}${path}`;
}
