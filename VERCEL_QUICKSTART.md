# Vercel Deployment - Quick Start Guide

## ✅ What's Been Done

Your app has been converted from Express backend to Vercel Serverless Functions. All changes are committed locally and ready to push to GitHub.

---

## 🚀 Deploy to Vercel in 5 Minutes

### Step 1: Push to GitHub

```bash
cd /path/to/quran_ai_chat
git push origin main
```

**Note:** If you get a credentials error, you need to authenticate with GitHub:

```bash
# Option A: Use GitHub CLI (recommended)
gh auth login

# Option B: Use Personal Access Token
# Go to: https://github.com/settings/tokens
# Create a token with 'repo' scope
# Then use it as password when pushing
```

---

### Step 2: Import to Vercel

1. Go to **[vercel.com/new](https://vercel.com/new)**
2. Click **"Import Git Repository"**
3. Select your `quran_ai_chat` repository
4. Click **"Import"**

---

### Step 3: Configure Build Settings

Vercel should auto-detect these settings, but verify:

| Setting | Value |
|---------|-------|
| Framework Preset | Other |
| Build Command | `pnpm run build` |
| Output Directory | `dist/public` |
| Install Command | `pnpm install` |

---

### Step 4: Add Environment Variable

1. Click **"Environment Variables"**
2. Add this variable:

```
Name:  OPENAI_API_KEY
Value: sk-geoHuzPn7A9VrxFTr7nw9x
```

3. Select all environments (Production, Preview, Development)
4. Click **"Save"**

---

### Step 5: Deploy!

1. Click **"Deploy"**
2. Wait 2-5 minutes for build to complete
3. Vercel will give you a URL like: `https://quran-ai-chat.vercel.app`

---

## ✅ Test Your Deployment

Visit your Vercel URL and test:

- ✅ Homepage loads
- ✅ AI Chat works (sends messages and gets responses)
- ✅ TTS plays audio
- ✅ Quran reading works
- ✅ Prayer times display
- ✅ **NO REGISTRATION POPUP!** 🎉

---

## 🔄 Future Updates

After initial deployment, updating is automatic:

```bash
# Make changes to your code
# Then:
git add .
git commit -m "Your update message"
git push origin main
```

Vercel automatically detects the push and deploys the new version!

---

## 📱 Convert to Mobile App (Later)

Once Vercel deployment works, you can convert to iOS/Android app using **Capacitor**:

1. Install Capacitor: `pnpm add @capacitor/core @capacitor/cli`
2. Initialize: `npx cap init`
3. Add platforms: `npx cap add ios` and `npx cap add android`
4. Build: `pnpm run build && npx cap sync`
5. Open in Xcode/Android Studio: `npx cap open ios` or `npx cap open android`

---

## 🆘 Need Help?

See the full deployment guide: `VERCEL_DEPLOYMENT.md`

Or contact me if you have issues!

---

**Good luck! 🚀**
