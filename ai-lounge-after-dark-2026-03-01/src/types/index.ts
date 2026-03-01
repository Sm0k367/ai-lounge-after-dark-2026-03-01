// Club & DJ Types
export interface DJ {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  followers: number;
  tracks_created: number;
  verified: boolean;
  social_links: {
    twitter?: string;
    instagram?: string;
    soundcloud?: string;
  };
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  bpm: number;
  genre: string;
  audio_url: string;
  cover_art: string;
  dj_id: string;
  created_at: string;
  plays: number;
  likes: number;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: Track[];
  created_by: string;
  created_at: string;
  updated_at: string;
  is_public: boolean;
  cover_art?: string;
}

// Video & Media Types
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  video_url: string;
  duration: number;
  views: number;
  likes: number;
  created_at: string;
  creator_id: string;
  category: 'performance' | 'tutorial' | 'ugc' | 'promo';
  tags: string[];
}

export interface UGCSubmission {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail: string;
  creator_id: string;
  creator_name: string;
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
  votes: number;
  featured: boolean;
}

// User Types
export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
  bio: string;
  created_at: string;
  updated_at: string;
  is_dj: boolean;
  followers: number;
  following: number;
}

export interface UserProfile extends User {
  playlists: Playlist[];
  liked_tracks: string[];
  liked_videos: string[];
}

// Analytics Types
export interface Analytics {
  page_views: number;
  unique_visitors: number;
  avg_session_duration: number;
  bounce_rate: number;
  top_videos: Video[];
  top_tracks: Track[];
  user_engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
}

// Feature Flags
export interface FeatureFlags {
  ar_enabled: boolean;
  ugc_enabled: boolean;
  remix_enabled: boolean;
  analytics_enabled: boolean;
  live_streaming_enabled: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Audio Visualizer Types
export interface AudioData {
  frequency: Uint8Array;
  waveform: Uint8Array;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
}

// Three.js Scene Types
export interface SceneConfig {
  width: number;
  height: number;
  pixelRatio: number;
  antialias: boolean;
  alpha: boolean;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}
