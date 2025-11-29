import Hero from '@/components/Hero';
import FeaturesHome from '@/components/FeaturesHome';
import CardGridHome from '@/components/CardGridHome';
import Section3 from '@/components/Section3';
import ScrollingBanner from '@/components/ScrollingBanner';
import CallToAction from '@/components/modules/blog/CallToAction';

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
    'Facil de pagar',
    'Paga en 3 pasos',
    'Al alcance de tu mano',
    'Paga en 3 pasos'
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

      <FeaturesHome />

      <CardGridHome />
      <section className="w-full">
        <CallToAction />
      </section>
      <Section3 title="Conce algunos de lo temas de nuestro Blog" />

    </div>
  );
}