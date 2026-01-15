import CustomButton from '@/components/shared/CustomButton'

export default function CallToAction() {
  return (
    <section className='w-full max-w-7xl mx-auto'>
      <div className='rounded-3xl h-[70dvh] md:h-[50dvh] mt-10 relative overflow-hidden'>
        <section className='h-full w-full absolute top-0 left-0'>
          <div className='h-full flex flex-col justify-center w-full max-w-[600px] p-10 md:p-20'>
            <h3 className='text-3xl text-black'>Pagos en línea 100% seguros</h3>
            <p className='mt-7 text-black'>
              Nuestra pasarela maneja la tecnología de cifrado avanzada para proteger tus datos y garantizar transacciones seguras.
            </p>
            <ul className="list-disc list-outside pl-5 space-y-2 text-black mb-7">
              <li className='mb-0'>PCI DSS Estándar de seguridad de datos de la industria de tarjetas de pago</li>
              <li className='mb-0'>Cifrado de la información.</li>
            </ul>
            <div>
              <CustomButton
                text='Enviar'
                href='/'
              />
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
