'use client';

import { AuthProvider } from '@/lib/auth';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('Renderizando o layout do admin');
  
  useEffect(() => {
    console.log('AdminLayout montado');
  }, []);
  
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
