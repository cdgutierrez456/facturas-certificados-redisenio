import ActionButtonsCell from "./ActionButtonsCell";
import TableHeaderCell from "./TableHeaderCell";
import TableCell from "./TableCell";

import { PostItem } from "@/interfaces/Post";

const BlogTable = ({ data }: { data: PostItem[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <TableHeaderCell>Título</TableHeaderCell>
            <TableHeaderCell>Autor</TableHeaderCell>
            <TableHeaderCell>Fecha</TableHeaderCell>
            <TableHeaderCell align="right">Acciones</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {data.map((post) => (
            <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
               <TableCell className="font-medium text-gray-900">{post.title}</TableCell>
               <TableCell className="text-gray-600">{post.author}</TableCell>
               <TableCell className="text-gray-500 text-sm">{new Date(post.date).toLocaleDateString()}</TableCell>
               <ActionButtonsCell />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;