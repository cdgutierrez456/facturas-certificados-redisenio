//\megapagos\src\components\Seccion2.tsx
'use client';

import React from 'react';
import styles from './Section2.module.sass';

type Card = {
  iconSrc: string;
  iconAlt?: string;
  title: string;
  description: string;
};

interface seccion2Props {
  backgroundColor?: string; // #fff por diseño
  title: string;
  cards: Card[]; // En el diseño son 4, pero puede ser variable
}

export default function Section2({
  backgroundColor = '#ffffffff',
  title,
  cards,
}: seccion2Props) {
  return (
    <section className={styles.section} style={{ backgroundColor }}>
      <div className={styles.inner}>
        <div className={styles.contentContainer}>
          <h2 className={styles.title}>Lorem ipsum dolor sit amet consectetur leo mi nullam</h2>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet consectetur. Pharetra semper et nisi maecenas. Sollicitudin id diam malesuada natoque volutpat pellentesque.
          </p>
          <button className={styles.button}>Enviar</button>
          <div className={styles.carouselControls}>
            <button className={styles.arrow}>&lt;</button>
            <span className={styles.dots}>
              <span className={styles.dot + ' ' + styles.active}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </span>
            <button className={styles.arrow}>&gt;</button>
          </div>
        </div>
      </div>
    </section>
  );
};