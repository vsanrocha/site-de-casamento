import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiCalendar, FiClock } from "react-icons/fi";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Section from "./components/Section";
import Countdown from "./components/Countdown";

export default function Home() {
  // Data do casamento: 18 de Outubro de 2025
  const weddingDate = new Date('2025-10-18T16:00:00-03:00');

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg-light.jpg"
            alt="Mirela e Ivan"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/10" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 text-primary">
            Mirela & Ivan
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-foreground">18 de Outubro de 2025</p>
          <Link href="/rsvp" className="btn btn-primary">
            Confirmar Presença
          </Link>
        </div>
      </section>
      
      {/* Countdown Section */}
      <Section
        title="Contagem Regressiva"
        subtitle="Estamos ansiosos para celebrar nosso dia especial com você"
        background="white"
      >
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <Countdown targetDate={weddingDate} />
        </div>
      </Section>
      
      {/* Quick Info Section */}
      <Section background="primary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-4">
              <FiCalendar className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">Data</h3>
            <p className="text-text-light">18 de Outubro de 2025</p>
            <p className="text-text-light">Sábado</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-4">
              <FiClock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">Horário</h3>
            <p className="text-text-light">Boas-vindas: 16:00</p>
            <p className="text-text-light">Cerimônia: 16:30</p>
            <p className="text-text-light">Recepção: 18:00</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-4">
              <FiMapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">Local</h3>
            <p className="text-text-light">Espaço Sngular</p>
            <p className="text-text-light">João Monlevade, MG</p>
          </div>
        </div>
      </Section>
      
      {/* Our Story Preview */}
      <Section
        title="Nossa História"
        subtitle="Conheça um pouco sobre nossa jornada até aqui"
        background="white"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <p className="text-text-light mb-6">
              Nos conhecemos em 2018 durante uma viagem de amigos em comum. O que começou como uma amizade 
              rapidamente se transformou em algo mais. Após 5 anos juntos, decidimos dar o próximo passo 
              e celebrar nosso amor com as pessoas mais importantes em nossas vidas.
            </p>
            <Link href="/historia" className="btn btn-outline">
              Conheça Nossa História Completa
            </Link>
          </div>
          
          <div className="flex-1 relative h-80 w-full rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/timeline-3.jpg"
              alt="Mirela e Ivan"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Section>
      
      {/* Gallery Preview */}
      <Section
        title="Galeria"
        subtitle="Momentos especiais que compartilhamos"
        background="primary"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="aspect-square relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
              <Image
                src={`/images/gallery-${num}.jpg`}
                alt={`Foto ${num}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link href="/galeria" className="btn btn-outline">
            Ver Todas as Fotos
          </Link>
        </div>
      </Section>
      
      {/* RSVP CTA */}
      <Section
        title="Confirme Sua Presença"
        subtitle="Ficaremos muito felizes com a sua presença nesse dia tão especial para nós"
        background="white"
      >
        <div className="text-center bg-white p-8 rounded-lg shadow-sm max-w-2xl mx-auto">
          <p className="text-text-light mb-8">
            Por favor, confirme sua presença até o dia 18 de Setembro de 2025 para que possamos 
            organizar tudo da melhor forma possível.
          </p>
          <Link href="/rsvp" className="btn btn-primary">
            Confirmar Presença
          </Link>
        </div>
      </Section>
      
      <Footer />
    </>
  );
}
