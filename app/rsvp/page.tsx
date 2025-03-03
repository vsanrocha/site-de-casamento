import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import RSVPForm from "../components/RSVPForm";
import Hero from "../components/Hero";

export default function RSVPPage() {
  return (
    <>
      <Header />
      
      <Hero 
        imagePath="/images/hero-bg.jpg"
        title="Confirme Sua Presença"
        subtitle="Ficaremos muito felizes com a sua presença no nosso grande dia"
      />
      
      {/* RSVP Form Section */}
      <Section>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-text-light">
            Por favor, preencha o formulário abaixo para confirmar sua presença no nosso casamento. 
            Pedimos que confirme até o dia <strong>18 de Setembro de 2025</strong> para que possamos 
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
            <div className="bg-white  p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-serif font-bold mb-4">Local e Horário</h3>
              <p className="text-text-light mb-2">
                <strong>Data:</strong> 18 de Outubro de 2025 (Sábado)
              </p>
              <p className="text-text-light mb-2">
                <strong>Boas-vindas:</strong> 16:00
              </p>
              <p className="text-text-light mb-2">
                <strong>Cerimônia:</strong> 16:30
              </p>
              <p className="text-text-light mb-2">
                <strong>Recepção:</strong> 18:00
              </p>
              <p className="text-text-light mb-2">
                <strong>Encerramento:</strong> 21:00
              </p>
              <p className="text-text-light mb-2">
                <strong>Local:</strong> Espaço Sngular
              </p>
              <p className="text-text-light">
                <strong>Endereço:</strong> Avenida Armando Fajardo, 3944, Cruzeiro Celeste - João Monlevade - MG
              </p>
            </div>
            
            <div className="bg-white  p-6 rounded-lg shadow-md">
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
