# HedAia - AI Arabic Teaching Assistant

🎓 **Teacher-trained AI specialized for Arabic language education**

HedAia is a specialized AI assistant designed specifically for Arabic teachers, trained by expert educators and aligned with CEFR framework and guided play methodology.

## ✨ Features

- **Teacher-Trained AI**: Developed with feedback from Arabic teaching experts
- **CEFR Aligned**: Supports Common European Framework proficiency levels
- **Guided Play Integration**: Nature-based and play-oriented teaching methods
- **Lesson-Specific Analysis**: Upload your lessons and get targeted advice
- **Bilingual Support**: Full Arabic and English interface
- **Ready-to-Use Materials**: Generates classroom-ready activities and assessments

## 🚀 Free Deployment Guide

### Option 1: Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial HedAia setup"
   git branch -M main
   git remote add origin https://github.com/yourusername/hedaia.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project" → Import your repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `OPENAI_API_KEY`
   - Deploy!

3. **Alternative - CLI Deployment**:
   ```bash
   npx vercel
   # Follow the prompts
   # Add environment variables when prompted
   ```

### Option 2: Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Environment Variables**: Same as Vercel

### Option 3: Railway

1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

## 🛠 Environment Variables

Create a `.env.local` file with:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# NextAuth (optional)
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

## 📊 Supabase Setup

1. **Create Project**: Go to [supabase.com](https://supabase.com)
2. **Run SQL Schema**: Copy and run the contents of `supabase/schema.sql`
3. **Setup Storage**: Create a private bucket called `lesson-plans`
4. **Configure RLS**: Enable Row Level Security policies

## 🎯 Usage

1. **Upload Lesson Plans**: PDF, DOCX, or TXT files
2. **Chat with HedAia**: Get CEFR-aligned teaching advice
3. **Generate Materials**: Ready-to-use activities and assessments
4. **Guided Play Integration**: Nature-based learning suggestions

## 🌍 Free Tier Limits

### Vercel (Recommended)
- ✅ **100GB bandwidth/month**
- ✅ **Unlimited static sites**
- ✅ **Serverless functions**
- ✅ **Custom domains**
- ✅ **Automatic HTTPS**

### Supabase
- ✅ **500MB database**
- ✅ **1GB file storage**
- ✅ **50,000 monthly active users**
- ✅ **2 million Edge Function invocations**

### OpenAI
- ✅ **$5 free credits** (new accounts)
- ✅ **Pay-as-you-use** afterwards

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📚 Tech Stack

- **Frontend**: Next.js 15, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL + Vector DB)
- **AI**: OpenAI GPT-3.5-turbo
- **Storage**: Supabase Storage
- **Deployment**: Vercel
- **Languages**: TypeScript, Arabic/English i18n

## 🎓 Educational Framework

- **CEFR Levels**: A1-C2 proficiency alignment
- **Guided Play**: Child-centered learning approach
- **Nature-Based**: Outdoor and natural learning integration
- **Early Years**: Age-appropriate development considerations

## 📞 Support

For questions about HedAia or deployment issues, please open an issue in this repository.

---

**Built with ❤️ for Arabic teachers worldwide**
