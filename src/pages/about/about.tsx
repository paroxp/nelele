import React, { ReactElement } from 'react';

import { Footer, Header } from '../layout';
import { Language, translator } from '../../locale';

export function About({ language }: { language: Language}): ReactElement {
  const translation = translator(language);

  return <>
    <Header page="about" language={language} />

    <main id="about">
      <section className="about">
        <h2>{translation('pages.about.title.about')}</h2>

        {translation('pages.about.content.about').map((paragraph: string, index: number) => <p key={index}>{paragraph}</p>)}
      </section>

      <section className="experience">
        <h2>{translation('pages.about.title.experience')}</h2>

        {translation('pages.about.content.experience').map((experience: { title: string, bullets: string[] }, index: number) => <div key={index}>
          <strong>{experience.title}</strong>

          <ul>
            {experience.bullets.map((bullet: string, index: number) => <li key={index}>{bullet}</li>)}
          </ul>
        </div>)}
      </section>

      <section className="skills">
        <h2>{translation('pages.about.title.skills')}</h2>

        <ul>
          {translation('pages.about.content.skills.specific').map((skill: string, index: number) => <li key={index}>{skill}</li>)}
        </ul>

        <hr />

        <ul className="soft">
          {translation('pages.about.content.skills.soft').map((skill: string, index: number) => <li key={index}>{skill}</li>)}
        </ul>
      </section>

      <section className="software">
        <h2>{translation('pages.about.title.software')}</h2>

        <div>
          <strong>{translation('pages.about.content.software.adobe')}</strong>
          <ul>
            <li>Photoshop</li>
            <li>Illustrator</li>
            <li>InDesign</li>
          </ul>
        </div>

        <div>
          <strong>{translation('pages.about.content.software.threeD')}</strong>
          <ul>
            <li>Zbrush</li>
            <li>3ds Max</li>
            <li>Blender</li>
            <li>Substance Painter</li>
          </ul>
        </div>
      </section>

      <section className="education">
        <h2>{translation('pages.about.title.education')}</h2>

        {translation('pages.about.content.education').map((paragraph: string, index: number) => <p key={index}>{paragraph}</p>)}
      </section>
    </main>
    <Footer language={language} />
  </>;
}
