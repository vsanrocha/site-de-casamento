'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { FiUser } from 'react-icons/fi';
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import Hero from "../components/Hero";

interface MessageFormData {
  name: string;
  message: string;
}

interface Message {
  id: string;
  name: string;
  message?: string;
  content: string;
  created_at: string;
}

const schema = yup.object({
  name: yup.string().required('Por favor, informe seu nome'),
  message: yup.string().required('Por favor, escreva sua mensagem').min(10, 'A mensagem deve ter pelo menos 10 caracteres'),
}).required();

export default function RecadosPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/messages');
        if (response.data.success) {
          setMessages(response.data.data || []);
        }
      } catch (err) {
        console.error('Erro ao buscar recados:', err);
        setError('Não foi possível carregar os recados. Por favor, tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const onSubmit = async (data: MessageFormData) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await axios.post('/api/messages', data);
      
      if (response.data.success) {
        const newMessage = response.data.data[0];
        setMessages([newMessage, ...messages]);
        reset();
        setIsSuccess(true);
        
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      }
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
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-primary/10 rounded-full text-primary flex-shrink-0">
                          <FiUser className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-primary">{msg.name}</h3>
                          <span className="text-xs text-text-light">{formatDate(msg.created_at)}</span>
                        </div>
                      </div>
                      
                      <div className="pl-2 border-l-2 border-primary/30">
                        <p className="text-text-light italic">{msg.content || msg.message}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-text-light col-span-full">
                  <div className="bg-secondary p-8 rounded-lg">
                    <p className="mb-2">Nenhum recado enviado ainda.</p>
                    <p className="font-medium">Seja o primeiro a deixar uma mensagem para os noivos!</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Section>
      
      <Footer />
    </>
  );
}
