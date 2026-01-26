'use client'

import { useState } from "react";
import { usePosts } from "./hooks/useBlogTable";
import { Edit2, Trash2 } from "lucide-react";

import { showToast, showAlert } from "@/utils/alerts";
import { deletePostService } from "@/services/firebase/megapagosProject";

import ModalPost from "@/components/modules/blog/ModalPost";
import TableHeaderCell from "./TableHeaderCell";
import TableCell from "./TableCell";

const BlogTable = () => {
  const { posts, loading, getPost } = usePosts();
  const [showModal, setShowModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const onToggleModal = (show: boolean, post?: any) => {
    setSelectedPost(post);
    setShowModal(show)
  }

  const handleDeletePost = async (postId: string, imageUrl?: string) => {
    try {
      const infoDeleted = deletePostService(postId, imageUrl)
      showToast('success', 'Publicación eliminada correctamente');
      getPost();
    } catch (error) {
      showAlert({
        type: 'error',
        title: 'Error',
        message: 'No se pudo eliminar la publicación. Intenta nuevamente.'
      })
    }
  }

  if (loading) return <p className="text-gray-800">Cargando publicaciones...</p>;

  return (
    <>
      <div className="overflow-x-auto">
        {posts.length ? (
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Titulo</TableHeaderCell>
                <TableHeaderCell>Descripcion</TableHeaderCell>
                <TableHeaderCell align="right">Acciones</TableHeaderCell>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <TableCell className="font-medium text-gray-900">{post.id}</TableCell>
                  <TableCell className="font-medium text-gray-600">{post.title}</TableCell>
                  <TableCell className="text-gray-600">{post.introduction}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => onToggleModal(true, post)}
                        className="text-indigo-600 hover:text-indigo-900 flex items-center text-sm font-medium bg-indigo-50 px-2 py-1 rounded border border-indigo-100 hover:bg-indigo-100 transition-colors"
                      >
                        <Edit2 size={14} className="mr-1" /> Modificar
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id, post.img)}
                        className="text-red-600 hover:text-red-900 flex items-center text-sm font-medium bg-red-50 px-2 py-1 rounded border border-red-100 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 size={14} className="mr-1" /> Eliminar
                      </button>
                    </div>
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center h-[30dvh] text-gray-800">
            No tienes publicaciones creadas
          </div>
        )}
      </div>
      {showModal && (
        <ModalPost
          onToggleModal={onToggleModal}
          postToEdit={selectedPost}
        />
      )}
    </>
  );
};

export default BlogTable;