# AEGIS - Netlify Deployment Guide

## 🎯 Overview
This guide will help you deploy all AEGIS frontend applications to Netlify and connect them together.

## 📋 Prerequisites
- Netlify account
- GitHub repository with your code
- All changes committed and pushed

## 🚀 Step-by-Step Deployment

### 1. Deploy Each Frontend App Separately

You need to deploy **5 separate sites** on Netlify:

#### a) Landing Page
- **Base directory**: `frontend/Landing Page`
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Suggested site name**: `aegis-landing-page`

#### b) IncidentAdmin
- **Base directory**: `frontend/IncidentAdmin`
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Suggested site name**: `aegis-incident-admin`

#### c) MapPublic
- **Base directory**: `frontend/mapPublic`
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Suggested site name**: `aegis-map-public`

#### d) MissionAdmin
- **Base directory**: `frontend/MissionAdmin`
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Suggested site name**: `aegis-mission-admin`

#### e) ReportIncidents
- **Base directory**: `frontend/ReportIncidents`
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Suggested site name**: `aegis-report-incidents`

### 2. Configure Environment Variables for Landing Page

After deploying all 5 sites, you'll have URLs like:
- `https://aegis-landing-page.netlify.app`
- `https://aegis-incident-admin.netlify.app`
- `https://aegis-map-public.netlify.app`
- `https://aegis-mission-admin.netlify.app`
- `https://aegis-report-incidents.netlify.app`

Now configure the Landing Page environment variables:

1. Go to your Landing Page site on Netlify
2. Navigate to: **Site settings** → **Environment variables** → **Add a variable**
3. Add these variables:

```
VITE_MAP_PUBLIC_URL = https://aegis-map-public.netlify.app
VITE_INCIDENT_ADMIN_URL = https://aegis-incident-admin.netlify.app
VITE_MISSION_ADMIN_URL = https://aegis-mission-admin.netlify.app
VITE_REPORT_INCIDENTS_URL = https://aegis-report-incidents.netlify.app
```

4. **Important**: After adding environment variables, trigger a new deploy:
   - Go to **Deploys** tab
   - Click **Trigger deploy** → **Deploy site**

### 3. Set Node Version (if needed)

All apps are configured to use Node 18 in their `netlify.toml` files. If you encounter build issues, verify this is set correctly.

## ✅ Verification

After deployment:

1. Visit your Landing Page URL
2. Click the "Get Alerts" button → should open the Map Public app
3. Click the "Admin Login" button → should open the Incident Admin app
4. All links should now work in production! 🎉

## 🔧 Troubleshooting

### Build Fails with "dist not found"
- **Solution**: We've already fixed this! All `vite.config.ts` files now use `outDir: 'dist'` to match Netlify's expectations.

### Video not displaying
- **Solution**: We've already fixed this! The hero video is now in the `public/` folder with the correct path.

### Buttons still point to localhost
- **Solution**: Make sure you added the environment variables in Netlify and redeployed the Landing Page.

### TypeScript errors during build
- These are usually warnings and won't stop the build. The build should complete successfully.

## 📝 Quick Checklist

- [ ] All 5 frontend apps deployed to Netlify
- [ ] Landing Page environment variables configured
- [ ] Landing Page redeployed after adding environment variables
- [ ] Tested all button links from Landing Page
- [ ] Video displays on Landing Page
- [ ] All apps load without errors

## 🌐 Production URLs Template

Update this with your actual URLs:

```
Landing Page:        https://aegis-landing-page.netlify.app
Incident Admin:      https://aegis-incident-admin.netlify.app
Map Public:          https://aegis-map-public.netlify.app
Mission Admin:       https://aegis-mission-admin.netlify.app
Report Incidents:    https://aegis-report-incidents.netlify.app
```

## 📚 Additional Resources

- [Netlify Environment Variables Docs](https://docs.netlify.com/environment-variables/overview/)
- [Vite Environment Variables Guide](https://vitejs.dev/guide/env-and-mode.html)
- [Netlify Build Configuration](https://docs.netlify.com/configure-builds/overview/)
