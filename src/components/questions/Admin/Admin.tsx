import { useState, useEffect } from "react";
import { db } from "app/services/firebase/serviciosFaqs";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import styles from "./AdminF.module.sass";

export const AdminPanel = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    const q = query(collection(db, "faqs"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const faqsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFaqs(faqsData as unknown as FAQ[])
    });
    return () => unsubscribe()
  }, []);

  const handleSubmit = async () => {
    if (question && answer) {
      if (editingId) {
        // Si estamos editando, actualizamos el documento
        await updateDoc(doc(db, "faqs", editingId), { question, answer });
        setEditingId(null)
      } else {
        // Si no estamos editando, agregamos un nuevo documento
        await addDoc(collection(db, "faqs"), { question, answer });
      }
      setQuestion("")
      setAnswer("")
    }
  };

  const handleEdit = (faq: FAQ) => {
    setQuestion(faq.question)
    setAnswer(faq.answer)
    setEditingId(faq.id)
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "faqs", id))
  }

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id)
  }

  return (
    <div className={styles.admin}>
      <div className={styles.adminPanel}>
        <h3>Agregar nueva</h3>
        <input
          type="text"
          placeholder="Pregunta"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <textarea
          placeholder="Respuesta"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button onClick={handleSubmit}>
          {editingId ? "Guardar cambios" : "Guardar"}
        </button>

        <div className={styles.preview}>
          <h3>Vista Previa</h3>
          <div className={styles.faq_item}>
            <div className={styles.question}>
              <span>{question}</span>
              <span className={styles.icon}>▼</span>
            </div>
            <div className={styles.answer}>{answer}</div>
          </div>
        </div>
      </div>

      <div className={styles.list}>
        <h3>Listado de Preguntas</h3>
        {faqs.map((faq) => (
          <div
          key={faq.id}
          className={`${styles.faq_item} ${expanded === faq.id ? styles.expanded : ''}`}
          onClick={() => toggleExpand(faq.id)}
        >
            <div className={styles.question}>
              <span>{faq.question}</span>{" "}
              <span className={styles.icon}>{expanded === faq.id ? '▲' : '▼'}</span>
            </div>
            {expanded === faq.id && <div className={styles.answer}>{faq.answer}</div>}
            <button className={styles.editButton} onClick={() => handleEdit(faq)}>Editar</button>
            <button className={styles.deleteButton} onClick={() => handleDelete(faq.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};
