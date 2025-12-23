'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
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
// import CreatePost from "@/components/modules/blog/CreatePost";

const CreatePost = dynamic(() => import("@/components/modules/blog/CreatePost"), {
  ssr: false,
  loading: () => <div className="text-white text-center p-10">Loading...</div>
});

// Definimos los módulos disponibles
type ModuleType = "dashboard" | "faqs" | "blog";

export default function AdminPanelComponent() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [activeModule, setActiveModule] = useState<ModuleType>("faqs");

  const onToggleModal = (show: boolean) => {
    setShowModal(show)
  }

  const closeSesion = () => {
    localStorage.clear()
    router.replace('/')
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
          <button onClick={closeSesion} className="flex items-center w-full px-4 py-2 text-sm font-medium text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors">
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
            {activeModule === "faqs" && <FaqsTable />}
            {activeModule === "blog" && <BlogTable />}
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
