import { X } from "lucide-react";

import CreatePost from "@/components/modules/blog/CreatePost";

interface ModalPostProps {
  onToggleModal: (val: boolean) => void;
  postToEdit?: any | null;
}

export default function ModalPost({ onToggleModal, postToEdit }: ModalPostProps) {

  return (
    <section className="bg-black/50 fixed top-0 right-0 w-full h-dvh flex justify-center items-center z-50">
      <div className="bg-slate-800 rounded-2xl p-5 relative w-full max-w-4xl overflow-auto max-h-[95dvh]">
        <button onClick={() => onToggleModal(false)} className="absolute top-3 right-3 cursor-pointer">
          <X color="#fff"/>
        </button>
        <p className="text-center mb-5 text-2xl bg-slate-800 fixed right-[45%] px-2 rounded-sm">Crea tu POST</p>
        <CreatePost
          onToggleModal={onToggleModal}
          postToEdit={postToEdit}
        />
      </div>
    </section>
  )
}
