# Netlify Deployment Guide

This guide will help you deploy the PM Kisan Yojana Farmer Insurance Platform to Netlify.

## Prerequisites

1. A [Netlify account](https://app.netlify.com/signup) (free tier available)
2. Your repository pushed to GitHub
3. API keys for:
   - Supabase (optional - works with demo data without it)
   - Google Gemini API

## Quick Deployment Steps

### Option 1: Deploy via Netlify UI (Recommended)

1. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" > "Import an existing project"
   - Choose GitHub and authorize Netlify
   - Select your `farmer-website` repository

2. **Configure Build Settings**
   
   The build settings are already configured in `netlify.toml`, but verify:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18

3. **Add Environment Variables**
   
   Go to "Site settings" > "Environment variables" and add:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```
   
   **Note**: The app works with demo data if you don't add Supabase variables.

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site
   - Your site will be live at a URL like `https://your-site-name.netlify.app`

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Netlify Site**
   ```bash
   netlify init
   ```
   
   Follow the prompts:
   - Create & configure a new site
   - Choose your team
   - Site name (or leave blank for random)
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Set Environment Variables**
   ```bash
   netlify env:set VITE_GEMINI_API_KEY "your_api_key_here"
   netlify env:set VITE_SUPABASE_URL "your_supabase_url"
   netlify env:set VITE_SUPABASE_ANON_KEY "your_supabase_key"
   ```

5. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## Configuration Files

This repository includes the following Netlify configuration files:

### `netlify.toml`
- Defines build settings and commands
- Configures redirects for SPA routing
- Sets up security headers and caching
- Optimizes PWA files

### `public/_redirects`
- Ensures all routes redirect to `index.html` for React Router
- Enables client-side routing

### `public/_headers`
- Security headers (XSS protection, frame options, etc.)
- Cache-Control headers for optimal performance
- PWA-specific caching rules

## Post-Deployment

### 1. Custom Domain (Optional)
- Go to "Domain settings" in Netlify
- Click "Add custom domain"
- Follow the DNS configuration instructions

### 2. HTTPS
- Netlify automatically provides free SSL certificates
- HTTPS is enabled by default

### 3. Continuous Deployment
- Netlify automatically deploys when you push to your main branch
- You can configure deploy contexts for different branches

### 4. Deploy Previews
- Pull requests automatically get preview deployments
- Preview URLs are posted as comments on PRs

## Environment Variables Required

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_GEMINI_API_KEY` | Yes | Google Gemini API key for AI features |
| `VITE_SUPABASE_URL` | No | Supabase project URL (optional) |
| `VITE_SUPABASE_ANON_KEY` | No | Supabase anonymous key (optional) |

### Getting API Keys

**Gemini API Key:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key and add it to Netlify environment variables

**Supabase (Optional):**
1. Create account at [Supabase](https://supabase.com)
2. Create a new project
3. Get URL and anon key from project settings > API

## Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version (should be 18+)

### Routes Not Working (404 errors)
- Verify `_redirects` file is in `public/` folder
- Check that `netlify.toml` has the redirect rule

### Environment Variables Not Working
- Ensure variables start with `VITE_` prefix
- Redeploy after adding/changing environment variables
- Check variable names match exactly (case-sensitive)

### PWA Not Working
- Clear browser cache
- Check that service worker files are being served correctly
- Verify manifest.json is accessible

## Performance Optimization

The deployment is configured with:
- ✅ Long-term caching for static assets (1 year)
- ✅ No caching for HTML files (always fresh)
- ✅ Security headers enabled
- ✅ PWA support with service worker
- ✅ SPA routing support

## Monitoring

- **Analytics**: Enable Netlify Analytics in site settings
- **Functions**: If you add serverless functions later, they'll work automatically
- **Forms**: Netlify Forms can be added without backend code

## Need Help?

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Community](https://answers.netlify.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#netlify)

---

**Your site is now ready to deploy on Netlify! 🚀**
