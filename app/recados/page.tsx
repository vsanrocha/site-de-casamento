'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import Hero from "../components/Hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

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
          <Card className="max-w-xl mx-auto">
            <CardHeader>
              <h2 className="font-serif text-2xl font-bold">Deixe seu Recado</h2>
              <p className="text-text-light">
                Compartilhe seus votos e desejos para os noivos
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Seu Nome *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Como você gostaria de ser identificado"
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Sua Mensagem *
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Escreva uma mensagem especial para os noivos"
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>
                
                {error && (
                  <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
                    {error}
                  </div>
                )}
                
                <div className="text-center">
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Recado'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
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
                messages.map((message) => (
                  <Card key={message.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <h3 className="font-serif text-xl font-bold">{message.name}</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-text-light">{message.message}</p>
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm text-text-light">
                        {new Date(message.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </CardFooter>
                  </Card>
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
