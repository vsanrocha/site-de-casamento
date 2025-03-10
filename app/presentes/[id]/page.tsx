'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FiCheck } from 'react-icons/fi';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Section from '../../components/Section';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Lista de presentes (mesma do arquivo da página principal)
const gifts = [
  {
    id: "1",
    title: 'Jogo de Panelas',
    price: 450,
    image: '/images/gift-1.jpg',
    category: 'kitchen',
    description: 'Conjunto completo de panelas antiaderentes para nossa cozinha. Inclui panelas de diferentes tamanhos, frigideiras e uma panela de pressão, tudo com revestimento antiaderente de alta qualidade e cabos ergonômicos.',
    purchased: false,
  },
  {
    id: "2",
    title: 'Jogo de Cama King',
    price: 350,
    image: '/images/gift-2.jpg',
    category: 'bedroom',
    description: 'Jogo de cama king size com lençol, fronhas e edredom. Confeccionado em algodão egípcio de alta qualidade, proporcionando conforto e durabilidade. Ideal para noites de sono tranquilas.',
    purchased: true,
  },
  {
    id: "3",
    title: 'Smart TV 55"',
    price: 2800,
    image: '/images/gift-3.jpg',
    category: 'living',
    description: 'Smart TV 4K para nossa sala de estar. Com tela de alta resolução, sistema de som imersivo e acesso a diversos aplicativos de streaming. Perfeita para nossas noites de cinema em casa.',
    purchased: false,
  },
  {
    id: "4",
    title: 'Jogo de Toalhas',
    price: 180,
    image: '/images/gift-4.jpg',
    category: 'bathroom',
    description: 'Conjunto de toalhas macias e absorventes para o banheiro. Inclui toalhas de banho, rosto e piso, todas em algodão egípcio de alta gramatura, proporcionando maciez e durabilidade.',
    purchased: false,
  },
  {
    id: "5",
    title: 'Liquidificador',
    price: 250,
    image: '/images/gift-5.jpg',
    category: 'kitchen',
    description: 'Liquidificador de alta potência para preparar sucos e vitaminas. Com motor potente, lâminas de aço inoxidável e diversas velocidades, é perfeito para o preparo de bebidas, sopas e molhos.',
    purchased: false,
  },
  {
    id: "6",
    title: 'Jogo de Jantar',
    price: 300,
    image: '/images/gift-6.jpg',
    category: 'kitchen',
    description: 'Conjunto completo de pratos, copos e talheres para 6 pessoas. Design moderno e elegante, ideal para receber amigos e familiares em jantares especiais em nossa nova casa.',
    purchased: false,
  },
  {
    id: "7",
    title: 'Sofá 3 Lugares',
    price: 1800,
    image: '/images/gift-7.jpg',
    category: 'living',
    description: 'Sofá confortável de 3 lugares para nossa sala de estar. Com design moderno, estofamento de alta qualidade e estrutura resistente, será o centro de conforto da nossa sala.',
    purchased: true,
  },
  {
    id: "8",
    title: 'Jogo de Cama Queen',
    price: 500,
    image: '/images/gift-8.jpg',
    category: 'bedroom',
    description: 'Jogo de cama queen size com lençol, fronhas e edredom de alta qualidade. Confeccionado com tecidos premium, proporcionando conforto e elegância para o quarto de hóspedes.',
    purchased: false,
  },
];

export default function GiftDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const giftId = params.id as string;
  const gift = gifts.find(g => g.id === giftId);

  if (!gift) {
    return (
      <>
        <Header />
        <Section>
          <div className="text-center">
            <h2 className="text-2xl font-serif font-bold mb-4">Presente não encontrado</h2>
            <p className="text-text-light mb-6">O presente que você está procurando não está disponível.</p>
            <Button asChild variant="default" className="btn btn-primary">
              <Link href="/presentes">
                Voltar para Lista de Presentes
              </Link>
            </Button>
          </div>
        </Section>
        <Footer />
      </>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulação de envio para API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Redirecionar após 3 segundos
      setTimeout(() => {
        router.push('/presentes');
      }, 3000);
    }, 1500);
  };

  if (gift.purchased) {
    return (
      <>
        <Header />
        <Section>
          <Button asChild variant="link" className="inline-flex items-center text-primary mb-6">
            <Link href="/presentes">
              ← Voltar para lista de presentes
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={gift.image}
                  alt={gift.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="bg-primary text-text-on-primary px-6 py-3 rounded-full flex items-center text-lg">
                    <FiCheck className="mr-2" />
                    Presente já adquirido
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h1 className="text-3xl font-serif font-bold mb-2">{gift.title}</h1>
              <p className="text-primary text-xl font-bold mb-4">
                R$ {gift.price.toLocaleString('pt-BR')}
              </p>
              <p className="text-text-light mb-6">{gift.description}</p>
              
              <div className="bg-primary/10 p-6 rounded-lg">
                <h3 className="text-xl font-serif font-bold mb-3">Obrigado!</h3>
                <p>Este presente já foi adquirido por um dos nossos convidados.</p>
                <Button asChild variant="default" className="btn btn-primary mt-4 inline-block">
                  <Link href="/presentes">
                    Ver Outros Presentes
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Section>
        <Button asChild variant="link" className="inline-flex items-center text-primary mb-6">
          <Link href="/presentes">
            ← Voltar para lista de presentes
          </Link>
        </Button>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={gift.image}
                alt={gift.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h1 className="text-3xl font-serif font-bold mb-2">{gift.title}</h1>
            <p className="text-primary text-xl font-bold mb-4">
              R$ {gift.price.toLocaleString('pt-BR')}
            </p>
            <p className="text-text-light mb-6">{gift.description}</p>
            
            {isSuccess ? (
              <div className="bg-primary/10 p-6 rounded-lg">
                <div className="flex items-center text-primary mb-3">
                  <FiCheck className="mr-2 w-5 h-5" />
                  <h3 className="text-xl font-serif font-bold">Obrigado pelo seu presente!</h3>
                </div>
                <p className="mb-3">Seu presente foi registrado com sucesso. Agradecemos imensamente por sua generosidade!</p>
                <p className="text-sm">Você será redirecionado em alguns segundos...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-primary/10 p-6 rounded-lg">
                <h3 className="text-xl font-serif font-bold mb-4">Presentear</h3>
                
                <div className="mb-4">
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <Input
                    type="email"
                    placeholder="Seu email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <Textarea
                    placeholder="Sua mensagem (opcional)"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Enviando...' : 'Confirmar Presente'}
                </Button>
                
                <p className="text-xs text-text-light mt-4 text-center">
                  Ao confirmar, você será redirecionado para finalizar o pagamento.
                </p>
              </form>
            )}
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
}
