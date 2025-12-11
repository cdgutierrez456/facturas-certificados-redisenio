import Link from "next/link"
import { ReactElement } from "react"

import { buttonBaseStyle } from "@/utils/Tokens"

interface CustomButtonProps {
  text: string
  href?: string
  icon?: ReactElement
  onClick?: () => void
  variant?: 'yellow' | 'white'
  className?: string
}

export default function CustomButton({
  href,
  text,
  icon,
  onClick,
  variant = 'white',
  className
}: CustomButtonProps) {
  const baseStyle = `${buttonBaseStyle} ${className}`

  const variants = {
    yellow: 'bg-yellow text-black hover:bg-white',
    white: 'bg-white text-black hover:bg-yellow',
  }

  return (
    <>
      {
        onClick ? (
          <button onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
            {icon ?? icon}
            { text }
          </button>
        ) : (
          <Link href={`${href}`} className={`${baseStyle} ${variants[variant]}`}>
            {icon ?? icon}
            { text }
          </Link>
        )
      }
    </>
  )
}
