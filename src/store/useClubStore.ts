import { create } from 'zustand';
import { Track, Playlist, User, FeatureFlags } from '@/types';

interface ClubStore {
  // Player State
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  queue: Track[];
  currentQueueIndex: number;

  // Playlist State
  playlists: Playlist[];
  currentPlaylist: Playlist | null;

  // User State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // UI State
  sidebarOpen: boolean;
  darkMode: boolean;
  showAR: boolean;

  // Feature Flags
  features: FeatureFlags;

  // Actions
  setCurrentTrack: (track: Track | null) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  nextTrack: () => void;
  previousTrack: () => void;

  setPlaylists: (playlists: Playlist[]) => void;
  setCurrentPlaylist: (playlist: Playlist | null) => void;

  setUser: (user: User | null) => void;
  setIsAuthenticated: (authenticated: boolean) => void;
  setIsLoading: (loading: boolean) => void;

  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  toggleAR: () => void;

  setFeatures: (features: FeatureFlags) => void;
}

export const useClubStore = create<ClubStore>((set, get) => ({
  // Initial State
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.7,
  queue: [],
  currentQueueIndex: 0,

  playlists: [],
  currentPlaylist: null,

  user: null,
  isAuthenticated: false,
  isLoading: false,

  sidebarOpen: true,
  darkMode: true,
  showAR: false,

  features: {
    ar_enabled: true,
    ugc_enabled: true,
    remix_enabled: false,
    analytics_enabled: true,
    live_streaming_enabled: false,
  },

  // Actions
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),

  addToQueue: (track) =>
    set((state) => ({
      queue: [...state.queue, track],
    })),

  removeFromQueue: (index) =>
    set((state) => ({
      queue: state.queue.filter((_, i) => i !== index),
    })),

  clearQueue: () => set({ queue: [], currentQueueIndex: 0 }),

  nextTrack: () =>
    set((state) => {
      const nextIndex = state.currentQueueIndex + 1;
      if (nextIndex < state.queue.length) {
        return {
          currentQueueIndex: nextIndex,
          currentTrack: state.queue[nextIndex],
        };
      }
      return state;
    }),

  previousTrack: () =>
    set((state) => {
      const prevIndex = state.currentQueueIndex - 1;
      if (prevIndex >= 0) {
        return {
          currentQueueIndex: prevIndex,
          currentTrack: state.queue[prevIndex],
        };
      }
      return state;
    }),

  setPlaylists: (playlists) => set({ playlists }),
  setCurrentPlaylist: (playlist) => set({ currentPlaylist: playlist }),

  setUser: (user) => set({ user }),
  setIsAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  setIsLoading: (loading) => set({ isLoading: loading }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  toggleAR: () => set((state) => ({ showAR: !state.showAR })),

  setFeatures: (features) => set({ features }),
}));
