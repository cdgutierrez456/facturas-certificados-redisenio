'use client';

import { useState } from 'react';
import styles from './Hero.module.sass';

interface OperatorImage {
  src: string;
  alt: string;
  bg?: string;
  backgroundImage?: string;
}

interface HeroProps {
  mainImage: string;
  title: string;
  subtitle: string;
  operatorImages: OperatorImage[];
  step: string[];
}

export default function Hero({
  mainImage,
  title,
  subtitle,
  operatorImages,
  step
}: HeroProps) {
  const [selectedStep, setSelectedStep] = useState(0);
  const [selectedOperator, setSelectedOperator] = useState<number | null>(null);

  const getCurrentBackgroundImage = () => {
    if (selectedOperator !== null && operatorImages[selectedOperator]?.backgroundImage) {
      return operatorImages[selectedOperator].backgroundImage;
    }
    return mainImage;
  };

  return (
    <section className={styles.heroContainer} data-propiedad-1="Predeterminada">
      <img className={styles.heroBg} src={getCurrentBackgroundImage()} alt="" aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.steps}>
          {step.map((text, index) => (
            <div
              key={index}
              className={`${styles.stepIndicator} ${selectedStep === index ? styles.selected : ''}`}
            >
              {text}
            </div>
          ))}
        </div>

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>

        <div className={styles.operators}>
          {operatorImages.map((operator, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.operatorCard} ${selectedOperator === index ? styles.operatorSelected : ''}`}
              style={{ backgroundColor: operator.bg || 'transparent' }}
              aria-label={operator.alt}
              onClick={() => setSelectedOperator(index)}
            >
              <img src={operator.src} alt={operator.alt} className={styles.operatorLogo} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
