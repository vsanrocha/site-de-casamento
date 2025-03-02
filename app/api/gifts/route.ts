import { NextRequest, NextResponse } from 'next/server';
import { supabase, TABLES, GiftData } from '@/lib/supabase';

export async function GET() {
  try {
    // Esta rota não deve ser acessível publicamente em produção
    // Adicione autenticação adequada antes de usar em ambiente real
    
    const { data, error } = await supabase
      .from(TABLES.GIFTS)
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Erro ao buscar no Supabase:', error);
      return NextResponse.json(
        { error: 'Ocorreu um erro ao buscar os presentes.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Erro ao buscar presentes:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao buscar a lista de presentes.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validação básica
    if (!data.gift_id || !data.name || !data.email) {
      return NextResponse.json(
        { error: 'Dados incompletos. Por favor, preencha todos os campos obrigatórios.' },
        { status: 400 }
      );
    }
    
    // Formatar os dados para o Supabase
    const giftData = {
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      gift_id: data.gift_id,
      gift_title: data.gift_title,
      gift_price: data.gift_price,
      message: data.message || '',
      created_at: new Date().toISOString(),
    };
    
    // Enviar para o Supabase
    const { data: result, error } = await supabase
      .from(TABLES.GIFTS)
      .insert(giftData)
      .select();
      
    if (error) {
      console.error('Erro ao inserir no Supabase:', error);
      return NextResponse.json(
        { error: 'Ocorreu um erro ao processar seu presente. Por favor, tente novamente.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Erro ao processar presente:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao reservar o presente. Por favor, tente novamente.' },
      { status: 500 }
    );
  }
}
