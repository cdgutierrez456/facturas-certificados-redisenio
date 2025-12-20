const SidebarItem = ({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`w-full flex items-center px-6 py-3 text-left text-sm font-medium transition-colors duration-150 ${
          isActive
            ? "bg-indigo-600 text-white border-r-4 border-indigo-300"
            : "text-slate-300 hover:bg-slate-700 hover:text-white"
        }`}
      >
        <span className="mr-3">{icon}</span>
        {label}
      </button>
    </li>
  );
};

export default SidebarItem