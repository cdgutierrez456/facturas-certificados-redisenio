'use client'

import { useEffect, useState } from 'react'
import CustomButton from '@/components/shared/CustomButton'

const slides = [
  {
    title: 'Todos los operadores en un solo lugar',
    subtitle: 'Claro, Tigo, Movistar, WOM y Virgin… aquí están todos',
    description: 'Paga las facturas de todas tus líneas móviles desde un solo sitio, sin moverte.',
  },
  {
    title: 'Ahorra tiempo cada mes',
    subtitle: 'Tu tiempo vale. No lo pierdas pagando de a uno.',
    description: 'Paga todas tus facturas móviles en un solo clic y olvídate del estrés.',
  },
]

export default function CallToAction() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className='w-full max-w-7xl mx-auto'>
      <div className='rounded-3xl h-[70dvh] md:h-[50dvh] mt-10 relative overflow-hidden'>
        <section className='h-full w-full absolute top-0 left-0 z-10'>
          <div className='h-full flex flex-col justify-center w-full max-w-[600px] p-10 md:p-20'>
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 h-full flex flex-col justify-center w-full max-w-[600px] p-10 md:p-20 transition-all duration-700 ease-in-out ${
                  index === current ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6 pointer-events-none'
                }`}
              >
                <h3 className='text-3xl text-black'>{slide.title}</h3>
                <p className='mt-5 text-black font-medium'>{slide.subtitle}</p>
                <p className='mt-3 text-black'>{slide.description}</p>
                <div className='mt-7'>
                  <CustomButton text='Inicia el pago' href='/' />
                </div>
              </div>
            ))}

            <div className='absolute bottom-8 left-10 md:left-20 flex items-center gap-3 z-20'>
              <button
                onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
                className='text-black/50 hover:text-black transition-colors duration-200'
                aria-label='Slide anterior'
              >
                <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
                  <polyline points='15 18 9 12 15 6' />
                </svg>
              </button>

              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === current ? 'bg-black scale-125' : 'bg-black/30'
                  }`}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}

              <button
                onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
                className='text-black/50 hover:text-black transition-colors duration-200'
                aria-label='Slide siguiente'
              >
                <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
                  <polyline points='9 18 15 12 9 6' />
                </svg>
              </button>
            </div>
          </div>
        </section>
        <section className='w-full h-full flex justify-between'>
          <div className='w-full md:w-1/2 bg-yellow'></div>
          <div className="relative hidden md:flex w-1/2 h-full">
            <div className="absolute inset-0 bg-[url('/images/blog-calltoaction-men.jpg')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-linear-to-r from-yellow to-transparent w-1/3"></div>
          </div>
        </section>
      </div>
    </section>
  )
}
