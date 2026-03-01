import React from 'react';
import Head from 'next/head';
import { CLUB_CONFIG } from '@/utils/constants';

export default function Home() {
  return (
    <>
      <Head>
        <title>{CLUB_CONFIG.name} - {CLUB_CONFIG.tagline}</title>
        <meta name="description" content={CLUB_CONFIG.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="pt-20 pb-24">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent animate-pulse">
                {CLUB_CONFIG.name}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300">{CLUB_CONFIG.tagline}</p>
              <p className="text-gray-400 max-w-2xl mx-auto">{CLUB_CONFIG.description}</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <button className="px-8 py-4 rounded-lg bg-gradient-club text-white font-bold hover:shadow-lg hover:shadow-neon-purple/50 transition-all transform hover:scale-105">
                Enter the Lounge
              </button>
              <button className="px-8 py-4 rounded-lg border-2 border-neon-cyan text-neon-cyan font-bold hover:bg-neon-cyan/10 transition-all">
                Watch Videos
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-12 max-w-2xl mx-auto">
              {[
                { label: 'Active Users', value: '10K+' },
                { label: 'Tracks', value: '500+' },
                { label: 'Videos', value: '1K+' },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-lg bg-dark-surface border border-dark-border">
                  <p className="text-2xl font-bold text-neon-purple">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section className="max-w-6xl mx-auto px-4 py-20 space-y-8">
          <h2 className="text-4xl font-bold">Featured Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group rounded-lg overflow-hidden bg-dark-surface border border-dark-border hover:border-neon-purple transition-all cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 flex items-center justify-center group-hover:from-neon-purple/40 group-hover:to-neon-cyan/40 transition-all">
                  <span className="text-4xl">🎬</span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-bold">Featured Track {i}</h3>
                  <p className="text-sm text-gray-400">By DJ Smoke Stream</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
