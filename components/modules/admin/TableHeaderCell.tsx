const TableHeaderCell = ({ children, align = 'left' }: { children: React.ReactNode, align?: 'left' | 'right' }) => (
  <th className={`px-5 py-4 border-b-2 border-gray-200 bg-gray-50 text-${align} text-xs font-semibold text-gray-600 uppercase tracking-wider`}>
    {children}
  </th>
);

export default TableHeaderCell;