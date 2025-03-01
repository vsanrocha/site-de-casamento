import { NextRequest, NextResponse } from 'next/server';
import { baserowAPI, TABLES, GiftData } from '@/app/utils/baserow';

export async function GET() {
  try {
    const results = await baserowAPI.getRows(TABLES.GIFTS);
    
    // Ordenar presentes por categoria e depois por nome
    const sortedResults = results.sort((a: any, b: any) => {
      if (a.category === b.category) {
        return a.name.localeCompare(b.name);
      }
      return a.category.localeCompare(b.category);
    });
    
    return NextResponse.json({ success: true, data: sortedResults });
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
    const { giftId, name, email } = await request.json();
    
    // Validação básica
    if (!giftId || !name || !email) {
      return NextResponse.json(
        { error: 'Dados incompletos. Por favor, preencha todos os campos obrigatórios.' },
        { status: 400 }
      );
    }
    
    // Buscar o presente atual para verificar se já está reservado
    const gifts = await baserowAPI.getRows(TABLES.GIFTS);
    const gift = gifts.find((g: any) => g.id === giftId);
    
    if (!gift) {
      return NextResponse.json(
        { error: 'Presente não encontrado.' },
        { status: 404 }
      );
    }
    
    if (gift.reserved) {
      return NextResponse.json(
        { error: 'Este presente já foi reservado por outra pessoa.' },
        { status: 400 }
      );
    }
    
    // Atualizar o presente como reservado
    const updateData = {
      reserved: true,
      reserved_by: name,
      reserved_email: email,
      reserved_date: new Date().toISOString(),
    };
    
    const result = await baserowAPI.updateRow(TABLES.GIFTS, giftId, updateData);
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Erro ao reservar presente:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao reservar o presente. Por favor, tente novamente.' },
      { status: 500 }
    );
  }
}
