'use client';

import { useState } from 'react';
import { RSVPData } from '@/lib/supabase';
import { utils, writeFile } from 'xlsx';

interface RSVPTableProps {
  rsvps: RSVPData[];
}

export default function RSVPTable({ rsvps }: RSVPTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRSVPs = rsvps.filter((rsvp) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      rsvp.name.toLowerCase().includes(searchLower) ||
      rsvp.email.toLowerCase().includes(searchLower) ||
      rsvp.phone.toLowerCase().includes(searchLower) ||
      (rsvp.message && rsvp.message.toLowerCase().includes(searchLower))
    );
  });

  const handleDownloadXLS = () => {
    // Preparar dados para o Excel
    const worksheet = utils.json_to_sheet(
      filteredRSVPs.map((rsvp) => ({
        Nome: rsvp.name,
        Email: rsvp.email,
        Telefone: rsvp.phone,
        Acompanhantes: rsvp.guests,
        Comparecerá: rsvp.attending ? 'Sim' : 'Não',
        Mensagem: rsvp.message || '',
        'Data de Confirmação': rsvp.created_at
          ? new Date(rsvp.created_at).toLocaleString('pt-BR')
          : '',
      }))
    );

    // Ajustar largura das colunas
    const maxWidth = filteredRSVPs.reduce(
      (width, rsvp) => Math.max(width, rsvp.name.length),
      10
    );
    
    const colWidths = [
      { wch: maxWidth }, // Nome
      { wch: 30 }, // Email
      { wch: 15 }, // Telefone
      { wch: 15 }, // Acompanhantes
      { wch: 12 }, // Comparecerá
      { wch: 40 }, // Mensagem
      { wch: 20 }, // Data de Confirmação
    ];
    
    worksheet['!cols'] = colWidths;

    // Criar workbook
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Confirmações de Presença');

    // Baixar arquivo
    writeFile(workbook, 'confirmacoes_de_presenca.xlsx');
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="search"
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Buscar confirmações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button
          onClick={handleDownloadXLS}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Baixar XLS
        </button>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">Nome</th>
              <th scope="col" className="py-3 px-6">Email</th>
              <th scope="col" className="py-3 px-6">Telefone</th>
              <th scope="col" className="py-3 px-6">Acompanhantes</th>
              <th scope="col" className="py-3 px-6">Comparecerá</th>
              <th scope="col" className="py-3 px-6">Mensagem</th>
              <th scope="col" className="py-3 px-6">Data</th>
            </tr>
          </thead>
          <tbody>
            {filteredRSVPs.length > 0 ? (
              filteredRSVPs.map((rsvp) => (
                <tr key={rsvp.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                    {rsvp.name}
                  </td>
                  <td className="py-4 px-6">{rsvp.email}</td>
                  <td className="py-4 px-6">{rsvp.phone}</td>
                  <td className="py-4 px-6">{rsvp.guests}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs ${rsvp.attending ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {rsvp.attending ? 'Sim' : 'Não'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="max-w-xs truncate">{rsvp.message || '-'}</div>
                  </td>
                  <td className="py-4 px-6">
                    {rsvp.created_at ? new Date(rsvp.created_at).toLocaleString('pt-BR', {
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
                  {searchTerm ? 'Nenhuma confirmação encontrada para esta busca.' : 'Nenhuma confirmação de presença recebida ainda.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Total de confirmações: {filteredRSVPs.length}
      </div>
    </div>
  );
}
