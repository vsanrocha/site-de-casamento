import { NextRequest, NextResponse } from 'next/server';
import { baserowAPI, TABLES, MessageData } from '@/app/utils/baserow';

export async function POST(request: NextRequest) {
  try {
    const data: MessageData = await request.json();
    
    // Validação básica
    if (!data.name || !data.message) {
      return NextResponse.json(
        { error: 'Dados incompletos. Por favor, preencha todos os campos obrigatórios.' },
        { status: 400 }
      );
    }
    
    // Formatar os dados para o Baserow
    const baserowData = {
      name: data.name,
      message: data.message,
      date: new Date().toISOString(),
    };
    
    // Enviar para o Baserow
    const result = await baserowAPI.createRow(TABLES.MESSAGES, baserowData);
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Erro ao processar mensagem:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const results = await baserowAPI.getRows(TABLES.MESSAGES);
    
    // Ordenar mensagens por data (mais recentes primeiro)
    const sortedResults = results.sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
      return new Date(b.date as string).getTime() - new Date(a.date as string).getTime();
    });
    
    return NextResponse.json({ success: true, data: sortedResults });
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao buscar as mensagens.' },
      { status: 500 }
    );
  }
}
