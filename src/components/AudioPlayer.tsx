'use client';

import React, { useEffect } from 'react';
import { useClubStore } from '@/store/useClubStore';
import { useAudio } from '@/hooks/useAudio';

export default function AudioPlayer() {
  const { currentTrack, isPlaying, setIsPlaying, setCurrentTime, setDuration, volume } =
    useClubStore();

  const { play, pause, seek, setVolume } = useAudio(currentTrack?.audio_url || null, {
    onPlay: () => setIsPlaying(true),
    onPause: () => setIsPlaying(false),
    onEnd: () => setIsPlaying(false),
  });

  useEffect(() => {
    if (isPlaying) {
      play();
    } else {
      pause();
    }
  }, [isPlaying, play, pause]);

  useEffect(() => {
    setVolume(volume);
  }, [volume, setVolume]);

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-dark-surface/95 backdrop-blur-md border-t border-dark-border px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold truncate">{currentTrack.title}</h3>
          <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-gradient-club flex items-center justify-center hover:shadow-lg hover:shadow-neon-purple/50 transition-all"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <span className="text-xs">🔊</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={(e) => setVolume(parseFloat(e.target.value) / 100)}
              className="w-20 h-1 bg-dark-border rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
