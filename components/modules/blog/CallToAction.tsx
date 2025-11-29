import CustomButton from '@/components/shared/CustomButton'

export default function CallToAction() {
  return (
    <section className='w-full max-w-7xl mx-auto'>
      <div className='rounded-3xl h-[50dvh] mt-10 relative overflow-hidden'>
        <section className='h-full w-full absolute top-0 left-0'>
          <div className='h-full flex flex-col justify-center w-full max-w-[600px] p-20'>
            <h3 className='text-3xl text-black'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, inventore.</h3>
            <p className='my-9 text-black'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos voluptatibus similique consequuntur, placeat deserunt repellendus culpa odit rerum nam tempora itaque modi quae autem odio dicta amet optio dolore fuga?
            </p>
            <div>
              <CustomButton
                text='Enviar'
                href='/'
              />
            </div>
          </div>
        </section>
        <section className='w-full h-full flex justify-between'>
          <div className='w-1/2 bg-yellow'></div>
          <div className="relative w-1/2 h-full">
            <div className="absolute inset-0 bg-[url('/images/blog-calltoaction-men.jpg')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-linear-to-r from-yellow to-transparent w-1/3"></div>
          </div>
        </section>
      </div>
    </section>
  )
}
