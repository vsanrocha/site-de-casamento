import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import Timeline from "../components/Timeline";
import Hero from "../components/Hero";
import { FaQuoteLeft } from "react-icons/fa";

// Dados da timeline
const timelineEvents = [
  {
    id: 1,
    date: "Junho de 2018",
    title: "Primeiro Encontro",
    description:
      "Nos conhecemos durante uma viagem com amigos em comum para a praia. Ivan estava com seus amigos e Mirela com suas amigas. O destino nos colocou no mesmo grupo.",
    image: "/images/timeline-1.jpg",
  },
  {
    id: 2,
    date: "Setembro de 2018",
    title: "Primeiro Beijo",
    description:
      "Após alguns meses de amizade e muitas conversas, tivemos nosso primeiro beijo durante uma festa de aniversário de um amigo em comum.",
    image: "/images/timeline-2.jpg",
  },
  {
    id: 3,
    date: "Janeiro de 2019",
    title: "Namoro Oficial",
    description:
      "Ivan pediu Mirela em namoro durante um jantar romântico à luz de velas. Foi uma noite inesquecível com direito a música ao vivo.",
    image: "/images/timeline-3.jpg",
  },
  {
    id: 4,
    date: "Março de 2021",
    title: "Mudança para o Mesmo Apartamento",
    description:
      "Decidimos dar um passo importante em nosso relacionamento e começamos a morar juntos. Nossa primeira casa foi um apartamento pequeno, mas cheio de amor.",
    image: "/images/timeline-4.jpg",
  },
  {
    id: 5,
    date: "Dezembro de 2023",
    title: "Pedido de Casamento",
    description:
      "Durante uma viagem para Paris, Ivan pediu Mirela em casamento em frente à Torre Eiffel. Foi um momento mágico que jamais esqueceremos.",
    image: "/images/timeline-5.jpg",
  },
  {
    id: 6,
    date: "15 de Maio de 2025",
    title: "O Grande Dia",
    description:
      "O dia em que oficializaremos nossa união perante Deus, familiares e amigos. Estamos ansiosos para celebrar este momento com as pessoas que amamos.",
    image: "/images/timeline-6.jpg",
  },
];

export default function HistoriaPage() {
  return (
    <>
      <Header />

      <Hero
        imagePath="/images/timeline-1.jpg"
        title="Nossa História"
        subtitle="Como um simples encontro se transformou em uma história de amor"
      />

      {/* Intro Section */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">
            Como Tudo Começou
          </h2>
          <p className="text-text-light mb-4">
            Nosso amor começou de forma inesperada, como as melhores histórias
            costumam começar. Um encontro casual durante uma viagem com amigos
            em comum foi o suficiente para perceber que havia algo especial
            entre nós.
          </p>
          <p className="text-text-light mb-4">
            Ivan, sempre tímido mas determinado, demorou algumas semanas para
            tomar coragem e convidar Mirela para um café. Mirela, por sua vez,
            já havia notado o interesse e estava ansiosa pelo convite.
          </p>
          <p className="text-text-light">
            O que começou como uma amizade logo se transformou em um
            relacionamento profundo, baseado em respeito, admiração e muito
            amor. Cada momento juntos só reforçou a certeza de que éramos feitos
            um para o outro.
          </p>
        </div>
      </Section>

      {/* Timeline Section */}
      <Section
        title="Nossa Jornada"
        subtitle="Os momentos mais importantes da nossa história até aqui"
        className="bg-secondary"
      >
        <Timeline events={timelineEvents} />
      </Section>

      {/* Quote Section */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center text-primary mb-6">
            <FaQuoteLeft className="text-5xl" />
          </div>
          <p className="text-2xl font-serif italic mb-6">
            O amor não é olhar um para o outro, mas olhar juntos na mesma
            direção.
          </p>
          <p className="text-text-light">— Antoine de Saint-Exupéry</p>
        </div>
      </Section>

      {/* Final Message */}
      <Section className="bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">
            O Próximo Capítulo
          </h2>
          <p className="text-text-light mb-6">
            Agora, estamos prestes a iniciar um novo capítulo em nossas vidas. O
            casamento representa para nós não apenas uma cerimônia, mas um
            compromisso de continuar construindo nossa história juntos, dia após
            dia.
          </p>
          <p className="text-text-light">
            Estamos muito felizes em poder compartilhar este momento especial
            com as pessoas que fizeram parte da nossa jornada até aqui. Obrigado
            por fazer parte da nossa história!
          </p>
        </div>
      </Section>

      <Footer />
    </>
  );
}
