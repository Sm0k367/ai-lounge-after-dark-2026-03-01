'use client';

import React, { ReactNode } from 'react';
import { useClubStore } from '@/store/useClubStore';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import AudioPlayer from './AudioPlayer';
import Toaster from 'react-hot-toast';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { sidebarOpen, darkMode } = useClubStore();

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-dark-bg text-white`}>
      <Toaster position="bottom-right" />
      
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-neon-purple/10 via-dark-bg to-neon-cyan/5" />

      <Navbar />

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="hidden md:block w-64 bg-dark-surface border-r border-dark-border overflow-y-auto">
            <Sidebar />
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Audio Player */}
      <AudioPlayer />
    </div>
  );
}
