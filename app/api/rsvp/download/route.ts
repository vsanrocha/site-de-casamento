import { NextRequest, NextResponse } from 'next/server';
import { supabase, TABLES } from '@/lib/supabase';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const supabaseClient = await createClient();
    const { data: { user } } = await supabaseClient.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Buscar todos os RSVPs
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
    
    // Retornar os dados para processamento no cliente
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Erro ao buscar RSVPs:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao buscar as confirmações.' },
      { status: 500 }
    );
  }
}
