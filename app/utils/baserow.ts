import axios from 'axios';

// Configurações do Baserow
const BASEROW_API_URL = 'https://api.baserow.io/api';
const BASEROW_API_KEY = process.env.BASEROW_API_KEY || 'seu_api_key_aqui';

// IDs das tabelas no Baserow
export const TABLES = {
  RSVP: 1, // Substitua pelo ID real da sua tabela
  MESSAGES: 2, // Substitua pelo ID real da sua tabela
  GIFTS: 3, // Substitua pelo ID real da sua tabela
};

// Cliente Axios configurado para o Baserow
const baserowClient = axios.create({
  baseURL: BASEROW_API_URL,
  headers: {
    'Authorization': `Token ${BASEROW_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Funções para interagir com o Baserow
export const baserowAPI = {
  // Função para obter registros de uma tabela
  async getRows(tableId: number) {
    try {
      const response = await baserowClient.get(`/database/rows/table/${tableId}/`);
      return response.data.results;
    } catch (error) {
      console.error('Erro ao buscar dados do Baserow:', error);
      throw error;
    }
  },

  // Função para criar um novo registro em uma tabela
  async createRow(tableId: number, data: any) {
    try {
      const response = await baserowClient.post(`/database/rows/table/${tableId}/`, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar registro no Baserow:', error);
      throw error;
    }
  },

  // Função para atualizar um registro existente
  async updateRow(tableId: number, rowId: number, data: any) {
    try {
      const response = await baserowClient.patch(`/database/rows/table/${tableId}/${rowId}/`, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar registro no Baserow:', error);
      throw error;
    }
  },

  // Função para excluir um registro
  async deleteRow(tableId: number, rowId: number) {
    try {
      await baserowClient.delete(`/database/rows/table/${tableId}/${rowId}/`);
      return true;
    } catch (error) {
      console.error('Erro ao excluir registro no Baserow:', error);
      throw error;
    }
  },
};

// Tipos para os dados
export interface RSVPData {
  name: string;
  email: string;
  phone: string;
  guests: number;
  message?: string;
  attending: boolean;
}

export interface MessageData {
  name: string;
  message: string;
  date?: string;
}

export interface GiftData {
  id: number;
  name: string;
  price: string;
  category: string;
  reserved: boolean;
  reserved_by?: string;
  reserved_date?: string;
}
