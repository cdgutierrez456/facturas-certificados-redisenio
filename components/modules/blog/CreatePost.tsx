"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import EditorJS, { OutputData } from "@editorjs/editorjs";
// @ts-ignore // Ignoramos tipos estrictos para plugins externos
import Header from "@editorjs/header";
// @ts-ignore
import List from "@editorjs/list";
// 1. IMPORTAR LA HERRAMIENTA DE IMAGEN
// @ts-ignore
import ImageTool from "@editorjs/image";

import axios from "axios";

type FormData = {
  title: string;
  slug: string;
};

const EditorBlock = () => {
  const [isSaving, setIsSaving] = useState(false);
  const editorInstance = useRef<EditorJS | null>(null);
  const holderRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

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
          // 2. CONFIGURACIÓN DE LA IMAGEN
          image: {
            class: ImageTool,
            config: {
              // Aquí definimos cómo se suben las imágenes
              uploader: {
                /**
                 * Función de subida por archivo (Drag & Drop o Click)
                 * @param {File} file - El archivo seleccionado
                 */
                async uploadByFile(file: File) {

                  // --- AQUI DEBE IR TU LLAMADA REAL A LA API ---
                  // Ejemplo real:
                  // const formData = new FormData();
                  // formData.append("file", file);
                  // const res = await axios.post("/api/upload", formData);
                  // return { success: 1, file: { url: res.data.url } };

                  // --- SIMULACIÓN (Para que veas que funciona ya mismo) ---
                  return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      // Simulamos un delay de red y devolvemos la imagen en base64 local
                      setTimeout(() => {
                        resolve({
                          success: 1,
                          file: {
                            url: reader.result as string, // URL temporal
                          },
                        });
                      }, 1000);
                    };
                    reader.readAsDataURL(file);
                  });
                },
              },
            },
          },
        },
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

    return () => {
      if (editorInstance.current && editorInstance.current.destroy) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSaving(true);
    try {
      const editorData: OutputData = await editorInstance.current!.save();

      if (editorData.blocks.length === 0) {
        alert("El post no puede estar vacío");
        setIsSaving(false);
        return;
      }

      const payload = {
        title: data.title,
        slug: data.slug,
        content: editorData,
      };

      console.log("📦 Payload con Imágenes:", payload);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("¡Post guardado! Revisa la consola.");
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contenido
          </label>

          <div className="border border-gray-200 rounded-lg min-h-[400px] p-4 bg-gray-50 prose prose-stone max-w-none text-gray-900">
            <div ref={holderRef} id="editorjs" />
          </div>
        </div>

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