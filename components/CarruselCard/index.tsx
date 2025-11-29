'use client'
import styles from './CarruselCard.module.sass';

interface CarruselCardProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  onClick?: () => void;
}

export default function CarruselCard ({ imageSrc, imageAlt, title, onClick }: CarruselCardProps) {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={imageSrc} alt={imageAlt || title} />
      <h3 className={styles.title}>{title}</h3>
      <button className={styles.button} onClick={onClick}>Ver más</button>
    </div>
  );
};
