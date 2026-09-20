'use client';

import React from 'react';
import { AdminSidebar } from '@/components/patterns/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="lg:ml-64 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
