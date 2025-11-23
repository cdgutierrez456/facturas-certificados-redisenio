import React from 'react';
import styles from './Features.module.sass';

interface Step {
  title: string;
  description: string;
  number: number;
}

interface FeaturesProps {
  backgroundColor?: string;
  title: string;
  subtitle?: string;
  steps: Step[];
  imageSrc: string;
  imageAlt?: string;
}

export default function Features ({
  backgroundColor = '#FFFFFF',
  title,
  steps,
  imageSrc,
  imageAlt = 'Feature image',
}: FeaturesProps) {
  return (
    <section className={styles.section} style={{ backgroundColor }}>
      <div className={styles.inner}>
        <div className={styles.imageWrap}>
          <img src={imageSrc} alt={imageAlt} />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <ul className={styles.steps}>
            {steps.map((s) => (
              <li key={s.number} className={styles.step}>
                <div className={styles.badge}>{s.number}</div>
                <div className={styles.stepText}>
                  <div className={styles.stepTitle}>{s.title}</div>
                  <div className={styles.stepDesc}>{s.description}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
