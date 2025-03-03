'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RSVPFormData {
  name: string;
  email: string;
  phone: string;
  guests: number;
  message?: string;
  attending: boolean;
}

const schema = yup.object({
  name: yup.string().required('Por favor, informe seu nome'),
  email: yup.string().email('Email inválido').required('Por favor, informe seu email'),
  phone: yup.string().required('Por favor, informe seu telefone'),
  guests: yup.number()
    .typeError('Deve ser um número')
    .min(0, 'Não pode ser negativo')
    .max(10, 'Máximo de 10 acompanhantes')
    .required('Por favor, informe o número de acompanhantes'),
  message: yup.string(),
  attending: yup.boolean().required(),
}).required();

export default function RSVPForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RSVPFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      guests: 0,
      attending: true,
    },
  });

  const attending = watch('attending');

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      // Enviar dados para a API
      await axios.post('/api/rsvp', data);
      
      // Resetar formulário e mostrar mensagem de sucesso
      reset();
      setIsSuccess(true);
      
      // Esconder mensagem de sucesso após 5 segundos
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Erro ao enviar RSVP:', err);
      setError('Ocorreu um erro ao enviar sua confirmação. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-green-700 dark:text-green-400">
                Confirmação Enviada!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-600 dark:text-green-300">
                Obrigado por confirmar sua presença. Estamos ansiosos para celebrar com você!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="flex-1">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Nome Completo *
              </label>
              <input
                id="name"
                type="text"
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.name
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary'
                } focus:outline-none focus:ring-2 focus:ring-opacity-20 bg-white `}
                placeholder="Seu nome"
                {...register('name')}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="flex-1">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email *
              </label>
              <input
                id="email"
                type="email"
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.email
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary'
                } focus:outline-none focus:ring-2 focus:ring-opacity-20 bg-white `}
                placeholder="seu.email@exemplo.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="flex-1">
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Telefone *
              </label>
              <input
                id="phone"
                type="tel"
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.phone
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary'
                } focus:outline-none focus:ring-2 focus:ring-opacity-20 bg-white `}
                placeholder="(00) 00000-0000"
                {...register('phone')}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="flex-1">
              <fieldset>
                <legend className="block text-sm font-medium mb-1">Você irá comparecer? *</legend>
                <div className="flex space-x-4 mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-primary focus:ring-primary"
                      value="true"
                      {...register('attending')}
                      checked={attending === true}
                      onChange={() => {}}
                    />
                    <span className="ml-2">Sim</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-primary focus:ring-primary"
                      value="false"
                      {...register('attending')}
                      checked={attending === false}
                      onChange={() => {}}
                    />
                    <span className="ml-2">Não</span>
                  </label>
                </div>
              </fieldset>
            </div>
          </div>

          {attending && (
            <div>
              <label htmlFor="guests" className="block text-sm font-medium mb-1">
                Número de acompanhantes *
              </label>
              <input
                id="guests"
                type="number"
                min="0"
                max="10"
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.guests
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary'
                } focus:outline-none focus:ring-2 focus:ring-opacity-20 bg-white `}
                {...register('guests')}
              />
              {errors.guests && (
                <p className="mt-1 text-sm text-red-500">{errors.guests.message}</p>
              )}
              <p className="mt-1 text-sm text-text-light">
                Não inclua você mesmo na contagem de acompanhantes.
              </p>
            </div>
          )}

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Mensagem (opcional)
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary focus:outline-none focus:ring-2 focus:ring-opacity-20 bg-white "
              placeholder="Alguma observação especial?"
              {...register('message')}
            />
          </div>

          {error && (
            <Card className="border-red-200 dark:border-red-800">
              <CardContent className="pt-6">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </CardContent>
            </Card>
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
                'Confirmar Presença'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
