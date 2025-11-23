import styles from './Section1.module.sass';

type Card = {
  iconSrc: string;
  iconAlt?: string;
  title: string;
  description: string;
};

interface Seccion1Props {
  backgroundColor?: string; // #F6F6F6 por diseño
  title: string;
  cards: Card[]; // En el diseño son 4, pero puede ser variable
}

export default function Section1({
  backgroundColor = '#F6F6F6',
  title,
  cards,
}: Seccion1Props) {
  return (
    <section className={styles.section} style={{ backgroundColor }}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.cards}>
          {cards.map((c, idx) => (
            <div className={styles.card} key={idx}>
              <img className={styles.icon} src={c.iconSrc} alt={c.iconAlt ?? c.title} />
              <div className={styles.cardTitle}>{c.title}</div>
              <div className={styles.cardDesc}>{c.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
