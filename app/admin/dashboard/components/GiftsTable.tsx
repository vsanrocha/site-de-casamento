'use client';

import { useState } from 'react';
import { GiftData } from '@/lib/supabase';

interface GiftsTableProps {
  gifts: GiftData[];
}

export default function GiftsTable({ gifts }: GiftsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGifts = gifts.filter((gift) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      gift.name.toLowerCase().includes(searchLower) ||
      (gift.email && gift.email.toLowerCase().includes(searchLower)) ||
      (gift.gift_title && gift.gift_title.toLowerCase().includes(searchLower)) ||
      (gift.message && gift.message.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="search"
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Buscar presentes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">Presente</th>
              <th scope="col" className="py-3 px-6">Valor</th>
              <th scope="col" className="py-3 px-6">Presenteado por</th>
              <th scope="col" className="py-3 px-6">Email</th>
              <th scope="col" className="py-3 px-6">Telefone</th>
              <th scope="col" className="py-3 px-6">Mensagem</th>
              <th scope="col" className="py-3 px-6">Data</th>
            </tr>
          </thead>
          <tbody>
            {filteredGifts.length > 0 ? (
              filteredGifts.map((gift) => (
                <tr key={gift.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                    {gift.gift_title || '-'}
                  </td>
                  <td className="py-4 px-6">
                    {gift.gift_price 
                      ? `R$ ${gift.gift_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` 
                      : '-'}
                  </td>
                  <td className="py-4 px-6">{gift.name}</td>
                  <td className="py-4 px-6">{gift.email || '-'}</td>
                  <td className="py-4 px-6">{gift.phone || '-'}</td>
                  <td className="py-4 px-6">
                    <div className="max-w-xs truncate">{gift.message || '-'}</div>
                  </td>
                  <td className="py-4 px-6">
                    {gift.created_at ? new Date(gift.created_at).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : '-'}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td colSpan={7} className="py-4 px-6 text-center">
                  {searchTerm ? 'Nenhum presente encontrado para esta busca.' : 'Nenhum presente escolhido ainda.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Total de presentes: {filteredGifts.length}
      </div>
    </div>
  );
}
