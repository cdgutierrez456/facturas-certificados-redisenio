import { useState, useEffect } from 'react'
import { db } from 'app/services/firebase/serviciosFaqs'
import { collection, query, onSnapshot } from 'firebase/firestore'
import styles from './Faqs.module.sass'

export const FAQs = () => {
  const [faqs, setFaqs] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'faqs'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const faqsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFaqs(faqsData);
    });
    return () => unsubscribe()
  }, [])

  return (
    <div className={styles.faqs}>
      {faqs.map(faq => (
        <div key={faq.id} className="faq-item">
          <p><strong>Pregunta:</strong> {faq.question}</p>
          <p><strong>Respuesta:</strong> {faq.answer}</p>
        </div>
      ))}
    </div>
  )
}
