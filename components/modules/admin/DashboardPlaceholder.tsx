import { LayoutDashboard } from "lucide-react";

const DashboardPlaceholder = () => (
  <div className="p-12 text-center text-gray-500">
    <LayoutDashboard size={48} className="mx-auto mb-4 opacity-50"/>
    <p className="text-lg">Selecciona un módulo del menú lateral para comenzar a administrar.</p>
  </div>
)

export default DashboardPlaceholder;