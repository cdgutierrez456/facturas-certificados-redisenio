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

import React, { useState } from "react";
import {
  LayoutDashboard,
  HelpCircle,
  FileText,
  Plus,
  LogOut,
  X,
} from "lucide-react";

import DashboardPlaceholder from "@/components/modules/admin/DashboardPlaceholder";
import SidebarItem from "@/components/modules/admin/SidebarItem";
import BlogTable from "@/components/modules/admin/BlogTable";
import FaqsTable from "@/components/modules/admin/FaqsTable";
import CreatePost from "@/components/modules/blog/CreatePost";

import { FaqItem } from "@/interfaces/Faqs";
import { PostItem } from "@/interfaces/Post";

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

// Definimos los módulos disponibles
type ModuleType = "dashboard" | "faqs" | "blog";

export default function AdminPanelComponent() {
  const [showModal, setShowModal] = useState(false)
  const [activeModule, setActiveModule] = useState<ModuleType>("faqs");

  const onToggleModal = (show: boolean) => {
    setShowModal(show)
  }

  return (
    <main className="flex h-screen bg-gray-100 font-sans">
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

      <section className="flex-1 overflow-y-auto">
        <div className="p-8">
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

            {activeModule !== 'dashboard' && (
              <button
                onClick={() => onToggleModal(true)}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors shadow-sm font-medium"
              >
                <Plus size={18} className="mr-2" />
                Crear Nuevo {activeModule === 'faqs' ? 'FAQ' : 'Post'}
              </button>
            )}
          </header>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {activeModule === "faqs" && <FaqsTable data={mockFaqs} />}
            {activeModule === "blog" && <BlogTable data={mockPosts} />}
            {activeModule === "dashboard" && <DashboardPlaceholder />}
          </div>
        </div>
      </section>
      {showModal && (
        <section className="bg-black/50 fixed top-0 right-0 w-full h-dvh flex justify-center items-center z-50">
          <div className="bg-slate-800 rounded-2xl p-5 relative w-full max-w-4xl">
            <button onClick={() => onToggleModal(false)} className="absolute top-3 right-3 cursor-pointer">
              <X color="#fff"/>
            </button>
            <p className="text-center mb-5 text-2xl">Crea tu POST</p>
            <CreatePost />
          </div>
        </section>
      )}
    </main>
  );
}
