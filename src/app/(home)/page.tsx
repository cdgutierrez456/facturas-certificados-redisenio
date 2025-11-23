import Hero from 'app/components/Hero';
import Features from 'app/components/Features';
import Section1 from 'app/components/Section1';
import Section2 from 'app/components/Section2';
import Section3 from 'app/components/Section3';
import ScrollingBanner from 'app/components/ScrollingBanner';

export default function Home() {
  // Datos dinámicos: los pasos
  const steps = ['Paso 1 de 3', 'Paso 2 de 3', 'Paso 3 de 3'];

  // Datos dinámicos: los logos de los operadores
  const logos = [
    { src: '/images/claro-logo.png', alt: 'Claro', bg: '#D6281D', backgroundImage: '/images/claro-selected.png' },
    { src: '/images/tigo.png', alt: 'Tigo', bg: '#001EB4', backgroundImage: '/images/tigo-selected.png' },
    { src: '/images/movistar.png', alt: 'Movistar', bg: '#019DF4', backgroundImage: '/images/movistar-selected.png' },
    { src: '/images/wom.png', alt: 'WOM', bg: '#5B2583', backgroundImage: '/images/wom-selected.png' },
    { src: '/images/virgin.png', alt: 'Virgin', bg: '#E10A16', backgroundImage: '/images/virgin-selected.png' },
  ];

  const bannerTexts = [
    'Texto 1 que se mueve',
    'Segundo mensaje',
    'Tercer texto aquí',
    'Cuarto mensaje'
  ];

  const features = [
    { number: 1, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet consectetur. Turpis eu ultricies odio sed. Justo at quam ornare' },
    { number: 2, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet consectetur. Turpis eu ultricies odio sed. Justo at quam ornare' },
    { number: 3, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet consectetur. Turpis eu ultricies odio sed. Justo at quam ornare' },
  ];

  return (
    <div>
      {/* Componente Hero con props dinámicos */}
      <Hero
        mainImage="/images/hero-bg.png" // Imagen principal de fondo
        title="Selecciona tu operador"   // Título
        subtitle="Lorem ipsum dolor sit amet consectetur."  // Subtítulo
        operatorImages={logos}  // Imágenes de los operadores (con logo y color de fondo)
        step={steps}  // Pasos (ej: "Paso 1 de 3")
      />

      <ScrollingBanner texts={bannerTexts} />

      <Features
        backgroundColor="#FFFFFF"
        title="Selecciona tu operador"
        subtitle="Lorem ipsum dolor sit amet consectetur."
        imageSrc="/images/rectangle_9061.png" // Aquí puedes poner cualquier imagen
        steps={features}
      />

      <Section1
        backgroundColor="#F6F6F6"
        title="Lorem ipsum dolor sit amet consectetur Leo mi nullam"
        cards={[
          {
            iconSrc: '/images/telefono-movil.png',        // coloca tus imágenes en /public/images
            title: 'Lorem ipsum',
            description: 'Lorem ipsum dolor sit amet consectetur. Turpis eu ultricies odio sed.',
          },
          {
            iconSrc: '/images/telefono-movil.png',
            title: 'Lorem ipsum',
            description: 'Lorem ipsum dolor sit amet consectetur. Turpis eu ultricies odio sed.',
          },
          {
            iconSrc: '/images/telefono-movil.png',
            title: 'Lorem ipsum',
            description: 'Lorem ipsum dolor sit amet consectetur. Turpis eu ultricies odio sed.',
          },
          {
            iconSrc: '/images/telefono-movil.png',
            title: 'Lorem ipsum',
            description: 'Lorem ipsum dolor sit amet consectetur. Turpis eu ultricies odio sed.',
          },
        ]}
      />

      <Section2
        backgroundColor="#fff"
        title="Lorem ipsum dolor sit amet consectetur Leo mi nullam"
        cards={[
          {
            iconSrc: '/images/telefono-movil.png',        // coloca tus imágenes en /public/images
            title: 'Lorem ipsum',
            description: 'Lorem ipsum dolor sit amet consectetur. Turpis eu ultricies odio sed.',
          },
          {
            iconSrc: '/images/telefono-movil.png',
            title: 'Lorem ipsum',
            description: 'Lorem ipsum dolor sit amet consectetur. Turpis eu ultricies odio sed.',
          },
          {
            iconSrc: '/images/telefono-movil.png',
            title: 'Lorem ipsum',
            description: 'Lorem ipsum dolor sit amet consectetur. Turpis eu ultricies odio sed.',
          },
          {
            iconSrc: '/images/telefono-movil.png',
            title: 'Lorem ipsum',
            description: 'Lorem ipsum dolor sit amet consectetur. Turpis eu ultricies odio sed.',
          },
        ]}
      />
      <Section3 title="Conce algunos de lo temas de nuestro Blog" />

    </div>
  );
}