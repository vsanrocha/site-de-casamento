import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { TABLES } from '@/lib/supabase'
import DashboardTabs from './components/DashboardTabs'

export default async function AdminPage() {
  const supabase = await createClient()

  // Check if user is logged in
  const { data: { user } } = await supabase.auth.getUser()

  // If not logged in, redirect to login page
  if (!user) {
    redirect('/admin/login')
  }

  // Buscar dados de RSVP
  const { data: rsvps, error: rsvpError } = await supabase
    .from(TABLES.RSVP)
    .select('*')
    .order('created_at', { ascending: false })

  // Buscar mensagens
  const { data: messages, error: messageError } = await supabase
    .from(TABLES.MESSAGES)
    .select('*')
    .order('created_at', { ascending: false })

  // Buscar presentes
  const { data: gifts, error: giftError } = await supabase
    .from(TABLES.GIFTS)
    .select('*')
    .order('created_at', { ascending: false })

  if (rsvpError) {
    console.error('Erro ao buscar RSVPs:', rsvpError)
  }

  if (messageError) {
    console.error('Erro ao buscar mensagens:', messageError)
  }

  if (giftError) {
    console.error('Erro ao buscar presentes:', giftError)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-serif font-bold">Dashboard Administrativo</h1>
            <form action="/api/auth/signout" method="post">
              <button 
                type="submit"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                Sair
              </button>
            </form>
          </div>
          
          <p className="mb-6">Bem-vindo, {user.email}</p>
          
          <DashboardTabs 
            rsvps={rsvps || []} 
            messages={messages || []} 
            gifts={gifts || []} 
          />
        </div>
      </div>
    </div>
  )
}
