import { Edit2, Trash2 } from "lucide-react";

import TableCell from "./TableCell";

const ActionButtonsCell = () => (
  <TableCell className="text-right">
    <div className="flex justify-end space-x-3">
      <button className="text-indigo-600 hover:text-indigo-900 flex items-center text-sm font-medium bg-indigo-50 px-2 py-1 rounded border border-indigo-100 hover:bg-indigo-100 transition-colors">
        <Edit2 size={14} className="mr-1" /> Modificar
      </button>
      <button className="text-red-600 hover:text-red-900 flex items-center text-sm font-medium bg-red-50 px-2 py-1 rounded border border-red-100 hover:bg-red-100 transition-colors">
        <Trash2 size={14} className="mr-1" /> Eliminar
      </button>
    </div>
  </TableCell>
)

export default ActionButtonsCell;