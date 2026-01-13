'use client'

import { usePosts } from "./hooks/useBlogTable";

import ActionButtonsCell from "./ActionButtonsCell";
import TableHeaderCell from "./TableHeaderCell";
import TableCell from "./TableCell";

const BlogTable = () => {
  const { posts, loading } = usePosts();

  if (loading) return <p className="text-gray-800">Cargando publicaciones...</p>;

  return (
    <div className="overflow-x-auto">
      {posts.length ? (
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Titulo</TableHeaderCell>
              <TableHeaderCell>Descripcion</TableHeaderCell>
              {/* <TableHeaderCell align="right">Acciones</TableHeaderCell> */}
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <TableCell className="font-medium text-gray-900">{post.id}</TableCell>
                <TableCell className="font-medium text-gray-600">{post.title}</TableCell>
                <TableCell className="text-gray-600">{post.introduction}</TableCell>
                {/* <ActionButtonsCell /> */}
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
  );
};

export default BlogTable;