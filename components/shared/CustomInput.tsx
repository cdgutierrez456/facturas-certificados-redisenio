import { Search } from 'lucide-react'

export default function CustomInput() {
  return (
    <div className="w-full max-w-[400px] h-12 flex items-center bg-white rounded-full shadow-lg px-6 py-4">
      <input
        type="text"
        placeholder="Buscar"
        className="flex-1 outline-none border-none text-[20px] font-[500] font-montserrat text-black"
      />
      <Search className="text-[#FF8A00] cursor-pointer" size={22} />
    </div>
  )
}
