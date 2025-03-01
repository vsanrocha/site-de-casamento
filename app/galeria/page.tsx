import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import PhotoGrid from "../components/PhotoGrid";
import Hero from "../components/Hero";

// Dados das fotos
const photos = [
  {
    id: 1,
    src: "/images/gallery-1.jpg",
    alt: "Ivan e Mirela na praia",
    width: 600,
    height: 600,
  },
  {
    id: 2,
    src: "/images/gallery-2.jpg",
    alt: "Casal em um jantar romântico",
    width: 600,
    height: 600,
  },
  {
    id: 3,
    src: "/images/gallery-3.jpg",
    alt: "Mirela sorrindo",
    width: 600,
    height: 600,
  },
  {
    id: 4,
    src: "/images/gallery-4.jpg",
    alt: "Ivan em um passeio",
    width: 600,
    height: 600,
  },
  {
    id: 5,
    src: "/images/timeline-1.jpg",
    alt: "Primeiro encontro",
    width: 600,
    height: 400,
  },
  {
    id: 6,
    src: "/images/timeline-2.jpg",
    alt: "Na festa onde tiveram o primeiro beijo",
    width: 600,
    height: 400,
  },
  {
    id: 7,
    src: "/images/timeline-3.jpg",
    alt: "Jantar de namoro",
    width: 600,
    height: 400,
  },
  {
    id: 8,
    src: "/images/timeline-4.jpg",
    alt: "Em casa",
    width: 600,
    height: 400,
  },
  {
    id: 9,
    src: "/images/timeline-5.jpg",
    alt: "Pedido de casamento em Paris",
    width: 600,
    height: 400,
  },
];

export default function GaleriaPage() {
  return (
    <>
      <Header />
      
      <Hero 
        imagePath="/images/gallery-1.jpg"
        title="Nossa Galeria"
        subtitle="Momentos especiais da nossa jornada juntos"
      />
      
      {/* Gallery Section */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-text-light mb-12">
            Aqui compartilhamos alguns dos nossos momentos favoritos juntos. Após o casamento, 
            adicionaremos mais fotos da nossa cerimônia e celebração.
          </p>
          
          <PhotoGrid photos={photos} />
        </div>
      </Section>
      
      {/* Message Section */}
      <Section className="bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Compartilhe Seus Momentos</h2>
          <p className="text-text-light mb-6">
            Durante a cerimônia e recepção, sinta-se à vontade para tirar fotos e compartilhá-las 
            usando nossa hashtag oficial. As melhores fotos serão adicionadas à nossa galeria!
          </p>
          <div className="inline-block bg-white dark:bg-gray-800 px-6 py-3 rounded-full text-primary font-bold text-xl">
            #IvanEMirela2025
          </div>
        </div>
      </Section>
      
      <Footer />
    </>
  );
}
