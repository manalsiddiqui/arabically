# 🌟 HedAia - AI Teaching Assistant for Arabic

**HedAia** (هدايا) is a specialized AI assistant designed specifically for Arabic teachers, trained by expert educators and focused on interactive learning and modern teaching methodologies.

## ✨ Features

### 🎯 **Core Functionality**
- **Interactive Learning**: Supports modern interactive teaching approaches
- **Teacher-Trained AI**: Built with insights from expert Arabic educators
- **Lesson Plan Analysis**: Upload and chat with your lesson plans
- **Bilingual Interface**: Full Arabic/English support with RTL layout
- **Ready-to-Use Materials**: Generate classroom-ready content instantly

### 🛠️ **Technical Features**
- **Next.js 14** with TypeScript
- **Supabase** backend (Database, Auth, Storage, Vector Search)
- **OpenAI GPT-3.5** with RAG (Retrieval Augmented Generation)
- **Tailwind CSS** with custom Arabic-inspired design
- **File Processing** (PDF, DOCX, TXT)
- **Real-time Chat** interface

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Supabase account
- OpenAI API key

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd hedaia
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key
OPENAI_API_KEY=your_openai_api_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. **Set up Supabase database**
Run the SQL scripts in `supabase/` folder in your Supabase SQL editor.

5. **Start development server**
```bash
npm run dev
```

## 🎓 How to Use

### For Teachers:
1. **Upload Lesson Plans**: Add your PDF, DOCX, or TXT lesson plans
2. **Chat with HedAia**: Get interactive teaching advice
3. **Generate Materials**: Create activities, assessments, and teaching aids
4. **Bilingual Support**: Switch between Arabic and English interfaces

### Key Workflows:
- 📚 **Lesson Analysis**: Upload → AI processes → Chat about content
- 🎯 **Material Generation**: Ask for activities → Get ready-to-use content
- 💡 **Teaching Tips**: Get practical classroom strategies
- 🔄 **Iterative Improvement**: Refine lessons based on AI suggestions

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   AI Services   │
│   (Next.js)     │◄──►│   (Supabase)    │◄──►│   (OpenAI)      │
│                 │    │                 │    │                 │
│ • React Pages   │    │ • PostgreSQL    │    │ • GPT-3.5       │
│ • Tailwind CSS  │    │ • Auth          │    │ • Embeddings    │
│ • i18n Support  │    │ • Storage       │    │ • RAG Pipeline  │
│ • RTL Layout    │    │ • Vector DB     │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🌍 Free Deployment Options

### 🎯 **Recommended: Render** (Easiest)
- ✅ Free tier available
- ✅ Automatic deployments
- ✅ Built-in SSL
- ✅ Environment variable management

**Quick Deploy:**
1. Fork this repository
2. Connect to Render
3. Add environment variables
4. Deploy automatically

[📖 **Detailed Render Guide**](./RENDER_DEPLOY_GUIDE.md)

### 🌐 **Alternative Options:**
- **Vercel**: `npx vercel` (Frontend-focused)
- **Netlify**: Great for static sites
- **Railway**: Full-stack deployment

## 🎨 Design System

### Colors (Desert-Inspired)
- **Primary**: Warm desert browns (#c8956d)
- **Accent**: Fresh greens (#22c55e) 
- **Secondary**: Sand tones (#c9b899)
- **Earth**: Rich browns (#a68b73)

### Typography
- **Arabic**: Noto Sans Arabic
- **English**: Inter
- **RTL Support**: Full right-to-left layout

## 🔧 Development

### Project Structure
```
src/
├── pages/              # Next.js pages
├── components/         # React components
├── lib/               # Utilities and services
│   ├── ai/           # OpenAI integration
│   └── supabase/     # Database client
├── styles/           # Global styles
└── hooks/            # Custom React hooks
```

### Key Commands
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # Code linting
```

## 🚀 Production Checklist

- [ ] Environment variables configured
- [ ] Supabase database set up
- [ ] OpenAI API key added
- [ ] File upload tested
- [ ] Chat functionality working
- [ ] Bilingual interface tested
- [ ] Mobile responsiveness verified

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- 📖 Check the [Deployment Guide](./RENDER_DEPLOY_GUIDE.md)
- 🐛 Report issues on GitHub
- 💬 Join our community discussions

---

**HedAia** - Empowering Arabic teachers with AI-driven insights and ready-to-use materials. Built with ❤️ for educators.

*"Teaching Arabic, enhanced by AI"* - هدايا
