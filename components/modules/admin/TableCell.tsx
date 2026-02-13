const TableCell = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <td className={`px-5 py-5 text-base ${className}`}>
    {children}
  </td>
);

export default TableCell;