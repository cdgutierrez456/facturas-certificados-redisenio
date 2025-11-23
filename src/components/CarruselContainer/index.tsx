'use client';

import { useState } from 'react';
import CarruselCard from '../CarruselCard';

import styles from './CarruselContainer.module.sass';

interface CardData {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  onClick?: () => void;
}

interface CarruselContainerProps {
  cards: CardData[];
}

const VISIBLE_CARDS = 4;

export default function CarruselContainer ({ cards }: CarruselContainerProps) {
  const [start, setStart] = useState(0);
  const max = cards.length;

  const goPrev = () => setStart((prev) => (prev === 0 ? max - VISIBLE_CARDS : prev - 1));
  const goNext = () => setStart((prev) => (prev + 1 > max - VISIBLE_CARDS ? 0 : prev + 1));

  const visible = cards.slice(start, start + VISIBLE_CARDS).length === VISIBLE_CARDS
    ? cards.slice(start, start + VISIBLE_CARDS)
    : [...cards.slice(start), ...cards.slice(0, VISIBLE_CARDS - (max - start))];

  return (
    <div>
      <div className={styles.container}>
        {visible.map((card, idx) => (
          <CarruselCard key={idx + start} {...card} />
        ))}
      </div>
      <div className={styles.controls}>
        <button className={styles.arrow} onClick={goPrev} aria-label="Anterior">&#60;</button>
        <div className={styles.dots}>
          {Array.from({ length: max }).map((_, idx) => (
            <span
              key={idx}
              className={idx === start ? styles.dotActive : styles.dot}
              onClick={() => setStart(idx)}
            />
          ))}
        </div>
        <button className={styles.arrow} onClick={goNext} aria-label="Siguiente">&#62;</button>
      </div>
    </div>
  );
};
