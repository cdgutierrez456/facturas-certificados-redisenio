'use client'
// import {AdminPanel} from '@/components/questions/Admin';
// import withAuth from '@/services/firebase/withAut';

// const AdminPage = () => {
//   return (
//     <div className={styles.Container}>
//       <h2>Panel de Administración</h2>
//       <AdminPanel />
//     </div>
//   )
// }

// import { FAQForm, FAQList } from "@/components/modules/admin/FAQ"
// import { BlogForm, BlogList } from "@/components/modules/admin/Blog"

// function AdminPage() {
//   return (
//     <section className="min-h-screen bg-[#f4f6fa] py-10 px-6 md:px-10">
//       <h1 className="text-3xl font-bold text-gray-800 mb-10">Panel de Administración</h1>

//       <div className="grid md:grid-cols-2 gap-10">
//         {/* FAQ Management */}
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-4">Gestión de Preguntas Frecuentes</h2>
//           <FAQForm />
//           <hr className="my-4" />
//           <FAQList />
//         </div>

//         {/* Blog Management */}
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-4">Gestión de Blog</h2>
//           <BlogForm />
//           <hr className="my-4" />
//           <BlogList />
//         </div>
//       </div>
//     </section>
//   )
// }

// export default withAuth(AdminPage);

"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  HelpCircle,
  FileText,
  Plus,
  Edit2,
  Trash2,
  LogOut,
} from "lucide-react";

// --- DATOS DE EJEMPLO (MOCK DATA) ---
// En una aplicación real, esto vendría de tu base de datos / API.

type FaqItem = { id: number; question: string; status: "Published" | "Draft" };
type PostItem = { id: number; title: string; author: string; date: string };

const mockFaqs: FaqItem[] = [
  { id: 1, question: "¿Cómo restablezco mi contraseña?", status: "Published" },
  { id: 2, question: "¿Cuáles son los métodos de pago aceptados?", status: "Published" },
  { id: 3, question: "Política de devoluciones durante días festivos", status: "Draft" },
];

const mockPosts: PostItem[] = [
  { id: 1, title: "Nuevas funcionalidades de la plataforma v2.0", author: "Admin", date: "2023-10-25" },
  { id: 2, title: "Guía de seguridad para usuarios", author: "Soporte", date: "2023-10-20" },
  { id: 3, title: "Resumen del mes de Octubre", author: "Marketing", date: "2023-11-01" },
];

// --- COMPONENTES DE INTERFAZ ---

// Definimos los módulos disponibles
type ModuleType = "dashboard" | "faqs" | "blog";

export default function AdminPanelComponent() {
  // Estado para controlar qué módulo se está visualizando actualmente
  const [activeModule, setActiveModule] = useState<ModuleType>("faqs");

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* --- SIDEBAR NAVEGACIÓN --- */}
      <aside className="w-64 bg-slate-800 text-white flex flex-col shadow-lg">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold tracking-tight">AdminPanel</h1>
          <p className="text-sm text-slate-400">Gestión de Plataforma</p>
        </div>

        <nav className="flex-1 py-4">
          <ul>
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              label="Dashboard General"
              isActive={activeModule === "dashboard"}
              onClick={() => setActiveModule("dashboard")}
            />
            <SidebarItem
              icon={<HelpCircle size={20} />}
              label="Preguntas Frecuentes"
              isActive={activeModule === "faqs"}
              onClick={() => setActiveModule("faqs")}
            />
            <SidebarItem
              icon={<FileText size={20} />}
              label="Blog Posts"
              isActive={activeModule === "blog"}
              onClick={() => setActiveModule("blog")}
            />
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors">
            <LogOut size={18} className="mr-3" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* --- ÁREA DE CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header del contenido */}
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {activeModule === "faqs" && "Gestión de FAQs"}
                {activeModule === "blog" && "Gestión del Blog"}
                {activeModule === "dashboard" && "Bienvenido, Administrador"}
              </h2>
              <p className="text-gray-600 mt-1">
                {activeModule === "faqs" && "Lista, crea y modifica las preguntas frecuentes."}
                {activeModule === "blog" && "Administra las publicaciones y noticias."}
              </p>
            </div>

            {/* Botón de Crear (solo visible en módulos de contenido) */}
            {activeModule !== 'dashboard' && (
               <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors shadow-sm font-medium">
                 <Plus size={18} className="mr-2" />
                 Crear Nuevo {activeModule === 'faqs' ? 'FAQ' : 'Post'}
               </button>
            )}
          </header>

          {/* Renderizado condicional del contenido */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {activeModule === "faqs" && <FaqsTable data={mockFaqs} />}
            {activeModule === "blog" && <BlogTable data={mockPosts} />}
            {activeModule === "dashboard" && <DashboardPlaceholder />}
          </div>
        </div>
      </main>
    </div>
  );
}


// --- SUB-COMPONENTES PARA ORGANIZAR EL CÓDIGO ---

// Componente para los ítems del menú lateral
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


// Tabla para el módulo de FAQs
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


// Tabla para el módulo de Blog Posts
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

// Placeholder para el dashboard
const DashboardPlaceholder = () => (
    <div className="p-12 text-center text-gray-500">
        <LayoutDashboard size={48} className="mx-auto mb-4 opacity-50"/>
        <p className="text-lg">Selecciona un módulo del menú lateral para comenzar a administrar.</p>
    </div>
)


// --- HELPERS PARA ESTILOS DE TABLA REPETITIVOS ---

const TableHeaderCell = ({ children, align = 'left' }: { children: React.ReactNode, align?: 'left' | 'right' }) => (
  <th className={`px-5 py-4 border-b-2 border-gray-200 bg-gray-50 text-${align} text-xs font-semibold text-gray-600 uppercase tracking-wider`}>
    {children}
  </th>
);

const TableCell = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <td className={`px-5 py-5 text-sm ${className}`}>
    {children}
  </td>
);

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