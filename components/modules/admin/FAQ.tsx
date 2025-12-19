// components/admin/FAQ.tsx
import { useState } from "react"

export function FAQForm() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  return (
    <div>
      <input
        type="text"
        placeholder="Escribe la pregunta"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-3"
      />
      <textarea
        placeholder="Escribe la respuesta"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-3"
        rows={4}
      />
      <button className="bg-yellow-400 text-white font-semibold px-4 py-2 rounded hover:bg-yellow-500">
        Guardar
      </button>
    </div>
  )
}

export function FAQList() {
  const items = [
    { question: "¿Dónde está Bogotá?", answer: "En Colombia" },
    { question: "¿Puedo pagar con Nequi?", answer: "Sí, desde el operador Tigo" },
  ]

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="border rounded-lg px-4 py-3 bg-gray-50 shadow-sm flex justify-between items-start"
        >
          <div>
            <h4 className="font-medium text-blue-700">{item.question}</h4>
            <p className="text-sm text-gray-700">{item.answer}</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-3 py-1 text-sm rounded">Editar</button>
            <button className="bg-yellow-400 text-white px-3 py-1 text-sm rounded">Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  )
}
