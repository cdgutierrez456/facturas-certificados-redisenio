"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Editor } from '@tinymce/tinymce-react';

import { showToast } from "@/utils/alerts";
import { uploadImageService, createPostService } from "@/services/firebase/megapagosProject";

import ImageUploadZone from "./ImageUploadZone";

interface EditorBlockProps {
  onToggleModal: (val: boolean) => void;
}

type FormData = {
  title: string;
  titleH1: string;
  slug: string;
  introduction: string;
  descriptionImg: string;
  hideDate: string;
  content: string;
  dateModified: string;
};

const API_KEY_TINYMCE = process.env.NEXT_PUBLIC_API_KEY_TINYMCE || '';

const EditorBlock = ({ onToggleModal }: EditorBlockProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [image, setImage] = useState<File | null>(null)
  const editorRef = useRef<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!editorRef.current) return
    setIsSaving(true);
    const content = editorRef.current.getContent();
    let imageUrl = '';
    if (image) {
      imageUrl = await uploadImageService(image);
    }
    const body = {
      title: data.title,
      titleH1: data.titleH1,
      titleUrl: data.slug,
      htmlContent: content,
      introduction: data.introduction,
      img: imageUrl,
      hideDate: data.hideDate,
      descriptionImg: data.descriptionImg,
      dateModified: new Date().toISOString(),
      date: new Date().toISOString(),
    }
    try {
      await createPostService(body)
      showToast('success', 'POST creado con éxito.')
      onToggleModal(false)
    } catch (error) {
      console.log('error', error);
      setIsSaving(false)
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 my-10">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Crear Nuevo Post</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título del Post
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="El titulo del post para la Factura"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
            />
            {/* {errors.title && (
              <span className="text-red-500 text-xs mt-1">El título es requerido</span>
            )} */}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titulo H1
            </label>
            <input
              {...register("titleH1", { required: true })}
              type="text"
              placeholder="Ej: Titulo H1 del POST"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 text-gray-900"
            />
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
          <div>
            <label htmlFor="hideDate" className="block text-sm font-medium text-gray-700 mb-1">
              Visibilidad de la Fecha
            </label>
            <select
              {...register("hideDate")}
              id="hideDate"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 text-gray-900"
            >
              <option value="false">Sí, mostrar fecha</option>
              <option value="true">No, ocultar fecha</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Introducción / Resumen
            </label>
            <input
              {...register("introduction", { required: true })}
              type="text"
              placeholder="Ej: Introduccion del post"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
            />
            {/* {errors.title && (
              <span className="text-red-500 text-xs mt-1">El título es requerido</span>
            )} */}
          </div>
        </div>
        <div>
          <ImageUploadZone
            onImageSelect={(file) => {
              if (file) setImage(file)
              else setImage(null)
            }}
          />
        </div>
        <div className="grid grid-cols-1 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripcion alternativa Imagen
            </label>
            <input
              {...register("descriptionImg", { required: true })}
              type="text"
              placeholder="Ej: Introduccion del post"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
            />
            {/* {errors.title && (
              <span className="text-red-500 text-xs mt-1">El título es requerido</span>
            )} */}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contenido
          </label>
          <Editor
            apiKey={`${API_KEY_TINYMCE}`}
            onInit={(evt: any, editor: any) => editorRef.current = editor}
            initialValue="<p>Escribe tu POST aquí...</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'link image media | removeformat code help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
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