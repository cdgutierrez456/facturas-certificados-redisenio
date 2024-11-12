import { useState } from 'react';
import { db } from 'app/services/firebase/serviciosFaqs';
import { collection, addDoc } from 'firebase/firestore';

export const AdminPanel = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const handleSubmit = async () => {
    console.log("oeo ñero")
    if (question && answer) {
      console.log(question)
      console.log(answer)
      await addDoc(collection(db, 'faqs'), { question, answer })
      setQuestion('')
      setAnswer('')
    }
  };

  return (
    <div className="admin-panel">
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
      <button onClick={handleSubmit}>Guardar</button>
      <div className="preview">
        <h3>Vista Previa</h3>
        <p><strong>Pregunta:</strong> {question}</p>
        <p><strong>Respuesta:</strong> {answer}</p>
      </div>
    </div>
  )
}
