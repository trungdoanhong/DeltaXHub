'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background">
      <div className="flex">
        <div className="hidden md:block w-72 fixed inset-y-0">
          <Sidebar />
        </div>
        <div className="flex-1 md:ml-72">
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
            <Header />
          </div>
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 