'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import styles from './ScrollingBanner.module.sass';

interface ScrollingBannerProps {
  texts: string[];
  backgroundColor?: string;
  textColor?: string;
  height?: number;
  speed?: number;
}

export default function ScrollingBanner ({
  texts,
  backgroundColor = '#FFBB00',
  textColor = '#000000',
  height = 101,
  speed = 400
}: ScrollingBannerProps) {
  const [displayTexts, setDisplayTexts] = useState([...texts]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [initialPositions, setInitialPositions] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrolling = scrollingRef.current;

    if (!container || !scrolling) return;

    // Fase 1: Añadir arrays hasta que el último texto no sea visible
    const addArraysUntilFull = () => {
      const containerWidth = container.offsetWidth;
      const scrollingWidth = scrolling.offsetWidth;
      const containerRect = container.getBoundingClientRect();
      const scrollingRect = scrolling.getBoundingClientRect();

      // Verificar si el último texto está fuera del contenedor
      const lastTextRight = scrollingRect.right;
      const containerRight = containerRect.right;

      if (lastTextRight <= containerRight) {
        // Añadir 2 arrays más
        setDisplayTexts(prev => [...prev, ...texts, ...texts]);
        setTimeout(addArraysUntilFull, 100);
      } else {
        // Guardar posiciones iniciales de todos los elementos
        const textElements = scrolling.querySelectorAll(`.${styles.text}, .${styles.separator}`);
        const positions = Array.from(textElements).map(el => el.getBoundingClientRect().left);
        setInitialPositions(positions);

        // Comenzar scroll después de un delay
        setTimeout(() => setIsScrolling(true), 500);
      }
    };

    setTimeout(addArraysUntilFull, 100);
  }, [texts]);

  useEffect(() => {
    if (!isScrolling || initialPositions.length === 0) return;

    const scrolling = scrollingRef.current;
    if (!scrolling) return;

    const checkPosition = () => {
      const textElements = scrolling.querySelectorAll(`.${styles.text}, .${styles.separator}`);

      if (textElements.length >= texts.length * 2) {
        // Encontrar el índice del segundo array (index = 1 del array original)
        const secondArrayStartIndex = texts.length + texts.length; // Primer separador después del primer array completo

        if (textElements[secondArrayStartIndex]) {
          const currentX = textElements[secondArrayStartIndex].getBoundingClientRect().left;
          const initialFirstArrayX = initialPositions[0];

          // Cuando el segundo array llegue a la posición inicial del primero
          if (Math.abs(currentX - initialFirstArrayX) < 5) {
            // Reset todas las posiciones a sus valores iniciales
            scrolling.style.transform = `translateX(0px)`;
            // Añadir un nuevo array para mantener el flujo
            setDisplayTexts(prev => [...prev, ...texts]);
          }
        }
      }
    };

    const interval = setInterval(checkPosition, 100);
    return () => clearInterval(interval);
  }, [isScrolling, displayTexts, texts, initialPositions]);

  return (
    <div
      ref={containerRef}
      className={styles.bannerContainer}
      style={{
        backgroundColor,
        height: `${height}px`
      }}
    >
      <div
        ref={scrollingRef}
        className={`${styles.scrollingContent} ${isScrolling ? styles.scrolling : ''}`}
        style={{
          color: textColor,
          animationDuration: `${speed}s`
        }}
      >
        {displayTexts.map((text, index) => (
          <Fragment key={index}>
            <span className={styles.text}>
              {text}
            </span>
            {index < displayTexts.length - 1 && (
              <span className={styles.separator}>•</span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};