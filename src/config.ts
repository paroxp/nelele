export type Config = {
  readonly description: string;
  readonly keywords: readonly string[];
  readonly name: string;
  readonly path?: string;
  readonly scripts?: string;
  readonly styles: string;
  readonly subtitle?: string;
  readonly title: string;
  readonly url: string;
}

export const config: Config = {
  description: 'Ambitious and Creative',
  keywords: [
    'concept', 'art', 'photoshop', 'illustrator', 'blender', 'krita', 'gimp', 'product', 'design', 'ui', 'ux', 'user', 'interface', 'experience', 'games', 'manga', '3d', 'max', 'traditional', 'digital', 'portfolio', 'indesign',
  ],
  name: 'Barbara Prochownik',
  styles: '',
  title: 'Mad Artist',
  url: 'https://www.nevandela.io/',
};
