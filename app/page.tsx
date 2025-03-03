import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiCalendar, FiClock } from "react-icons/fi";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Section from "./components/Section";
import Countdown from "./components/Countdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Home() {
  // Data do casamento: 18 de Outubro de 2025
  const weddingDate = new Date("2025-10-18T16:00:00-03:00");

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
          <p className="text-xl md:text-2xl mb-8 text-foreground">
            18 de Outubro de 2025
          </p>
          <Button asChild variant="default" className="btn btn-primary">
            <Link href="/rsvp">Confirmar Presença</Link>
          </Button>
        </div>
      </section>

      {/* Countdown Section */}
      <Section
        title="Contagem Regressiva"
        subtitle="Estamos ansiosos para celebrar nosso dia especial com você"
        background="white"
      >
        <Countdown targetDate={weddingDate} />
      </Section>

      {/* Quick Info Section */}
      <Section background="primary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6">
            <CardHeader className="flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-4">
                <FiCalendar className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">Data</h3>
            </CardHeader>
            <CardContent>
              <p className="text-text-light">18 de Outubro de 2025</p>
              <p className="text-text-light">Sábado</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardHeader className="flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-4">
                <FiClock className="w-8 h-8" />
              </div>

              <h3 className="font-serif text-xl font-bold mb-2">Horário</h3>
            </CardHeader>
            <CardContent>
              <p className="text-text-light">Boas-vindas: 16:00</p>
              <p className="text-text-light">Cerimônia: 16:30</p>
              <p className="text-text-light">Recepção: 18:00</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardHeader className="flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-4">
                <FiMapPin className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">Local</h3>
            </CardHeader>
            <CardContent>
              <p className="text-text-light">Espaço Singular</p>
              <p className="text-text-light">João Monlevade, MG</p>
            </CardContent>
          </Card>
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
              Nos conhecemos em 2018 durante uma viagem de amigos em comum. O
              que começou como uma amizade rapidamente se transformou em algo
              mais. Após 5 anos juntos, decidimos dar o próximo passo e celebrar
              nosso amor com as pessoas mais importantes em nossas vidas.
            </p>
            <Button asChild variant="outline" className="btn btn-outline">
              <Link href="/historia">Nossa História</Link>
            </Button>
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
            <div
              key={num}
              className="aspect-square relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
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
          <Button asChild variant="outline" className="btn btn-outline">
            <Link href="/galeria">Ver Mais Fotos</Link>
          </Button>
        </div>
      </Section>

      {/* RSVP CTA */}
      <Section
        title="Confirme Sua Presença"
        subtitle="Ficaremos muito felizes com a sua presença nesse dia tão especial para nós"
        background="white"
        className="text-center p-8 max-w-2xl mx-auto"
      >
        <Button asChild variant="default" className="btn btn-primary">
          <Link href="/rsvp">Confirmar Presença</Link>
        </Button>
      </Section>

      <Footer />
    </>
  );
}
