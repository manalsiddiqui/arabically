# 🚀 Deploy HedAia on Render (Free)

Render offers a generous free tier perfect for hosting HedAia. Here's how to deploy your teacher-trained Arabic AI assistant.

## 📋 **Render Free Tier Benefits**

- ✅ **750 hours/month** (enough for 24/7 uptime)
- ✅ **Custom domains** 
- ✅ **Automatic HTTPS**
- ✅ **Git-based deployments**
- ✅ **Environment variables**
- ✅ **Build caching**

## 🛠 **Prerequisites**

1. **GitHub account** with your HedAia code
2. **Render account** (free at [render.com](https://render.com))
3. **Environment variables** ready (Supabase + OpenAI keys)

## 🚀 **Step-by-Step Deployment**

### **Step 1: Prepare Your Repository**

```bash
# Make sure your code is on GitHub
git init
git add .
git commit -m "HedAia - Teacher-trained AI for Arabic education"
git branch -M main
git remote add origin https://github.com/yourusername/hedaia.git
git push -u origin main
```

### **Step 2: Create Render Account**

1. Go to [render.com](https://render.com)
2. Sign up with your **GitHub account**
3. Connect your GitHub repositories

### **Step 3: Create Environment Group (Optional but Recommended)**

1. In Render dashboard, go to **"Environment Groups"**
2. Click **"New Environment Group"**
3. Name it: `hedaia-secrets`
4. Add your environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key
OPENAI_API_KEY=your_openai_api_key
```

### **Step 4: Deploy Web Service**

1. Click **"New +"** → **"Web Service"**
2. Connect your **GitHub repository**
3. Configure the service:

**Basic Settings:**
- **Name**: `hedaia`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`

**Build & Deploy:**
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

**Pricing:**
- **Plan**: `Free` (750 hours/month)

### **Step 5: Environment Variables**

Add these environment variables in Render:

```env
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=[Your Supabase URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[Your Supabase Anon Key]
SUPABASE_SERVICE_ROLE_KEY=[Your Supabase Service Key]
OPENAI_API_KEY=[Your OpenAI API Key]
NEXTAUTH_SECRET=[Generate a random string]
NEXTAUTH_URL=https://hedaia-[random].onrender.com
```

**🔧 Pro Tip**: Use the Environment Group you created in Step 3!

### **Step 6: Deploy!**

1. Click **"Create Web Service"**
2. Render will automatically:
   - ✅ Clone your repository
   - ✅ Install dependencies
   - ✅ Build your Next.js app
   - ✅ Deploy to a live URL

**Deployment takes ~5-10 minutes**

## 🌐 **Access Your Live HedAia**

Your HedAia will be available at:
```
https://hedaia-[random].onrender.com
```

## 🎛 **Advanced Configuration**

### **Custom Domain (Optional)**

1. In your service settings, go to **"Settings"**
2. Scroll to **"Custom Domains"**
3. Add your domain: `hedaia.yourdomain.com`
4. Update DNS records as instructed

### **Auto-Deploy**

Render automatically deploys when you push to your main branch:

```bash
# Make changes to your code
git add .
git commit -m "Update HedAia features"
git push origin main
# Render automatically deploys! 🚀
```

### **Health Checks**

Render automatically monitors your app health at `/` endpoint.

## 📊 **Monitoring & Logs**

- **Logs**: View real-time logs in Render dashboard
- **Metrics**: Monitor CPU, memory, and response times
- **Alerts**: Get notified of deployment issues

## 🔧 **Troubleshooting**

### **Build Failures**

1. Check build logs in Render dashboard
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version compatibility

### **Environment Variable Issues**

1. Double-check all env vars are set
2. Ensure no typos in variable names
3. Check Supabase and OpenAI keys are valid

### **Deployment Timeouts**

1. Free tier has build time limits
2. Optimize your build process
3. Consider removing unused dependencies

## 💰 **Cost Breakdown**

```
Render (Free Tier):     $0/month
Supabase (Free Tier):   $0/month
OpenAI (Pay-as-you-go): ~$1-5/month
Total:                  ~$1-5/month
```

## 🚀 **Alternative: One-Click Deploy**

Use this button for instant deployment:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/yourusername/hedaia)

## 📋 **Post-Deployment Checklist**

- [ ] ✅ App loads successfully
- [ ] ✅ Environment variables configured
- [ ] ✅ Supabase connection working
- [ ] ✅ OpenAI API responding
- [ ] ✅ File uploads working
- [ ] ✅ Arabic/English switching works
- [ ] ✅ Custom domain configured (optional)

## 🎯 **Next Steps**

1. **Test your deployment** with sample lesson plans
2. **Share with Arabic teachers** for feedback
3. **Monitor usage** and optimize as needed
4. **Scale up** to paid plans if you need more resources

## 🆘 **Need Help?**

- **Render Docs**: [render.com/docs](https://render.com/docs)
- **HedAia Issues**: Create an issue in your GitHub repository
- **Community**: Join Render's Discord for support

---

**🌟 Your HedAia is now live and helping Arabic teachers worldwide!**

**Built with ❤️ for Arabic education** 