import { NextRequest, NextResponse } from 'next/server';
import { baserowAPI, TABLES, RSVPData } from '@/app/utils/baserow';

export async function POST(request: NextRequest) {
  try {
    const data: RSVPData = await request.json();
    
    // Validação básica
    if (!data.name || !data.email || data.guests === undefined) {
      return NextResponse.json(
        { error: 'Dados incompletos. Por favor, preencha todos os campos obrigatórios.' },
        { status: 400 }
      );
    }
    
    // Formatar os dados para o Baserow
    const baserowData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      guests: data.guests,
      message: data.message || '',
      attending: data.attending,
      date: new Date().toISOString(),
    };
    
    // Enviar para o Baserow
    const result = await baserowAPI.createRow(TABLES.RSVP, baserowData);
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Erro ao processar RSVP:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao processar sua confirmação. Por favor, tente novamente.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Esta rota não deve ser acessível publicamente em produção
    // Adicione autenticação adequada antes de usar em ambiente real
    
    const results = await baserowAPI.getRows(TABLES.RSVP);
    
    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Erro ao buscar RSVPs:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao buscar as confirmações.' },
      { status: 500 }
    );
  }
}
