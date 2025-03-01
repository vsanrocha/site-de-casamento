import { NextRequest, NextResponse } from 'next/server';
import { supabase, TABLES, RSVPData } from '@/lib/supabase';

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
    
    // Formatar os dados para o Supabase
    const rsvpData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      guests: data.guests,
      message: data.message || '',
      attending: data.attending,
      created_at: new Date().toISOString(),
    };
    
    // Enviar para o Supabase
    const { data: result, error } = await supabase
      .from(TABLES.RSVP)
      .insert(rsvpData)
      .select();
      
    if (error) {
      console.error('Erro ao inserir no Supabase:', error);
      return NextResponse.json(
        { error: 'Ocorreu um erro ao processar sua confirmação. Por favor, tente novamente.' },
        { status: 500 }
      );
    }
    
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
    
    const { data, error } = await supabase
      .from(TABLES.RSVP)
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Erro ao buscar no Supabase:', error);
      return NextResponse.json(
        { error: 'Ocorreu um erro ao buscar as confirmações.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Erro ao buscar RSVPs:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao buscar as confirmações.' },
      { status: 500 }
    );
  }
}
