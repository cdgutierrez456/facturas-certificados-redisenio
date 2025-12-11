"use client"
import {FAQs} from '@/components/questions/Faqs';
import styles from "./Faqs.module.sass";

const FAQsPage = () => {
  return (
    <div className={styles.Container}>
      <h2>Preguntas Frecuentes</h2>
      <FAQs />
    </div>
  );
};

export default FAQsPage;
