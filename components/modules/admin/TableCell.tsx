const TableCell = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <td className={`px-5 py-5 text-sm ${className}`}>
    {children}
  </td>
);

export default TableCell;