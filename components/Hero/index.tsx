'use client';

import { useState } from 'react';
import styles from './Hero.module.sass';

import BillingForm from '../modules/payment/BillingForm';

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

type stepsNames = 'Paso 1 de 3' | 'Paso 2 de 3' | 'Paso 3 de 3'

export default function Hero({
  mainImage,
  title,
  subtitle,
  operatorImages,
  step
}: HeroProps) {
  const [actualStep, setActualStep] = useState<stepsNames>('Paso 1 de 3')
  const [selectedOperator, setSelectedOperator] = useState<number | null>(null);

  const getCurrentBackgroundImage = () => {
    if (selectedOperator !== null && operatorImages[selectedOperator]?.backgroundImage) {
      return operatorImages[selectedOperator].backgroundImage;
    }
    return mainImage;
  };

  const setColorOnStep = (nameStep: stepsNames, index?: number) => {
    setSelectedOperator(index || 0)
    setActualStep(nameStep)
  }

  return (
    <section className={styles.heroContainer} data-propiedad-1="Predeterminada">
      <img className={styles.heroBg} src={getCurrentBackgroundImage()} alt="" aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.steps}>
          {step.map((text, index) => (
            <div
              key={index}
              className={`${styles.stepIndicator} ${text === actualStep ? styles.selected : ''}`}
            >
              {text}
            </div>
          ))}
        </div>
        {
          actualStep === 'Paso 1 de 3' ? (
            <>
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
                    onClick={() => setColorOnStep('Paso 2 de 3', index)}
                  >
                    <img src={operator.src} alt={operator.alt} className={styles.operatorLogo} />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <BillingForm
                setColorOnStep={setColorOnStep}
              />
            </>
          )
        }
      </div>
    </section>
  );
};
