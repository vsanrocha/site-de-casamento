import { NextRequest, NextResponse } from 'next/server';
import { supabase, TABLES, MessageData } from '@/lib/supabase';

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
    
    // Formatar os dados para o Supabase
    const messageData = {
      name: data.name,
      content: data.message,
      created_at: new Date().toISOString(),
    };
    
    // Enviar para o Supabase
    const { data: result, error } = await supabase
      .from(TABLES.MESSAGES)
      .insert(messageData)
      .select();
      
    if (error) {
      console.error('Erro ao inserir no Supabase:', error);
      return NextResponse.json(
        { error: 'Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.' },
        { status: 500 }
      );
    }
    
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
    // Esta rota não deve ser acessível publicamente em produção
    // Adicione autenticação adequada antes de usar em ambiente real
    
    const { data, error } = await supabase
      .from(TABLES.MESSAGES)
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Erro ao buscar no Supabase:', error);
      return NextResponse.json(
        { error: 'Ocorreu um erro ao buscar as mensagens.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao buscar as mensagens.' },
      { status: 500 }
    );
  }
}
