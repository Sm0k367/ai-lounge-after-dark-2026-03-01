'use client';

import React from 'react';
import Link from 'next/link';
import { useClubStore } from '@/store/useClubStore';

export default function Sidebar() {
  const { playlists } = useClubStore();

  return (
    <div className="p-6 space-y-8">
      {/* Menu */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Menu</h3>
        <nav className="space-y-2">
          {[
            { label: 'Discover', href: '/discover' },
            { label: 'Trending', href: '/trending' },
            { label: 'My Playlists', href: '/playlists' },
            { label: 'Liked Tracks', href: '/liked' },
            { label: 'History', href: '/history' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-lg text-sm hover:bg-dark-border transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Playlists */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Playlists</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <Link
                key={playlist.id}
                href={`/playlists/${playlist.id}`}
                className="block px-3 py-2 rounded-lg text-sm hover:bg-dark-border transition-colors truncate"
              >
                {playlist.name}
              </Link>
            ))
          ) : (
            <p className="text-xs text-gray-500">No playlists yet</p>
          )}
        </div>
      </div>

      {/* Social */}
      <div className="space-y-2 pt-4 border-t border-dark-border">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Follow</h3>
        <div className="flex gap-2">
          {[
            { icon: '𝕏', href: 'https://twitter.com' },
            { icon: '📷', href: 'https://instagram.com' },
            { icon: '🎵', href: 'https://soundcloud.com' },
            { icon: '💬', href: 'https://discord.com' },
          ].map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-dark-border hover:bg-neon-purple/20 flex items-center justify-center transition-colors"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
