'use client';

import React from 'react';
import Link from 'next/link';
import { useClubStore } from '@/store/useClubStore';
import { CLUB_CONFIG } from '@/utils/constants';

export default function Navbar() {
  const { toggleSidebar, toggleDarkMode, darkMode } = useClubStore();

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-dark-surface/80 backdrop-blur-md border-b border-dark-border z-50">
      <div className="h-full px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-club flex items-center justify-center font-bold text-lg group-hover:shadow-lg group-hover:shadow-neon-purple/50 transition-all">
            🎵
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
              {CLUB_CONFIG.name}
            </h1>
            <p className="text-xs text-gray-400">{CLUB_CONFIG.tagline}</p>
          </div>
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-neon-purple transition-colors">
            Home
          </Link>
          <Link href="/videos" className="text-sm font-medium hover:text-neon-purple transition-colors">
            Videos
          </Link>
          <Link href="/dj" className="text-sm font-medium hover:text-neon-purple transition-colors">
            DJ Smoke Stream
          </Link>
          <Link href="/ugc" className="text-sm font-medium hover:text-neon-purple transition-colors">
            UGC
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-dark-border transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {/* Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-dark-border transition-colors"
            aria-label="Toggle sidebar"
          >
            ☰
          </button>

          {/* Auth Button */}
          <Link
            href="/auth/login"
            className="px-4 py-2 rounded-lg bg-gradient-club text-white font-medium hover:shadow-lg hover:shadow-neon-purple/50 transition-all"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
