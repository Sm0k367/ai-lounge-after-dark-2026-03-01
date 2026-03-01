# 🎵 AI Lounge After Dark - Production Club App

Ultra-immersive, media-heavy Next.js/React/Three.js club experience with DJ Smoke Stream. Built for scale, optimized for performance, deployed on Vercel.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn
- Git
- Supabase account (free tier works)
- Vercel account (for deployment)

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-lounge-after-dark.git
cd ai-lounge-after-dark

# Install dependencies
npm install

# Create .env.local from example
cp .env.example .env.local

# Add your Supabase credentials to .env.local
# NEXT_PUBLIC_SUPABASE_URL=your_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
ai-lounge-after-dark/
├── src/
│   ├── components/          # React components
│   │   ├── Layout.tsx       # Main layout wrapper
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── Sidebar.tsx      # Sidebar navigation
│   │   ├── AudioPlayer.tsx  # Audio player
│   │   ├── HeroSection.tsx  # Hero section
│   │   ├── VideoGrid.tsx    # Video grid
│   │   ├── DJProfile.tsx    # DJ profile
│   │   ├── UGCWall.tsx      # User-generated content
│   │   └── ARPreview.tsx    # AR experience
│   ├── pages/               # Next.js pages
│   │   ├── _app.tsx         # App wrapper
│   │   ├── index.tsx        # Home page
│   │   ├── videos.tsx       # Videos page
│   │   ├── dj.tsx           # DJ page
│   │   ├── ugc.tsx          # UGC page
│   │   └── api/             # API routes
│   ├── hooks/               # Custom React hooks
│   │   ├── useAudio.ts      # Audio playback hook
│   │   └── useMediaLoader.ts # Media loading hook
│   ├── lib/                 # Utilities & libraries
│   │   └── supabase.ts      # Supabase client
│   ├── store/               # State management (Zustand)
│   │   └── useClubStore.ts  # Club state
│   ├── types/               # TypeScript types
│   │   └── index.ts         # Type definitions
│   ├── utils/               # Utility functions
│   │   └── constants.ts     # App constants
│   └── styles/              # Global styles
│       └── globals.css      # Tailwind + custom CSS
├── public/                  # Static assets
│   ├── media/               # Video clips & reels
│   │   ├── clips/
│   │   ├── reels/
│   │   └── posters/
│   ├── audio/               # Audio files
│   └── images/              # Images
├── scripts/                 # Build & utility scripts
│   └── compress-media.js    # Media compression
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS config
├── tsconfig.json            # TypeScript config
├── package.json             # Dependencies
└── vercel.json              # Vercel deployment config
```

## 🎨 Features

### Core Features
- ✅ **Immersive Hero Section** - Animated gradient background with DJ branding
- ✅ **Audio Player** - Howler.js integration with frequency visualization
- ✅ **Video Grid** - Lazy-loaded video gallery with hover effects
- ✅ **DJ Profile** - Showcase DJ Smoke Stream's bio and stats
- ✅ **UGC Wall** - User-submitted content with moderation
- ✅ **Responsive Design** - Mobile-first, works on all devices

### Advanced Features
- 🎯 **Three.js Visualizer** - Frequency-reactive 3D audio visualization
- 📱 **PWA Support** - Installable, offline-capable
- 🔐 **Authentication** - Supabase auth (email, social)
- 💾 **Cloud Storage** - Supabase Storage for media
- 📊 **Analytics** - Vercel Analytics + custom events
- 🎭 **Feature Flags** - Beta testing for new features
- 🌙 **Dark Mode** - Built-in theme support

## 🛠️ Configuration

### Environment Variables

Create `.env.local` with:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Feature Flags
NEXT_PUBLIC_ENABLE_AR=true
NEXT_PUBLIC_ENABLE_UGC=true
NEXT_PUBLIC_ENABLE_REMIX=false
NEXT_PUBLIC_ENABLE_ANALYTICS=true

# Club Config
NEXT_PUBLIC_DJ_NAME=Smoke Stream
NEXT_PUBLIC_CLUB_NAME=AI Lounge After Dark
```

## 📦 Media Management

### Organizing Media Files

```
public/
├── media/
│   ├── clips/          # Short video clips (< 30s)
│   ├── reels/          # Full reels (< 2min)
│   └── posters/        # Video thumbnails
├── audio/
│   ├── main-track.mp3  # Main club track
│   └── sfx/            # Sound effects
└── images/
    ├── dj-profile.jpg
    └── backgrounds/
```

### Compression Script

Optimize media before deployment:

```bash
npm run compress:media
```

This will:
- Compress videos to H.264 (MP4)
- Optimize audio to 128kbps MP3
- Convert images to WebP
- Generate thumbnails

## 🚀 Deployment to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: AI Lounge After Dark"
git branch -M main
git remote add origin https://github.com/yourusername/ai-lounge-after-dark.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js

### Step 3: Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL = your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_key
SUPABASE_SERVICE_ROLE_KEY = your_service_key
NEXT_PUBLIC_ENABLE_AR = true
NEXT_PUBLIC_ENABLE_UGC = true
```

### Step 4: Deploy

```bash
# Deploy to production
vercel --prod

# Or push to main branch (auto-deploys)
git push origin main
```

### Step 5: Custom Domain

1. Go to Vercel Dashboard → Domains
2. Add your custom domain
3. Update DNS records
4. SSL certificate auto-generated

## 📊 Performance Optimization

### Bundle Size
- Dynamic imports for Three.js components
- Code splitting for routes
- Image optimization with Next.js Image
- CSS minification with Tailwind

### Caching Strategy
- ISR (Incremental Static Regeneration) for pages
- SWR (Stale-While-Revalidate) for API data
- Browser caching for media files (1 year)
- CDN caching via Vercel Edge Network

### Web Vitals
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

Monitor in Vercel Dashboard → Analytics

## 🧪 Testing

### Unit Tests
```bash
npm run test
npm run test:watch
```

### E2E Tests
```bash
npm run test:e2e
```

### Performance Testing
```bash
npm run build
npm run start
# Then run Lighthouse audit
```

## 📱 Mobile Optimization

- Touch-friendly controls
- Optimized Three.js for mobile (LOD)
- Responsive images
- PWA installable
- Offline support

Test on:
- iOS Safari (iPhone 12+)
- Android Chrome (Pixel 6+)
- Desktop (Chrome, Firefox, Safari, Edge)

## 🔐 Security

- Environment variables for secrets
- Supabase RLS (Row Level Security)
- CORS configured
- CSP headers
- Rate limiting on API routes

## 📈 Monitoring

### Error Tracking
- Sentry integration (optional)
- Vercel error logs
- Custom error boundaries

### Performance Monitoring
- Vercel Analytics
- Web Vitals tracking
- Custom event tracking

### Uptime Monitoring
- Vercel status page
- Uptime Robot (optional)

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 🎵 Credits

- **DJ Smoke Stream** - Audio & Music Direction
- **Next.js** - React framework
- **Three.js** - 3D graphics
- **Supabase** - Backend & Storage
- **Vercel** - Hosting & Deployment
- **Tailwind CSS** - Styling

## 📞 Support

- 📧 Email: support@ailounge.com
- 💬 Discord: [Join our community](https://discord.gg/ailounge)
- 🐦 Twitter: [@ailounge](https://twitter.com/ailounge)

---

**Built with ❤️ for the future of immersive club experiences**
