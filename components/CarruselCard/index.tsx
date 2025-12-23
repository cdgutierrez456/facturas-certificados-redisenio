'use client'
import Image from 'next/image';
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
      <Image className={styles.image} src={imageSrc} alt={imageAlt || title} fill />
      <h3 className={styles.title}>{title}</h3>
      <button className={styles.button} onClick={onClick}>Ver más</button>
    </div>
  );
};
