import Link from "next/link";
import { FiMapPin, FiCalendar, FiClock, FiInfo, FiAlertCircle } from "react-icons/fi";
import { FaWhatsapp, FaTshirt  } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import Hero from "../components/Hero";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

export default function DetalhesPage() {
  const localAddress = "Avenida Armando Fajardo, 3944, Cruzeiro Celeste - João Monlevade - MG";
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3755.2147483647!2d-43.16414198444456!3d-19.81337998722042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6917a7cb3d0d7%3A0x4a5f9f6f9e6e5dc3!2sAvenida%20Armando%20Fajardo%2C%203944%2C%20Cruzeiro%20Celeste%20-%20Jo%C3%A3o%20Monlevade%20-%20MG!5e0!3m2!1spt-BR!2sbr!4v1675097415420!5m2!1spt-BR!2sbr";
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`Casamento Mirela e Ivan - Endereço: ${localAddress}`)}`;

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
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <FiCalendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold mb-2">Data</h3>
                    <p className="text-text-light">18 de Outubro de 2025</p>
                    <p className="text-text-light">Sábado</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <FiClock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold mb-2">Horário</h3>
                    <p className="text-text-light">16:00 - Boas-vindas</p>
                    <p className="text-text-light">16:30 - Cerimônia</p>
                    <p className="text-text-light">18:00 - Recepção</p>
                    <p className="text-text-light">21:00 - Encerramento</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <FiMapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold mb-2">Local</h3>
                    <p className="text-text-light">Espaço Sngular</p>
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
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <FiInfo className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold mb-2">Estacionamento</h3>
                    <p className="text-text-light">
                      O local possui estacionamento próprio. Favor respeitar o espaço reservado para a noiva.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - More Info */}
          <div className="space-y-8">            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <FaTshirt className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold mb-2">Dress Code</h3>
                    <p className="text-text-light text-justify">
                      Traje Social
                    </p>
                    <p className="text-text-light mt-2 text-justify">
                      Evite branco (reservado para a noiva).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <FiAlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold mb-2">Informações Adicionais</h3>
                    <ul className="text-text-light space-y-2 text-justify">
                      <li>• <strong>Fotos:</strong> Queridos convidados, pedimos gentilmente que evitem entrar no espaço da cerimônia para não interferir no trabalho do fotógrafo, que está capturando cada momento especial. Fiquem à vontade para tirar fotos dos seus lugares e postar nas redes sociais usando a hashtag #Mirela&IvanS2, compartilhando o amor com todos nós!</li>
                      <li>• <strong>Bebidas:</strong> Não é permitida a entrada de bebidas alcoólicas sob nenhuma circunstância.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
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
      <Section>
        <Card className="p-6">
          <CardContent>
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold mb-4">Confirme sua Presença</h2>
              <p className="text-text-light mb-6">
                Por favor, confirme sua presença até o dia 18 de Setembro de 2025 para que possamos 
                organizar tudo da melhor forma possível.
              </p>
              <Button asChild variant="default" className="btn btn-primary">
                <Link href="/rsvp">
                  Confirmar Presença
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>
      
      <Footer />
    </>
  );
}
