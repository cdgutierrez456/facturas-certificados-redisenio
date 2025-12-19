// components/admin/Blog.tsx
import { useState } from "react"

export function BlogForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  return (
    <div>
      <input
        type="text"
        placeholder="Título del blog"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-3"
      />
      <textarea
        placeholder="Contenido breve"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-3"
        rows={4}
      />
      <button className="bg-yellow-400 text-white font-semibold px-4 py-2 rounded hover:bg-yellow-500">
        Guardar
      </button>
    </div>
  )
}

export function BlogList() {
  const posts = [
    {
      title: "Beneficios de pagar online",
      description: "Lorem ipsum dolor sit amet consectetur...",
    },
  ]

  return (
    <div className="space-y-3">
      {posts.map((post, idx) => (
        <div
          key={idx}
          className="border rounded-lg px-4 py-3 bg-white shadow-sm flex justify-between items-start"
        >
          <div>
            <h4 className="font-medium text-black">{post.title}</h4>
            <p className="text-sm text-gray-700">{post.description}</p>
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