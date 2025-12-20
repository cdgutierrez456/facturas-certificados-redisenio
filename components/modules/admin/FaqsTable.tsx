import TableCell from "./TableCell";
import TableHeaderCell from "./TableHeaderCell";
import ActionButtonsCell from "./ActionButtonsCell";

import { FaqItem } from "@/interfaces/Faqs";

const FaqsTable = ({ data }: { data: FaqItem[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Pregunta</TableHeaderCell>
            <TableHeaderCell>Estado</TableHeaderCell>
            <TableHeaderCell align="right">Acciones</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {data.map((faq) => (
            <tr key={faq.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
              <TableCell className="text-gray-500">#{faq.id}</TableCell>
              <TableCell className="font-medium text-gray-900">{faq.question}</TableCell>
              <TableCell>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    faq.status === "Published"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {faq.status === "Published" ? "Publicado" : "Borrador"}
                </span>
              </TableCell>
             <ActionButtonsCell />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FaqsTable;