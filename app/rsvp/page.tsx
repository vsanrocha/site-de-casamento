import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import RSVPForm from "../components/RSVPForm";

export default function RSVPPage() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Ivan e Mirela"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Confirme Sua Presença
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Ficaremos muito felizes com a sua presença no nosso grande dia
          </p>
        </div>
      </section>
      
      {/* RSVP Form Section */}
      <Section>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-text-light">
            Por favor, preencha o formulário abaixo para confirmar sua presença no nosso casamento. 
            Pedimos que confirme até o dia <strong>15 de Abril de 2025</strong> para que possamos 
            organizar tudo da melhor forma possível.
          </p>
        </div>
        
        <RSVPForm />
      </Section>
      
      {/* Info Section */}
      <Section className="bg-secondary">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-8">
            Informações Importantes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-serif font-bold mb-4">Local e Horário</h3>
              <p className="text-text-light mb-2">
                <strong>Data:</strong> 15 de Maio de 2025 (Quinta-feira)
              </p>
              <p className="text-text-light mb-2">
                <strong>Cerimônia:</strong> 16:00
              </p>
              <p className="text-text-light mb-2">
                <strong>Recepção:</strong> 18:00
              </p>
              <p className="text-text-light mb-2">
                <strong>Local:</strong> Espaço Jardim das Flores
              </p>
              <p className="text-text-light">
                <strong>Endereço:</strong> Rua das Flores, 123 - São Paulo, SP
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-serif font-bold mb-4">Dress Code e Observações</h3>
              <p className="text-text-light mb-2">
                <strong>Traje:</strong> Social
              </p>
              <p className="text-text-light mb-4">
                Sugerimos roupas em tons pastéis ou neutros. Evite branco (reservado para a noiva) e preto.
              </p>
              <p className="text-text-light mb-2">
                <strong>Observações:</strong>
              </p>
              <ul className="text-text-light list-disc list-inside">
                <li>O local é coberto, então o evento acontecerá independente das condições climáticas.</li>
                <li>Não é permitida a entrada de crianças menores de 12 anos.</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
      
      <Footer />
    </>
  );
}
