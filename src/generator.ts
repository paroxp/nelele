import * as fs from 'fs';
import path from 'path';

import html from 'html-minifier';
import scss from 'sass';
import { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import { transpileModule, TranspileOptions } from 'typescript';

import * as tsconfig from '../tsconfig.json';

import { Config, config } from './config';
import { Language } from './locale';
import { About } from './pages/about';
import { NotFound } from './pages/errors';
import { Home } from './pages/home';
import { htmlDocument } from './pages/layout';
import { Portfolio } from './pages/portfolio';
import { generateSiteMap } from './pages/sitemap';

interface FileCopyable {
  readonly destination: string;
  readonly source: string;
}

interface FileWriteable {
  readonly content: string;
  readonly filename: string;
}

interface Page {
  readonly body: (props?: any) => ReactElement;
  readonly extension?: string;
  readonly filename?: string;
  readonly language?: Language;
  readonly name: string;
  readonly path: string;
  readonly scripts?: string;
  readonly skipSitemap?: boolean;
  readonly styles?: string;
}

function compileHTML(page: (props: object) => ReactElement, cfg: Config): string {
  const content = page({ language: cfg.language });

  return html.minify(htmlDocument(cfg, renderToString(content)), {
    collapseWhitespace: true,
    minifyJS: true,
    removeComments: true,
  });
}

function compileSCSS(filename: string): string {
  return scss.compile(path.join(__dirname, filename), {
    loadPaths: [
      'src/scss',
    ],
    style: 'compressed',
  }).css.toString();
}

function compileTypeScript(filename: string): string {
  const source = fs.readFileSync(path.join(__dirname, filename), 'utf8');

  return transpileModule(source, tsconfig as unknown as TranspileOptions).outputText;
}

function discoverFilesToCopy(filepath: string, distPath?: string): readonly FileCopyable[] {
  return fs.readdirSync(path.join(__dirname, filepath)).map((filename: string) =>
    ({ destination: dist(filepath, filename), source: path.join(__dirname, filepath, filename) }));
}

function dist(...parts: readonly string[]): string {
  const filepath = path.join(__dirname, '..', 'dist', ...parts);
  const dirpath = path.dirname(filepath);
  if (!fs.existsSync(dirpath)) {
    fs.mkdirSync(dirpath, { recursive: true });
  }

  return filepath;
}

function iterativelyCompileHTML(files: readonly FileWriteable[], page: Page): readonly FileWriteable[] {
  const filename = page.filename || `${page.name}${page.extension || '.html'}`;
  const filepath = path.dirname(`${page.path}.html`);
  const { scripts } = page;
  const styles = page.styles || 'html{background-color:red}';
  const content = compileHTML(page.body, { ...config, language: page.language, page: page.name, path: page.path, scripts, styles });

  return [...files, { content, filename: path.join(filepath, filename) }];
}

async function generator(): Promise<void> {
  const pages: readonly Page[] = [
    {
      body: Home,
      filename: 'index.html',
      name: 'home',
      path: '/',
      styles: compileSCSS('./scss/home.scss'),
    },
    {
      body: About,
      name: 'about',
      path: '/about',
      styles: compileSCSS('./scss/about.scss'),
    },
    {
      body: Portfolio,
      name: 'portfolio',
      path: '/portfolio',
      styles: compileSCSS('./scss/portfolio.scss'),
    },
    {
      body: NotFound,
      name: '404',
      path: '/404',
      skipSitemap: true,
      styles: compileSCSS('./scss/error.scss'),
    }
  ];

  const sitemap = await generateSiteMap(config, pages.filter(page => !page.skipSitemap));

  const files: readonly FileWriteable[] = [
    ...[
      ...pages.reduce((all: Page[], page: Page) => {
        return [
          ...all,
          { ...page, language: 'en' as Language },
          { ...page, language: 'pl' as Language, path: path.join('/pl', page.path) },
        ];
      }, []),
    ].reduce(iterativelyCompileHTML, []),
    { content: sitemap, filename: 'sitemap.xml' },
  ];
  console.info(`${files.length} files to write.`, '\n');

  files.map(file => {
    fs.writeFileSync(dist(file.filename), file.content);
    console.info(`'${file.filename}' file generated.`);
  });

  const copyList = [
    { destination: dist('robots.txt'), source: path.join(__dirname, 'static', 'robots.txt') },
    { destination: dist('img', 'background', 'landing.svg'), source: path.join(__dirname, 'img', 'background', 'landing.svg') },
    { destination: dist('img', 'background', 'page.svg'), source: path.join(__dirname, 'img', 'background', 'page.svg') },
    { destination: dist('img', 'background', 'placeholder.svg'), source: path.join(__dirname, 'img', 'background', 'placeholder.svg') },

    ...discoverFilesToCopy('./img/favicon/'),
    ...discoverFilesToCopy('./img/translations/'),
  ];

  console.info('\n', `${copyList.length} files to copy.`, '\n');

  copyList.map(file => {
    fs.copyFileSync(file.source, file.destination);
    console.info(`'${file.source}' file copied.`);
  });
}

generator()
  .catch(console.error);
