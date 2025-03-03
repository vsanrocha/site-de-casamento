import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import RSVPForm from "../components/RSVPForm";
import Hero from "../components/Hero";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

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
        
        <Card>
          <CardHeader>
            <h2 className="font-serif text-2xl font-bold mb-4">Confirme sua Presença</h2>
          </CardHeader>
          <CardContent>
            <RSVPForm />
          </CardContent>
        </Card>
      </Section>
      
      {/* Info Section */}
      <Section className="bg-secondary">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <h2 className="font-serif text-2xl font-bold mb-4">Informações Importantes</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Data Limite</h3>
                  <p className="text-text-light">
                    Por favor, confirme sua presença até 18 de Setembro de 2025
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Local e Horário</h3>
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
                    <strong>Local:</strong> Espaço Singular
                  </p>
                  <p className="text-text-light">
                    <strong>Endereço:</strong> Avenida Armando Fajardo, 3944, Cruzeiro Celeste - João Monlevade - MG
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Traje</h3>
                  <p className="text-text-light">
                    Social
                  </p>
                  <p className="text-text-light mb-4">
                    Sugerimos roupas em tons pastéis ou neutros. Evite branco (reservado para a noiva) e preto.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Observações</h3>
                  <ul className="text-text-light list-disc list-inside">
                    <li>O local é coberto, então o evento acontecerá independente das condições climáticas.</li>
                    <li>Não é permitida a entrada de crianças menores de 12 anos.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
      
      <Footer />
    </>
  );
}
