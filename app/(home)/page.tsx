import Hero from '@/components/Hero';
import FeaturesHome from '@/components/FeaturesHome';
import CardGridHome from '@/components/CardGridHome';
import BlogCarousel from '@/components/BlogCarousel';
import ScrollingBanner from '@/components/ScrollingBanner';
import CallToAction from '@/components/modules/blog/CallToAction';
import HeroSectionHome from '@/components/HeroSectionHome';

export default function Home() {
  // Datos dinámicos: los pasos
  const steps = ['Paso 1 de 3', 'Paso 2 de 3', 'Paso 3 de 3'];

  // Datos dinámicos: los logos de los operadores
  const logos = [
    { src: '/images/claro-logo.png', alt: 'Claro', bg: '#D6281D', backgroundImage: '/images/claro-selected.png', value: '14' },
    { src: '/images/movistar.png', alt: 'Movistar', bg: '#019DF4', backgroundImage: '/images/movistar-selected.png', value: '17' },
    { src: '/images/tigo.png', alt: 'Tigo', bg: '#001EB4', backgroundImage: '/images/tigo-selected.png', value: '299' },
    { src: '/images/virgin.png', alt: 'Virgin', bg: '#E10A16', backgroundImage: '/images/virgin-selected.png', value: '383' },
    { src: '/images/wom.png', alt: 'WOM', bg: '#5B2583', backgroundImage: '/images/wom-selected.png', value: '3771' },
  ];

  const bannerTexts = [
    '100% en línea',
    'Sin costos adicionales',
    'Todos los operadores en un solo sitio',
  ];

  return (
    <div>
      <Hero
        mainImage="/images/hero-bg.png"
        title="Selecciona tu operador"
        subtitle="Lorem ipsum dolor sit amet consectetur."
        operatorImages={logos}
        step={steps}
      />

      <ScrollingBanner texts={bannerTexts} />

      <FeaturesHome />

      <CardGridHome />
      <section className="w-full">
        <CallToAction />
      </section>
      <BlogCarousel />
      <HeroSectionHome />
    </div>
  );
}