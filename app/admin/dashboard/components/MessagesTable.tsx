'use client';

import { useState } from 'react';
import { MessageData } from '@/lib/supabase';

interface MessagesTableProps {
  messages: MessageData[];
}

export default function MessagesTable({ messages }: MessagesTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);

  const filteredMessages = messages.filter((message) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      message.name.toLowerCase().includes(searchLower) ||
      (message.email && message.email.toLowerCase().includes(searchLower)) ||
      message.content.toLowerCase().includes(searchLower)
    );
  });

  const toggleMessageExpand = (id: string | undefined) => {
    if (!id) return;
    setExpandedMessage(expandedMessage === id ? null : id);
  };

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
            placeholder="Buscar mensagens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">Nome</th>
              <th scope="col" className="py-3 px-6">Email</th>
              <th scope="col" className="py-3 px-6">Mensagem</th>
              <th scope="col" className="py-3 px-6">Data</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <tr key={message.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                    {message.name}
                  </td>
                  <td className="py-4 px-6">{message.email || '-'}</td>
                  <td className="py-4 px-6">
                    <div 
                      className={`${expandedMessage === message.id ? '' : 'max-h-20 overflow-hidden'} cursor-pointer`}
                      onClick={() => toggleMessageExpand(message.id)}
                    >
                      <p className={expandedMessage === message.id ? '' : 'line-clamp-3'}>
                        {message.content}
                      </p>
                      {message.content.length > 100 && (
                        <button 
                          className="text-primary hover:underline mt-1 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMessageExpand(message.id);
                          }}
                        >
                          {expandedMessage === message.id ? 'Ver menos' : 'Ver mais'}
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {message.created_at ? new Date(message.created_at).toLocaleString('pt-BR', {
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
                <td colSpan={4} className="py-4 px-6 text-center">
                  {searchTerm ? 'Nenhuma mensagem encontrada para esta busca.' : 'Nenhuma mensagem recebida ainda.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Total de mensagens: {filteredMessages.length}
      </div>
    </div>
  );
}
