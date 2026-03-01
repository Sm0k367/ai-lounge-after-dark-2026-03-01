// Club Configuration
export const CLUB_CONFIG = {
  name: process.env.NEXT_PUBLIC_CLUB_NAME || 'AI Lounge After Dark',
  dj_name: process.env.NEXT_PUBLIC_DJ_NAME || 'Smoke Stream',
  description: 'Ultra-immersive AI-powered club experience with cutting-edge visuals and music',
  tagline: 'Where AI Meets Sound',
};

// Feature Flags
export const FEATURE_FLAGS = {
  AR_ENABLED: process.env.NEXT_PUBLIC_ENABLE_AR === 'true',
  UGC_ENABLED: process.env.NEXT_PUBLIC_ENABLE_UGC === 'true',
  REMIX_ENABLED: process.env.NEXT_PUBLIC_ENABLE_REMIX === 'true',
  ANALYTICS_ENABLED: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
};

// Media Configuration
export const MEDIA_CONFIG = {
  MAX_UPLOAD_SIZE: parseInt(process.env.NEXT_PUBLIC_MAX_UPLOAD_SIZE || '104857600'), // 100MB
  SUPPORTED_VIDEO_FORMATS: ['video/mp4', 'video/webm', 'video/quicktime'],
  SUPPORTED_AUDIO_FORMATS: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  SUPPORTED_IMAGE_FORMATS: ['image/jpeg', 'image/png', 'image/webp'],
  VIDEO_QUALITY_PRESETS: {
    low: { bitrate: '500k', resolution: '640x360' },
    medium: { bitrate: '2500k', resolution: '1280x720' },
    high: { bitrate: '5000k', resolution: '1920x1080' },
  },
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

// Animation Configuration
export const ANIMATION_CONFIG = {
  DURATION_SHORT: 300,
  DURATION_MEDIUM: 500,
  DURATION_LONG: 800,
  EASING_EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  EASING_EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
};

// Three.js Configuration
export const THREE_CONFIG = {
  ANTIALIAS: true,
  ALPHA: true,
  PIXEL_RATIO: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1,
  FOV: 75,
  NEAR: 0.1,
  FAR: 10000,
};

// Audio Configuration
export const AUDIO_CONFIG = {
  SAMPLE_RATE: 44100,
  FFT_SIZE: 256,
  SMOOTHING_TIME_CONSTANT: 0.8,
  VOLUME_RANGE: [0, 1],
  DEFAULT_VOLUME: 0.7,
};

// Responsive Breakpoints
export const BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Color Palette
export const COLORS = {
  primary: '#A020F0', // Purple
  secondary: '#FF006E', // Pink
  accent: '#00D9FF', // Cyan
  success: '#39FF14', // Green
  warning: '#FF6B35', // Orange
  error: '#FF0000', // Red
  dark_bg: '#0A0E27',
  dark_surface: '#1A1F3A',
  dark_border: '#2D3561',
};

// Social Links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/smokestream',
  instagram: 'https://instagram.com/smokestream',
  soundcloud: 'https://soundcloud.com/smokestream',
  discord: 'https://discord.gg/ailounge',
};

// Analytics Events
export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view',
  VIDEO_PLAY: 'video_play',
  VIDEO_COMPLETE: 'video_complete',
  AUDIO_PLAY: 'audio_play',
  UGC_SUBMIT: 'ugc_submit',
  USER_SIGNUP: 'user_signup',
  USER_LOGIN: 'user_login',
  SHARE: 'share',
  LIKE: 'like',
  COMMENT: 'comment',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UPLOAD_ERROR: 'Failed to upload file. Please try again.',
  AUTH_ERROR: 'Authentication failed. Please log in again.',
  PERMISSION_ERROR: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  UPLOAD_SUCCESS: 'File uploaded successfully!',
  AUTH_SUCCESS: 'Authentication successful!',
  SAVE_SUCCESS: 'Changes saved successfully!',
  DELETE_SUCCESS: 'Item deleted successfully!',
};
