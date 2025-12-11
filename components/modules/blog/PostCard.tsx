import Image from "next/image"

import CustomButton from "@/components/shared/CustomButton"

export default function PostCard() {
  return (
    <article className="flex flex-col h-[430px] w-[290px] justify-between pb-4">
      <div className="relative rounded-3xl overflow-hidden h-[70%]">
        <Image
          src="/images/claro-logo.png"
          alt="Icono temporal"
          fill
        />
      </div>
      <p className="text-3xl text-black text-center">
        Lorem ipsum
      </p>
      <div className="flex items-center justify-center">
        <CustomButton
          text='Ver más...'
          variant="white"
        />
      </div>
    </article>
  )
}
