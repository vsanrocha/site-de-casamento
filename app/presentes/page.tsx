'use client';

import { useState } from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import { FiDollarSign, FiHeart } from 'react-icons/fi';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import GiftCard from "../components/GiftCard";
import Hero from "../components/Hero";
import { Button } from '@/components/ui/button';

// Categorias de presentes
const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'kitchen', name: 'Cozinha' },
  { id: 'bedroom', name: 'Quarto' },
  { id: 'living', name: 'Sala' },
  { id: 'bathroom', name: 'Banheiro' },
  { id: 'experience', name: 'Experiências' },
];

// Lista de presentes
const gifts = [
  {
    id: "1",
    title: 'Jogo de Panelas',
    price: 450,
    image: '/images/gift-1.jpg',
    category: 'kitchen',
    description: 'Conjunto completo de panelas antiaderentes para nossa cozinha.',
    purchased: false,
  },
  {
    id: "2",
    title: 'Jogo de Cama King',
    price: 350,
    image: '/images/gift-2.jpg',
    category: 'bedroom',
    description: 'Jogo de cama king size com lençol, fronhas e edredom.',
    purchased: true,
  },
  {
    id: "3",
    title: 'Smart TV 55"',
    price: 2800,
    image: '/images/gift-3.jpg',
    category: 'living',
    description: 'Smart TV 4K para nossa sala de estar.',
    purchased: false,
  },
  {
    id: "4",
    title: 'Jogo de Toalhas',
    price: 180,
    image: '/images/gift-4.jpg',
    category: 'bathroom',
    description: 'Conjunto de toalhas macias e absorventes para o banheiro.',
    purchased: false,
  },
  {
    id: "5",
    title: 'Liquidificador',
    price: 250,
    image: '/images/gift-5.jpg',
    category: 'kitchen',
    description: 'Liquidificador de alta potência para preparar sucos e vitaminas.',
    purchased: false,
  },
  {
    id: "6",
    title: 'Jogo de Jantar',
    price: 300,
    image: '/images/gift-6.jpg',
    category: 'kitchen',
    description: 'Conjunto completo de pratos, copos e talheres para 6 pessoas.',
    purchased: false,
  },
  {
    id: "7",
    title: 'Sofá 3 Lugares',
    price: 1800,
    image: '/images/gift-7.jpg',
    category: 'living',
    description: 'Sofá confortável de 3 lugares para nossa sala de estar.',
    purchased: true,
  },
  {
    id: "8",
    title: 'Jogo de Cama Queen',
    price: 500,
    image: '/images/gift-8.jpg',
    category: 'bedroom',
    description: 'Jogo de cama queen size com lençol, fronhas e edredom de alta qualidade.',
    purchased: false,
  },
];

export default function PresentesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showPix, setShowPix] = useState(false);

  const filteredGifts = activeCategory === 'all' 
    ? gifts 
    : gifts.filter(gift => gift.category === activeCategory);

  return (
    <>
      <Header />
      
      <Hero 
        imagePath="/images/hero-bg-light.jpg"
        title="Lista de Presentes"
        subtitle="Sua presença é o nosso maior presente, mas se desejar nos presentear, aqui estão algumas sugestões"
      />
      
      {/* Intro Section */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-text-light mb-8">
            Sua presença no nosso casamento já é um presente maravilhoso! Mas se você deseja nos 
            presentear, preparamos esta lista com itens que serão muito úteis para começarmos 
            nossa vida juntos. Você também pode contribuir com qualquer valor para nossa lua de mel.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              onClick={() => setShowPix(!showPix)}
            >
              <FiDollarSign />
              Contribuir para Lua de Mel
            </Button>
          </div>
          
          {showPix && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-secondary p-6 rounded-lg mb-12"
            >
              <h3 className="text-xl font-serif font-bold mb-4">Contribua para Nossa Lua de Mel</h3>
              <p className="text-text-light mb-4">
                Se preferir, você pode contribuir com qualquer valor para nossa lua de mel. 
                Ficaremos muito gratos por sua generosidade!
              </p>
              <div className="bg-white p-4 rounded-md inline-block">
                <p className="font-bold mb-2">Pix:</p>
                <p className="font-mono">email@exemplo.com</p>
                <p className="text-sm text-text-light mt-2">Ivan Silva & Mirela Santos</p>
              </div>
            </motion.div>
          )}
        </div>
      </Section>
      
      {/* Gift List Section */}
      <Section className="bg-primary/10">
        <div className="max-w-5xl mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary text-text-on-primary'
                    : 'bg-white text-text-light hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Gift Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGifts.map((gift) => (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <GiftCard
                  id={gift.id}
                  title={gift.title}
                  price={gift.price}
                  image={gift.image}
                  description={gift.description}
                  purchased={gift.purchased}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
      
      {/* Note Section */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <FiHeart className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4">Obrigado!</h2>
          <p className="text-text-light">
            Agradecemos de coração por seu carinho e generosidade. Cada presente 
            será muito especial para nós, pois representa o amor e a amizade que 
            compartilhamos com cada um de vocês.
          </p>
        </div>
      </Section>
      
      <Footer />
    </>
  );
}
