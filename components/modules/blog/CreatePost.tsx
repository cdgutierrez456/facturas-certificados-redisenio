"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import axios from "axios";

// Tipos para nuestro formulario
type FormData = {
  title: string;
  slug: string;
};

const EditorBlock = () => {
  const [isSaving, setIsSaving] = useState(false);

  // 1. Refs para controlar la instancia de EditorJS
  const editorInstance = useRef<EditorJS | null>(null);
  const holderRef = useRef<HTMLDivElement>(null);

  // 2. React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // 3. Inicialización del Editor
  useEffect(() => {
    if (!editorInstance.current && holderRef.current) {
      const editor = new EditorJS({
        holder: holderRef.current,
        placeholder: "Escribe tu historia increíble aquí...",
        tools: {
          header: {
            class: Header as any,
            config: {
              placeholder: "Introduce un encabezado",
              levels: [2, 3, 4],
              defaultLevel: 2,
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          // Aquí agregarías ImageTool, Quote, etc.
        },
        // Estilos base para que se vea bien dentro del contenedor
        data: {
          time: new Date().getTime(),
          blocks: [
            {
              type: "paragraph",
              data: {
                text: "Empieza a escribir aquí...",
              },
            },
          ],
        },
      });

      editorInstance.current = editor;
    }

    // Cleanup: Destruir instancia si el componente se desmonta
    return () => {
      if (editorInstance.current && editorInstance.current.destroy) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  // 4. Función de Envío
  const onSubmit = async (data: FormData) => {
    setIsSaving(true);

    try {
      // A. Extraer la data del editor (Esto es asíncrono)
      const editorData: OutputData = await editorInstance.current!.save();

      // B. Validar que no esté vacío
      if (editorData.blocks.length === 0) {
        alert("El post no puede estar vacío");
        setIsSaving(false);
        return;
      }

      // C. Payload final para la API
      const payload = {
        title: data.title,
        slug: data.slug,
        content: editorData, // Aquí va el JSON limpio de bloques
      };

      console.log("📦 Payload listo para enviar:", payload);

      // D. Simulación de llamada a API
      // const response = await axios.post('/api/posts', payload)
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Fake delay

      alert("¡Post guardado con éxito! Revisa la consola para ver el JSON.");
    } catch (error) {
      console.error("Error guardando post:", error);
      alert("Error al guardar");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 my-10">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Crear Nuevo Post</h1>
        <p className="text-sm text-gray-500">
          Usando Editor.js + React Hook Form
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* --- Inputs controlados por React Hook Form --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título del Post
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Ej: El futuro de Next.js"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
            />
            {errors.title && (
              <span className="text-red-500 text-xs mt-1">
                El título es requerido
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug (URL)
            </label>
            <input
              {...register("slug", { required: true })}
              type="text"
              placeholder="Ej: futuro-next-js"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 text-gray-900"
            />
          </div>
        </div>

        {/* --- Área de Editor.js --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contenido
          </label>

          <div
            className="border border-gray-200 rounded-lg min-h-[400px] p-4 bg-gray-50 prose prose-stone max-w-none text-gray-900"
          >
            {/* Agregamos 'text-gray-900' arriba para forzar texto oscuro */}
            <div ref={holderRef} id="editorjs" />
          </div>
        </div>

        {/* --- Footer / Botones --- */}
        <div className="flex justify-end pt-4">
          <button
            type="button"
            className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium mr-4"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className={`
                px-8 py-2 rounded-lg font-medium text-white transition-all
                ${
                  isSaving
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
                }
              `}
          >
            {isSaving ? "Publicando..." : "Publicar Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditorBlock;
