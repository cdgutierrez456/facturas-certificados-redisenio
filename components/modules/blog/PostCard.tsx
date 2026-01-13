'use client'

import Image from "next/image"

import CustomButton from "@/components/shared/CustomButton"

export interface PostCardProps {
  id: string;
  date: string;
  dateModified: string;
  descriptionImg: string;
  hideDate: string;
  htmlContent: string;
  img: string;
  introduction: string;
  title: string;
  titleH1: string;
  titleUrl: string;
}

export default function PostCard({ title, img }: PostCardProps) {
  return (
    <article className="flex flex-col h-[430px] w-[290px] justify-between pb-4">
      <div className="relative rounded-3xl overflow-hidden h-[70%]">
        <Image
          src={img}
          alt="Icono temporal"
          fill
        />
      </div>
      <p className="text-3xl text-black text-center">
        {title}
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
