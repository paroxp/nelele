import React, { ReactElement } from 'react';

import { Footer, Header } from '../layout';

export function About(): ReactElement {
  return <>
    <Header page="about" />

    <main id="about">
      <section className="about">
        <h2>O mnie</h2>

        <p>
          Jestem absolwentką grafiki komputerowej na Akademii WIT w Warszawie. Szybko przyswajam nowe umiejętności i lubię kreatywnie bawić się treścią. Potrafię bez przeszkód pracować w zespole.
        </p>

        <p>
          Moją pasją jest tworzenie grafik zarówno cyfrowych jak i tradycyjnych. Uwielbiam wszelakie fantasy, a wolny czas lubię spędzać na grach komputerowych.
        </p>
      </section>

      <section className="experience">
        <h2>Doświadczenie</h2>

        <strong>
          Staż jako grafik komputerowy w firmie ANTERIS Irena Kucharska
        </strong>

        <ul>
          <li>Projektowanie wzorów do druku</li>
          <li>Tworzenie ilustracji przeznaczonych do druku</li>
          <li>Obróbka zdjęć i ich przygotowanie do dalszego użytku</li>
          <li>Praca z Midjourney AI, generowanie ilustracji, a następnie obróbka ich w Photoshopie</li>
        </ul>
      </section>

      <section className="skills">
        <h2>Umiejętności</h2>

        <ul>
          <li>Planowanie i zarządzanie projektami</li>
          <li>Projektowanie kreatywne i koncepcyjne</li>
          <li>Tworzenie postaci i scenerii w stylistyce fantasy</li>
          <li>Modelowanie obiektów 3D</li>
        </ul>

        <hr />

        <ul className="soft">
          <li>Błyskawicznie przyswajam nowe umiejętności oraz szybko opanowuję nowe narzędzia i technologie</li>
          <li>Tworzę oryginalne i kreatywne projekty</li>
          <li>Umiejętnie zarządzam swoim czasem</li>
          <li>Potrafię efektywnie współpracować z zespołem, aby wspólnie osiągać wyznaczone cele</li>
        </ul>
      </section>

      <section className="software">
        <h2>Programy</h2>

        <div>
          <strong>PAKIET ADOBE</strong>
          <ul>
            <li>Photoshop</li>
            <li>Illustrator</li>
            <li>InDesign</li>
          </ul>
        </div>

        <div>
          <strong>PROGRMY 3D</strong>
          <ul>
            <li>Zbrush</li>
            <li>3ds Max</li>
            <li>Blender</li>
            <li>Substance Painter</li>
          </ul>
        </div>
      </section>

      <section className="education">
        <h2>Wykształcenie</h2>

        <p>
          Akademia WIT w Warszawie - Grafika/Techniki mulimedialne
        </p>
      </section>
    </main>
    <Footer />
  </>;
}
