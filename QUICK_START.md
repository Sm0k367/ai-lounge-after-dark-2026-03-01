# ⚡ Quick Start Guide - 15 Minutes to Live

Get **AI Lounge After Dark** running locally and deployed to production in 15 minutes.

## 🎯 What You'll Have

✅ Ultra-immersive club app running locally  
✅ Deployed to Vercel with custom domain  
✅ Supabase backend configured  
✅ Media optimized and ready  
✅ Analytics tracking active  

## 📋 Prerequisites (2 minutes)

- Node.js 18+ installed
- GitHub account
- Vercel account (free)
- Supabase account (free)

## 🚀 Step 1: Local Setup (3 minutes)

```bash
# Clone or download the project
cd ai-lounge-after-dark

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start dev server
npm run dev

# Open http://localhost:3000
```

**You should see the club homepage!** 🎉

## 🔧 Step 2: Supabase Setup (5 minutes)

1. Go to [supabase.com](https://supabase.com) → Sign up
2. Create new project
3. Go to **Settings → API**
4. Copy these values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` → `SUPABASE_SERVICE_ROLE_KEY`

5. Paste into `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

6. Create storage buckets in Supabase:
   - Go to **Storage → New Bucket**
   - Create: `ugc-uploads`, `reels`, `audio-clips`
   - Set all to **Public**

## 📤 Step 3: Deploy to Vercel (5 minutes)

### Option A: Via GitHub (Recommended)

```bash
# Push to GitHub
git add .
git commit -m "AI Lounge After Dark - Ready to deploy"
git push origin main
```

Then:
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repo
4. Add environment variables (same as `.env.local`)
5. Click "Deploy"

**Done!** Your app is live at `https://ai-lounge-after-dark.vercel.app`

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Follow prompts and add environment variables
```

## 🎨 Step 4: Customize (Optional)

Edit these files to personalize:

```typescript
// src/utils/constants.ts
export const CLUB_CONFIG = {
  name: 'Your Club Name',
  dj_name: 'Your DJ Name',
  description: 'Your description',
  tagline: 'Your tagline',
};
```

```typescript
// src/components/Navbar.tsx
// Change logo, colors, links
```

## ✅ Verification Checklist

- [ ] Local dev server running (`npm run dev`)
- [ ] Homepage loads at http://localhost:3000
- [ ] Supabase credentials in `.env.local`
- [ ] GitHub repo created and pushed
- [ ] Vercel project created
- [ ] Environment variables added to Vercel
- [ ] Production URL working
- [ ] Mobile responsive (test on phone)

## 🎵 Add Your Media

```
public/
├── media/
│   ├── clips/          # Add your video clips here
│   ├── reels/          # Add your reels here
│   └── posters/        # Add video thumbnails here
├── audio/
│   └── main-track.mp3  # Add your main track
└── images/
    └── dj-profile.jpg  # Add DJ profile image
```

Then optimize:
```bash
npm run compress:media
```

## 🔗 Add Custom Domain

1. Go to Vercel Dashboard → Domains
2. Add your domain (e.g., `ailounge.com`)
3. Update DNS records at your registrar
4. Wait 24-48 hours for propagation

## 📊 Monitor Performance

1. Go to Vercel Dashboard → Analytics
2. Check Core Web Vitals
3. Monitor errors and performance

## 🆘 Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Supabase connection fails
- Verify credentials in `.env.local`
- Check Supabase project is active
- Restart dev server

### Build fails on Vercel
- Check environment variables are set
- Verify Node version is 18+
- Check build logs in Vercel dashboard

### Media not loading
- Verify files in `public/media/`
- Check Supabase storage buckets
- Verify bucket permissions are public

## 📚 Next Steps

1. **Add more features:**
   - Video grid with lazy loading
   - Audio player with visualization
   - User authentication
   - UGC submission system

2. **Optimize performance:**
   - Run Lighthouse audit
   - Optimize images
   - Enable caching

3. **Set up monitoring:**
   - Enable Vercel Analytics
   - Set up error tracking
   - Configure alerts

4. **Scale up:**
   - Add more content
   - Implement social features
   - Add live streaming

## 📖 Full Documentation

- **[README.md](./README.md)** - Complete project overview
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Detailed deployment steps
- **[next.config.js](./next.config.js)** - Next.js configuration

## 🎉 You're Done!

Your ultra-immersive club app is now:
- ✅ Running locally
- ✅ Deployed to production
- ✅ Connected to Supabase
- ✅ Optimized for performance
- ✅ Ready for users

**Share your live URL and start building!** 🚀

---

**Questions?** Check the full docs or reach out to the community.

**Time elapsed: ~15 minutes** ⏱️
