import Link from "next/link";
import { FiMapPin, FiCalendar, FiClock, FiInfo } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import Hero from "../components/Hero";

export default function DetalhesPage() {
  const localAddress = "R. Vereador Nozinho Caldeira, 418 - Centro, João Monlevade - MG, 35700-000";
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.594902313595!2d-43.16414198444456!3d-19.81337998722042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6917a7cb3d0d7%3A0x4a5f9f6f9e6e5dc3!2sR.%20Vereador%20Nozinho%20Caldeira%2C%20418%20-%20Centro%2C%20Jo%C3%A3o%20Monlevade%20-%20MG%2C%2035700-000!5e0!3m2!1spt-BR!2sbr!4v1675097415420!5m2!1spt-BR!2sbr";
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`Casamento Ivan e Mirela - Endereço: ${localAddress}`)}`;

  return (
    <>
      <Header />
      
      <Hero 
        imagePath="/images/hero-bg.jpg"
        title="Detalhes do Evento"
        subtitle="Todas as informações que você precisa para o nosso grande dia"
      />
      
      {/* Main Content */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <div className="space-y-8">
            <div className="bg-secondary p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <FiCalendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-2">Data</h3>
                  <p className="text-text-light">15 de Maio de 2025</p>
                  <p className="text-text-light">Quinta-feira</p>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <FiClock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-2">Horário</h3>
                  <p className="text-text-light">16:00 - Cerimônia</p>
                  <p className="text-text-light">18:00 - Recepção</p>
                  <p className="text-text-light">00:00 - Encerramento</p>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <FiMapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-2">Local</h3>
                  <p className="text-text-light">Espaço Jardim das Flores</p>
                  <p className="text-text-light">{localAddress}</p>
                  <div className="flex mt-3 space-x-3">
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      <FiMapPin className="mr-1" /> Ver no mapa
                    </a>
                    <a 
                      href={whatsappShareUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-600 hover:underline"
                    >
                      <FaWhatsapp className="mr-1" /> Compartilhar
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <FiInfo className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-2">Estacionamento</h3>
                  <p className="text-text-light">
                    O local possui estacionamento próprio com manobrista.
                  </p>
                  <p className="text-text-light mt-2">
                    Valor: R$ 30,00 por veículo (taxa única)
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - More Info */}
          <div className="space-y-8">            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <FiInfo className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-2">Dress Code</h3>
                  <p className="text-text-light">
                    Traje Social
                  </p>
                  <p className="text-text-light mt-2">
                    Sugerimos roupas em tons pastéis ou neutros. Evite branco (reservado para a noiva) e preto.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <FiInfo className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-2">Informações Adicionais</h3>
                  <ul className="text-text-light space-y-2">
                    <li>• O local é coberto, então o evento acontecerá independente das condições climáticas.</li>
                    <li>• Haverá serviço de open bar e open food durante toda a festa.</li>
                    <li>• Fotógrafos profissionais estarão presentes para registrar todos os momentos.</li>
                    <li>• Não é permitida a entrada de crianças menores de 12 anos.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Full Width Map Section */}
      <Section className="px-0 py-12">
        <div className="w-full">
          <iframe
            src={mapEmbedUrl}
            width="100%" 
            height="500" 
            style={{border:0}}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
            title="Localização do Evento"
            aria-label="Mapa mostrando a localização do evento"
          ></iframe>
        </div>
      </Section>
      
      {/* RSVP CTA */}
      <Section className="bg-secondary">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Confirme Sua Presença
          </h2>
          <p className="text-text-light max-w-2xl mx-auto mb-8">
            Por favor, confirme sua presença até o dia 15 de Abril de 2025 para que possamos 
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
