import { useState, useEffect } from 'react';
import { db } from 'app/services/firebase/serviciosFaqs';
import { collection, query, onSnapshot } from 'firebase/firestore';
import styles from './Faqs.module.sass';

export const FAQs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'faqs'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const faqsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFaqs(faqsData as unknown as FAQ[]);
    });
    return () => unsubscribe();
  }, []);

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className={styles.faqs}>
      
      {faqs.map(faq => (
        <div
          key={faq.id}
          className={`${styles.faq_item} ${expanded === faq.id ? styles.expanded : ''}`}
          onClick={() => toggleExpand(faq.id)}
        >
          <div className={styles.question}>
            <span>{faq.question}</span>
            <span className={styles.icon}>{expanded === faq.id ? '▲' : '▼'}</span>
          </div>
          {expanded === faq.id && <div className={styles.answer}>{faq.answer}</div>}
        </div>
      ))}
    </div>
  );
};
