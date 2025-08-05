# 🚀 Deployment Guide for Arabically

This guide will help you deploy Arabically to production using free tier services.

## 🌟 Deployment Stack (100% Free)

- **Frontend & API**: Vercel (Free Tier - 100GB bandwidth/month)
- **Database & Auth**: Supabase (Free Tier - 500MB database)
- **File Storage**: Supabase Storage (Free Tier - 1GB storage)
- **AI Services**: OpenAI (Pay per use - starts at ~$0.002/1K tokens)

**Total Monthly Cost**: ~$0-5 depending on usage 🎉

## 📋 Pre-Deployment Checklist

### 1. Supabase Setup
- [ ] Create Supabase project
- [ ] Enable pgvector extension
- [ ] Run database schema
- [ ] Set up storage bucket
- [ ] Configure RLS policies
- [ ] Test authentication

### 2. OpenAI Setup
- [ ] Get OpenAI API key
- [ ] Verify model access (GPT-3.5-turbo, text-embedding-3-small)
- [ ] Set up billing (if needed)

### 3. Environment Variables
- [ ] All required environment variables defined
- [ ] Production URLs configured
- [ ] Secrets generated (NEXTAUTH_SECRET)

## 🌐 Vercel Deployment

### Step 1: Prepare Your Repository

1. **Ensure your code is in a Git repository**:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Verify build works locally**:
   ```bash
   npm run build
   ```

### Step 2: Deploy to Vercel

1. **Install Vercel CLI** (optional but recommended):
   ```bash
   npm install -g vercel
   ```

2. **Option A: Using Vercel CLI**:
   ```bash
   vercel login
   vercel
   # Follow the prompts
   ```

3. **Option B: Using Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Configure build settings (should auto-detect Next.js)

### Step 3: Configure Environment Variables

In your Vercel Dashboard, go to Settings → Environment Variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI Configuration  
OPENAI_API_KEY=sk-your-openai-key

# Next.js Configuration
NEXTAUTH_SECRET=your-random-secret-string
NEXTAUTH_URL=https://your-app.vercel.app
```

**🔒 Security Note**: Never commit environment variables to Git!

### Step 4: Configure Build Settings

Vercel should auto-detect Next.js, but verify these settings:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### Step 5: Deploy

Click "Deploy" or run:
```bash
vercel --prod
```

## 🔧 Post-Deployment Configuration

### 1. Update Supabase Auth Settings

In your Supabase Dashboard:
1. Go to Authentication → Settings
2. Add your production URL to "Site URL"
3. Add your domain to "Additional Redirect URLs":
   ```
   https://your-app.vercel.app/auth/callback
   ```

### 2. Configure CORS (if needed)

Add your production domain to any CORS settings in Supabase.

### 3. Test Production Deployment

1. **Authentication**: Sign up and sign in
2. **File Upload**: Upload a test lesson plan
3. **AI Chat**: Test the chat functionality
4. **Language Switching**: Test Arabic/English toggle

## 📱 Mobile & PWA Setup (Optional)

### Add PWA Support

1. **Install next-pwa**:
   ```bash
   npm install next-pwa
   ```

2. **Configure next.config.js**:
   ```javascript
   const withPWA = require('next-pwa')({
     dest: 'public',
     register: true,
     skipWaiting: true,
   })

   module.exports = withPWA({
     // your existing config
   })
   ```

3. **Add manifest.json** in `public/`:
   ```json
   {
     "name": "Arabically",
     "short_name": "Arabically",
     "description": "AI Arabic Teaching Assistant",
     "start_url": "/",
     "display": "standalone",
     "background_color": "#ffffff",
     "theme_color": "#0ea5e9",
     "icons": [
       {
         "src": "/icon-192.png",
         "sizes": "192x192",
         "type": "image/png"
       },
       {
         "src": "/icon-512.png", 
         "sizes": "512x512",
         "type": "image/png"
       }
     ]
   }
   ```

## 🔍 Monitoring & Analytics

### 1. Vercel Analytics

Enable in Vercel Dashboard → Analytics (free tier included).

### 2. Supabase Monitoring

Monitor database usage, storage, and auth in Supabase Dashboard.

### 3. OpenAI Usage Tracking

Monitor API usage and costs in OpenAI Dashboard.

## 🚨 Production Optimizations

### 1. Performance

- [ ] Enable Vercel Edge Functions for API routes (if needed)
- [ ] Optimize images with Next.js Image component
- [ ] Use Vercel's built-in CDN for static assets
- [ ] Enable gzip compression (automatic with Vercel)

### 2. Security

- [ ] Review and tighten Supabase RLS policies
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set up proper CORS policies

### 3. SEO & Accessibility

- [ ] Add proper meta tags
- [ ] Ensure Arabic RTL support works correctly
- [ ] Test with screen readers
- [ ] Optimize for search engines

## 🔄 CI/CD Pipeline (Optional)

### GitHub Actions Setup

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 📊 Cost Management

### Free Tier Limits

**Vercel Free**:
- 100GB bandwidth/month
- 6,000 build minutes/month
- Unlimited static deployments

**Supabase Free**:
- 500MB database storage
- 1GB file storage
- 50,000 monthly active users
- 2 million realtime messages

**OpenAI**:
- Pay per use
- GPT-3.5-turbo: ~$0.002/1K tokens
- Embeddings: ~$0.0001/1K tokens

### Monitoring Costs

1. **Set up billing alerts** in all services
2. **Monitor usage** regularly
3. **Implement rate limiting** if needed
4. **Cache responses** where appropriate

## 🛠️ Maintenance

### Regular Tasks

- [ ] Monitor error logs in Vercel
- [ ] Check Supabase database usage
- [ ] Review OpenAI API costs
- [ ] Update dependencies monthly
- [ ] Backup user data (Supabase has built-in backups)

### Updates & Scaling

When you outgrow free tiers:
- **Vercel Pro**: $20/month for more bandwidth and features
- **Supabase Pro**: $25/month for more storage and compute
- **OpenAI**: Scale based on usage

## 🆘 Troubleshooting Deployment Issues

### Common Problems

**Build Failures**:
```bash
# Check build logs in Vercel Dashboard
# Common issues:
- Missing environment variables
- TypeScript errors
- Missing dependencies
```

**Runtime Errors**:
```bash
# Check Function logs in Vercel
# Common issues:
- API route errors
- Database connection issues
- OpenAI API key problems
```

**Database Issues**:
```bash
# Check Supabase logs
# Common issues:
- RLS policy blocking requests
- Missing pgvector extension
- Storage policy issues
```

### Getting Help

1. **Vercel**: Check their excellent documentation and Discord
2. **Supabase**: Great documentation and GitHub discussions
3. **OpenAI**: API documentation and community forum

---

🎉 **Congratulations!** Your Arabically app is now live and ready to help Arabic teachers worldwide!

**Production URL**: `https://your-app.vercel.app`

Remember to share your app with Arabic language educators and gather feedback for continuous improvement! 🌟 