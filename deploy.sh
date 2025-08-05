#!/bin/bash

echo "🚀 HedAia Deployment Script"
echo "=========================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial HedAia setup - Teacher-trained AI for Arabic education"
    git branch -M main
    
    echo "📡 Please add your GitHub repository URL:"
    read -p "GitHub URL (https://github.com/username/hedaia.git): " GITHUB_URL
    
    if [ ! -z "$GITHUB_URL" ]; then
        git remote add origin $GITHUB_URL
        git push -u origin main
        echo "✅ Code pushed to GitHub"
    fi
fi

# Check environment variables
echo "🔧 Checking environment variables..."
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Creating template..."
    cat > .env.local << EOL
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key_here

# OpenAI Configuration  
OPENAI_API_KEY=your_openai_api_key_here

# NextAuth Configuration
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=http://localhost:3000
EOL
    echo "📝 Please fill in your .env.local file with your actual keys"
    echo "   Then run this script again"
    exit 1
fi

# Build the project
echo "🔨 Building HedAia..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please fix errors and try again."
    exit 1
fi

# Deploy options
echo ""
echo "🌐 Choose deployment option:"
echo "1) Vercel (Recommended)"
echo "2) Render (Great free tier)"
echo "3) Netlify"
echo "4) Railway"
echo "5) Manual instructions"

read -p "Enter your choice (1-5): " DEPLOY_CHOICE

case $DEPLOY_CHOICE in
    1)
        echo "🚀 Deploying to Vercel..."
        npx vercel --prod
        echo "✅ Deployment complete!"
        echo "📝 Don't forget to add your environment variables in Vercel dashboard"
        ;;
    2)
        echo "🎨 Preparing for Render..."
        echo ""
        echo "📋 Render Deployment Steps:"
        echo "1. Go to https://render.com"
        echo "2. Sign up with GitHub"
        echo "3. Click 'New +' → 'Web Service'"
        echo "4. Connect your GitHub repository"
        echo "5. Configure:"
        echo "   - Build Command: npm install && npm run build"
        echo "   - Start Command: npm start"
        echo "   - Plan: Free (750 hours/month)"
        echo "6. Add environment variables:"
        echo "   - NEXT_PUBLIC_SUPABASE_URL"
        echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
        echo "   - SUPABASE_SERVICE_ROLE_KEY"
        echo "   - OPENAI_API_KEY"
        echo "   - NEXTAUTH_SECRET (generate random)"
        echo "   - NEXTAUTH_URL (your render URL)"
        echo "7. Click 'Create Web Service'"
        echo ""
        echo "📖 Full guide: See DEPLOY_RENDER.md"
        ;;
    3)
        echo "📦 Preparing for Netlify..."
        echo "1. Go to https://netlify.com"
        echo "2. Connect your GitHub repository"
        echo "3. Set build command: npm run build"
        echo "4. Set publish directory: .next"
        echo "5. Add environment variables"
        ;;
    4)
        echo "🚂 Preparing for Railway..."
        echo "1. Go to https://railway.app"
        echo "2. Connect your GitHub repository"
        echo "3. Add environment variables"
        echo "4. Deploy automatically"
        ;;
    5)
        echo "📋 Manual Deployment Instructions:"
        echo ""
        echo "🔹 Vercel:"
        echo "   1. Go to https://vercel.com"
        echo "   2. Import your GitHub repository"
        echo "   3. Add environment variables"
        echo "   4. Deploy"
        echo ""
        echo "🔹 Render:"
        echo "   1. Go to https://render.com"
        echo "   2. Create Web Service"
        echo "   3. Build: npm install && npm run build"
        echo "   4. Start: npm start"
        echo "   5. Add environment variables"
        echo ""
        echo "🔹 Netlify:"
        echo "   1. Go to https://netlify.com"
        echo "   2. Connect GitHub repository"
        echo "   3. Build: npm run build"
        echo "   4. Publish: .next"
        echo ""
        echo "🔹 Railway:"
        echo "   1. Go to https://railway.app"
        echo "   2. Connect repository"
        echo "   3. Add environment variables"
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "🎉 HedAia deployment process complete!"
echo ""
echo "📚 Next Steps:"
echo "1. Set up your Supabase database (see README.md)"
echo "2. Configure your OpenAI API key"
echo "3. Test your deployment"
echo "4. Share HedAia with Arabic teachers worldwide!"
echo ""
echo "🌟 Built with ❤️ for Arabic education" 