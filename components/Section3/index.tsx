'use client'
import styles from './Section3.module.sass';
import CarruselContainer from '../CarruselContainer';

interface Seccion3Props {
  title: string;
}

const demoCards = [
  {
    imageSrc: '/images/rectangle_9063.png',
    title: 'Lorem ipsum',
    onClick: () => alert('Ver más 1'),
  },
  {
    imageSrc: '/images/rectangle_9063.png',
    title: 'Lorem ipsum',
    onClick: () => alert('Ver más 2'),
  },
  {
    imageSrc: '/images/rectangle_9063.png',
    title: 'Lorem ipsum',
    onClick: () => alert('Ver más 3'),
  },
  {
    imageSrc: '/images/rectangle_9063.png',
    title: 'Lorem ipsum',
    onClick: () => alert('Ver más 3'),
  },

];

export default function Section3 ({ title }: Seccion3Props) {
  return (
    <section className={styles.section}>
      <div className={styles.contenedor}>
        <h2 className={styles.title}>{title}</h2>
        <CarruselContainer cards={demoCards} />
      </div>
    </section>
  );
};
