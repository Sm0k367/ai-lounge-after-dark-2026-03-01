# 🚀 AI Lounge After Dark - Complete Deployment Guide

## Pre-Deployment Checklist

### 1. Local Testing ✅
- [ ] Run `npm run dev` and test all features locally
- [ ] Test on mobile (iOS Safari, Android Chrome)
- [ ] Test audio playback and visualization
- [ ] Test video loading and lazy loading
- [ ] Check responsive design (320px to 4K)
- [ ] Verify all links work
- [ ] Test dark mode toggle
- [ ] Check console for errors/warnings

### 2. Media Optimization ✅
- [ ] Compress all videos: `npm run compress:media`
- [ ] Verify video quality (1080p max)
- [ ] Optimize audio files (128kbps MP3)
- [ ] Convert images to WebP
- [ ] Generate thumbnails for videos
- [ ] Check file sizes (videos < 50MB, audio < 10MB)
- [ ] Test media loading on slow 3G

### 3. Environment Setup ✅
- [ ] Create Supabase project
- [ ] Set up storage buckets (ugc-uploads, reels, audio-clips)
- [ ] Configure authentication (email, Google, GitHub)
- [ ] Create database tables
- [ ] Set up RLS policies
- [ ] Generate API keys
- [ ] Create `.env.local` with all variables
- [ ] Verify `.env.local` is in `.gitignore`

### 4. Code Quality ✅
- [ ] Run `npm run lint` - no errors
- [ ] Run `npm run type-check` - no TypeScript errors
- [ ] Run `npm run test` - all tests pass
- [ ] Check bundle size: `npm run analyze`
- [ ] Remove console.log statements
- [ ] Remove unused imports
- [ ] Update version in package.json

### 5. Performance ✅
- [ ] Lighthouse score > 90
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.8s

## Step-by-Step Deployment

### Phase 1: GitHub Setup (5 minutes)

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: AI Lounge After Dark - Production Ready"

# Create main branch
git branch -M main

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/ai-lounge-after-dark.git

# Push to GitHub
git push -u origin main
```

### Phase 2: Vercel Setup (10 minutes)

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Authorize Vercel to access your repositories

2. **Import Project**
   - Click "New Project"
   - Select your GitHub repository
   - Vercel auto-detects Next.js
   - Click "Import"

3. **Configure Build Settings**
   - Framework: Next.js (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
   - Node Version: 18.x

4. **Add Environment Variables**
   - Go to Settings → Environment Variables
   - Add all variables from `.env.example`:
     ```
     NEXT_PUBLIC_SUPABASE_URL
     NEXT_PUBLIC_SUPABASE_ANON_KEY
     SUPABASE_SERVICE_ROLE_KEY
     NEXT_PUBLIC_ENABLE_AR
     NEXT_PUBLIC_ENABLE_UGC
     NEXT_PUBLIC_ENABLE_REMIX
     NEXT_PUBLIC_ENABLE_ANALYTICS
     ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-5 minutes)
   - Get your Vercel URL: `https://ai-lounge-after-dark.vercel.app`

### Phase 3: Supabase Setup (15 minutes)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose region (closest to your users)
   - Set strong password
   - Wait for project to initialize

2. **Create Storage Buckets**
   - Go to Storage → New Bucket
   - Create buckets:
     - `ugc-uploads` (public)
     - `reels` (public)
     - `audio-clips` (public)
     - `thumbnails` (public)

3. **Configure RLS Policies**
   ```sql
   -- Allow public read
   CREATE POLICY "Public read" ON storage.objects
   FOR SELECT USING (bucket_id = 'ugc-uploads');

   -- Allow authenticated upload
   CREATE POLICY "Authenticated upload" ON storage.objects
   FOR INSERT WITH CHECK (
     bucket_id = 'ugc-uploads' AND
     auth.role() = 'authenticated'
   );
   ```

4. **Create Database Tables**
   - Go to SQL Editor
   - Run schema setup script (see below)

5. **Get API Keys**
   - Go to Settings → API
   - Copy `Project URL`
   - Copy `anon public key`
   - Copy `service_role key`
   - Add to Vercel environment variables

### Phase 4: Domain Setup (10 minutes)

1. **Add Custom Domain to Vercel**
   - Go to Vercel Dashboard → Domains
   - Click "Add Domain"
   - Enter your domain (e.g., `ailounge.com`)
   - Choose DNS provider

2. **Update DNS Records**
   - Go to your domain registrar
   - Add CNAME record:
     ```
     Name: www
     Value: cname.vercel-dns.com
     ```
   - Or use Vercel's nameservers (recommended)

3. **SSL Certificate**
   - Vercel auto-generates SSL
   - Wait 24-48 hours for DNS propagation
   - Verify with green checkmark in Vercel

### Phase 5: Post-Deployment Testing (20 minutes)

1. **Functional Testing**
   - [ ] Visit your domain
   - [ ] Test all pages load
   - [ ] Test audio playback
   - [ ] Test video loading
   - [ ] Test responsive design
   - [ ] Test dark mode
   - [ ] Test authentication (if enabled)
   - [ ] Test UGC upload (if enabled)

2. **Performance Testing**
   - [ ] Run Lighthouse audit
   - [ ] Check Core Web Vitals
   - [ ] Test on slow 3G
   - [ ] Test on mobile devices
   - [ ] Check image optimization

3. **Security Testing**
   - [ ] Check HTTPS works
   - [ ] Verify environment variables not exposed
   - [ ] Test CORS headers
   - [ ] Check CSP headers
   - [ ] Verify RLS policies

4. **Analytics Setup**
   - [ ] Enable Vercel Analytics
   - [ ] Set up custom events
   - [ ] Configure error tracking
   - [ ] Set up monitoring alerts

## Database Schema Setup

Run this SQL in Supabase SQL Editor:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  avatar TEXT,
  bio TEXT,
  is_dj BOOLEAN DEFAULT FALSE,
  followers INTEGER DEFAULT 0,
  following INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tracks table
CREATE TABLE tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  duration INTEGER NOT NULL,
  bpm INTEGER,
  genre TEXT,
  audio_url TEXT NOT NULL,
  cover_art TEXT,
  dj_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  plays INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0
);

-- Videos table
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT,
  video_url TEXT NOT NULL,
  duration INTEGER NOT NULL,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  creator_id UUID REFERENCES users(id),
  category TEXT,
  tags TEXT[]
);

-- UGC Submissions table
CREATE TABLE ugc_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail TEXT,
  creator_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  status TEXT DEFAULT 'pending',
  votes INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE ugc_submissions ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX idx_tracks_dj_id ON tracks(dj_id);
CREATE INDEX idx_videos_creator_id ON videos(creator_id);
CREATE INDEX idx_ugc_creator_id ON ugc_submissions(creator_id);
CREATE INDEX idx_ugc_status ON ugc_submissions(status);
```

## Continuous Deployment

### Auto-Deploy on Push
- Every push to `main` branch auto-deploys to production
- Preview deployments for pull requests
- Automatic rollback on build failure

### Manual Deployment
```bash
# Deploy to production
vercel --prod

# Deploy to staging
vercel

# View deployment logs
vercel logs
```

## Monitoring & Maintenance

### Daily Checks
- [ ] Check Vercel dashboard for errors
- [ ] Monitor Core Web Vitals
- [ ] Check error tracking (Sentry/Vercel)
- [ ] Review analytics

### Weekly Checks
- [ ] Review performance metrics
- [ ] Check for security updates
- [ ] Update dependencies: `npm update`
- [ ] Review user feedback

### Monthly Checks
- [ ] Full security audit
- [ ] Performance optimization review
- [ ] Database cleanup
- [ ] Backup verification

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
vercel --prod --force

# Check build logs
vercel logs --follow
```

### Slow Performance
- Check bundle size: `npm run analyze`
- Optimize images
- Enable caching headers
- Use CDN for media

### Media Not Loading
- Verify Supabase storage buckets
- Check RLS policies
- Verify CORS settings
- Check file permissions

### Authentication Issues
- Verify Supabase credentials
- Check RLS policies
- Clear browser cache
- Test in incognito mode

## Rollback Procedure

If something goes wrong:

```bash
# View deployment history
vercel list

# Rollback to previous deployment
vercel rollback

# Or redeploy specific commit
git revert <commit-hash>
git push origin main
```

## Success Indicators

✅ **You're ready for production when:**
- Lighthouse score > 90
- All tests passing
- No console errors
- Mobile responsive
- Fast load times
- Secure (HTTPS, RLS, env vars)
- Analytics working
- Error tracking active
- Monitoring alerts set up

---

**Deployment Time: ~1 hour total**
**Maintenance: ~30 minutes per week**

Good luck! 🚀
