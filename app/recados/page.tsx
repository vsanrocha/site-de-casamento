'use client';

import { useState } from 'react';
import Image from "next/image";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiUser, FiMessageSquare, FiHeart } from 'react-icons/fi';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import Hero from "../components/Hero";

// Exemplo de recados
const initialMessages = [
  {
    id: 1,
    name: "Maria Silva",
    message: "Que a felicidade de vocês seja eterna! Mal posso esperar para celebrar esse dia tão especial.",
    date: "2025-02-15T14:30:00Z",
  },
  {
    id: 2,
    name: "João Oliveira",
    message: "Vocês são um exemplo de amor e companheirismo. Parabéns pelo casamento!",
    date: "2025-02-10T09:15:00Z",
  },
  {
    id: 3,
    name: "Ana e Pedro",
    message: "Desejamos a vocês todo o amor do mundo! Que essa união seja abençoada e cheia de momentos felizes.",
    date: "2025-02-05T18:45:00Z",
  },
];

interface MessageFormData {
  name: string;
  message: string;
}

const schema = yup.object({
  name: yup.string().required('Por favor, informe seu nome'),
  message: yup.string().required('Por favor, escreva sua mensagem').min(10, 'A mensagem deve ter pelo menos 10 caracteres'),
}).required();

export default function RecadosPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: MessageFormData) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      // Em um ambiente real, enviaríamos para a API
      // await axios.post('/api/messages', data);
      
      // Simulando o envio bem-sucedido
      const newMessage = {
        id: messages.length + 1,
        name: data.name,
        message: data.message,
        date: new Date().toISOString(),
      };
      
      setMessages([newMessage, ...messages]);
      reset();
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Erro ao enviar recado:', err);
      setError('Ocorreu um erro ao enviar seu recado. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  return (
    <>
      <Header />
      
      <Hero 
        imagePath="/images/hero-bg.jpg"
        title="Recados"
        subtitle="Deixe uma mensagem especial para os noivos"
      />
      
      {/* Form Section */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-8">
            Deixe seu Recado
          </h2>
          
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-8 text-center"
            >
              <p className="text-green-600 dark:text-green-300">
                Seu recado foi enviado com sucesso! Obrigado por sua mensagem.
              </p>
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="bg-secondary p-6 rounded-lg mb-12">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Seu Nome *
              </label>
              <input
                id="name"
                type="text"
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.name
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary'
                } focus:outline-none focus:ring-2 focus:ring-opacity-20 bg-white dark:bg-gray-800`}
                placeholder="Como você gostaria de ser identificado"
                {...register('name')}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Sua Mensagem *
              </label>
              <textarea
                id="message"
                rows={4}
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.message
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary'
                } focus:outline-none focus:ring-2 focus:ring-opacity-20 bg-white dark:bg-gray-800`}
                placeholder="Escreva uma mensagem especial para os noivos"
                {...register('message')}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md mb-6">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
            
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary min-w-[200px] relative"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  'Enviar Recado'
                )}
              </button>
            </div>
          </form>
          
          <h2 className="text-3xl font-serif font-bold text-center mb-8">
            Recados Recebidos
          </h2>
          
          <div className="space-y-6">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <FiUser className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold">{msg.name}</h3>
                      <span className="text-sm text-text-light">{formatDate(msg.date)}</span>
                    </div>
                    <p className="text-text-light">{msg.message}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
      
      <Footer />
    </>
  );
}
