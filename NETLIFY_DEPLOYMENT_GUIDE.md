# Netlify Deployment Guide for Aegis Frontend

## 📋 Prerequisites

- GitHub account with your Aegis repo
- Netlify account (sign up at [netlify.com](https://netlify.com))
- Backend already deployed (you have this ✅)

## 🚀 Deployment Steps

### For Each Frontend App (Deploy 6 times):

1. **Go to Netlify Dashboard**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"

2. **Connect to Git**
   - Select "Deploy with GitHub"
   - Authorize Netlify to access your GitHub account
   - Choose the `Aegis` repository

3. **Configure Build Settings**

   #### For Landing Page:
   ```
   Site name: aegis-landing (or your choice)
   Base directory: frontend/Landing Page
   Build command: npm run build
   Publish directory: dist
   ```

   #### For Map Public:
   ```
   Site name: aegis-map
   Base directory: frontend/mapPublic
   Build command: npm run build
   Publish directory: dist
   ```

   #### For Location Popup:
   ```
   Site name: aegis-location
   Base directory: frontend/LocationPopup
   Build command: npm run build
   Publish directory: dist
   ```

   #### For Report Incidents:
   ```
   Site name: aegis-report
   Base directory: frontend/ReportIncidents
   Build command: npm run build
   Publish directory: dist
   ```

   #### For Mission Admin:
   ```
   Site name: aegis-mission-admin
   Base directory: frontend/MissionAdmin
   Build command: npm run build
   Publish directory: dist
   ```

   #### For Incident Admin:
   ```
   Site name: aegis-incident-admin
   Base directory: frontend/IncidentAdmin
   Build command: npm run build
   Publish directory: dist
   ```

4. **Set Environment Variables**
   
   After creating the site, go to **Site settings → Environment variables** and add these:

   ### Landing Page Environment Variables:
   ```
   VITE_API_URL = https://your-backend-url.com/api
   VITE_MAP_PUBLIC_URL = https://aegis-map.netlify.app
   VITE_INCIDENT_ADMIN_URL = https://aegis-incident-admin.netlify.app
   VITE_MISSION_ADMIN_URL = https://aegis-mission-admin.netlify.app
   VITE_REPORT_INCIDENTS_URL = https://aegis-report.netlify.app
   VITE_LANDING_PAGE_URL = https://aegis-landing.netlify.app
   ```

   ### Map Public Environment Variables:
   ```
   VITE_API_URL = https://your-backend-url.com/api
   VITE_REPORT_INCIDENTS_URL = https://aegis-report.netlify.app
   VITE_LANDING_PAGE_URL = https://aegis-landing.netlify.app
   ```

   ### Location Popup Environment Variables:
   ```
   VITE_API_URL = https://your-backend-url.com/api
   VITE_MAP_PUBLIC_URL = https://aegis-map.netlify.app
   ```

   ### Report Incidents Environment Variables:
   ```
   VITE_API_URL = https://your-backend-url.com/api
   VITE_SOCKET_URL = https://your-backend-url.com
   VITE_LANDING_PAGE_URL = https://aegis-landing.netlify.app
   ```

   ### Mission Admin Environment Variables:
   ```
   VITE_API_URL = https://your-backend-url.com/api
   VITE_INCIDENT_ADMIN_URL = https://aegis-incident-admin.netlify.app
   VITE_LANDING_PAGE_URL = https://aegis-landing.netlify.app
   ```

   ### Incident Admin Environment Variables:
   ```
   VITE_API_URL = https://your-backend-url.com/api
   ```

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete (1-3 minutes)
   - You'll get a URL like `https://aegis-landing.netlify.app`

6. **Repeat for all 6 apps**

## 🔄 After First Deployment

Once you have all Netlify URLs, **update the environment variables** to use the actual Netlify URLs instead of placeholder ones.

Go to each site:
- Site settings → Environment variables
- Update URLs with actual deployed URLs
- Click "Clear cache and deploy site" to rebuild

## 📝 Important Notes

### Backend CORS Configuration
Update your backend to allow your Netlify domains:

```javascript
// backend/src/config/index.js
corsOrigin: process.env.CORS_ORIGIN || 
  'https://aegis-landing.netlify.app,https://aegis-map.netlify.app,https://aegis-report.netlify.app,https://aegis-incident-admin.netlify.app,https://aegis-mission-admin.netlify.app,https://aegis-location.netlify.app'
```

### Auto-Deploy
Netlify automatically redeploys when you push to your main branch on GitHub.

### Custom Domains (Optional)
You can add custom domains in Netlify:
- Site settings → Domain management → Add custom domain
- Examples:
  - `aegis.yourdomain.com` → Landing Page
  - `map.aegis.yourdomain.com` → Map Public
  - etc.

### Build Configuration
All settings are in `netlify.toml` files (already configured ✅)

## 🎯 Deployment Checklist

- [ ] Deploy Landing Page
- [ ] Deploy Map Public
- [ ] Deploy Location Popup
- [ ] Deploy Report Incidents
- [ ] Deploy Mission Admin
- [ ] Deploy Incident Admin
- [ ] Update all environment variables with actual Netlify URLs
- [ ] Update backend CORS configuration
- [ ] Test navigation between apps
- [ ] Test API calls to backend
- [ ] Verify all features work

## 🚨 Troubleshooting

### Build Fails
- Check build logs in Netlify deploy log
- Verify `npm run build` works locally
- Check if all dependencies are in `package.json`
- Verify base directory is correct

### Navigation Not Working
- Verify environment variables are set correctly
- Check that URLs don't have trailing slashes
- Ensure all apps are deployed and accessible
- Check browser console for errors

### API Calls Failing
- Verify `VITE_API_URL` points to your deployed backend
- Check backend CORS configuration
- Verify backend is accessible from Netlify
- Check Network tab in browser DevTools

### "Page Not Found" on Refresh
- Already handled by `netlify.toml` redirects (✅)
- If still occurring, check the `[[redirects]]` section in netlify.toml

## 💡 Pro Tips

1. **Use Branch Deploys**: Each branch gets its own preview URL
2. **Deploy Previews**: Every PR gets an automatic preview
3. **Rollback**: Easy one-click rollback to previous deploys
4. **Analytics**: Enable Netlify Analytics for traffic insights
5. **Forms**: Use Netlify Forms for contact forms (no backend needed)

## ✅ Success Indicators

Your deployment is successful when:
- All 6 apps are deployed and accessible
- You can navigate between apps using buttons/links
- API calls to backend work
- No console errors in browser
- All features function as expected

---

**Your URLs will be:**
- https://aegis-landing.netlify.app
- https://aegis-map.netlify.app
- https://aegis-location.netlify.app
- https://aegis-report.netlify.app
- https://aegis-mission-admin.netlify.app
- https://aegis-incident-admin.netlify.app

## 🎉 You're Ready to Deploy on Netlify!

## 📋 Prerequisites

- GitHub account with your Aegis repo
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Backend already deployed (you have this ✅)

## 🚀 Deployment Steps

### For Each Frontend App (Deploy 6 times):

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Click "Add New" → "Project"

2. **Import Git Repository**
   - Select your GitHub account
   - Choose the `Aegis` repository
   - Click "Import"

3. **Configure Project Settings**

   #### For Landing Page:
   ```
   Project Name: aegis-landing (or your choice)
   Framework Preset: Vite
   Root Directory: frontend/Landing Page
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

   #### For Map Public:
   ```
   Project Name: aegis-map
   Framework Preset: Vite
   Root Directory: frontend/mapPublic
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

   #### For Location Popup:
   ```
   Project Name: aegis-location
   Framework Preset: Vite
   Root Directory: frontend/LocationPopup
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

   #### For Report Incidents:
   ```
   Project Name: aegis-report
   Framework Preset: Vite
   Root Directory: frontend/ReportIncidents
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

   #### For Mission Admin:
   ```
   Project Name: aegis-mission-admin
   Framework Preset: Vite
   Root Directory: frontend/MissionAdmin
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

   #### For Incident Admin:
   ```
   Project Name: aegis-incident-admin
   Framework Preset: Vite
   Root Directory: frontend/IncidentAdmin
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Set Environment Variables**
   
   Click "Environment Variables" and add these for each app:

   ### Landing Page Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   VITE_MAP_PUBLIC_URL=https://aegis-map.vercel.app
   VITE_INCIDENT_ADMIN_URL=https://aegis-incident-admin.vercel.app
   VITE_MISSION_ADMIN_URL=https://aegis-mission-admin.vercel.app
   VITE_REPORT_INCIDENTS_URL=https://aegis-report.vercel.app
   VITE_LANDING_PAGE_URL=https://aegis-landing.vercel.app
   ```

   ### Map Public Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   VITE_REPORT_INCIDENTS_URL=https://aegis-report.vercel.app
   VITE_LANDING_PAGE_URL=https://aegis-landing.vercel.app
   ```

   ### Location Popup Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   VITE_MAP_PUBLIC_URL=https://aegis-map.vercel.app
   ```

   ### Report Incidents Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   VITE_SOCKET_URL=https://your-backend-url.com
   VITE_LANDING_PAGE_URL=https://aegis-landing.vercel.app
   ```

   ### Mission Admin Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   VITE_INCIDENT_ADMIN_URL=https://aegis-incident-admin.vercel.app
   VITE_LANDING_PAGE_URL=https://aegis-landing.vercel.app
   ```

   ### Incident Admin Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (1-3 minutes)
   - You'll get a URL like `https://aegis-landing.vercel.app`

6. **Repeat for all 6 apps**

## 🔄 After First Deployment

Once you have all Vercel URLs, **update the environment variables** to use the actual Vercel URLs instead of placeholder ones.

Example:
```
VITE_MAP_PUBLIC_URL=https://aegis-map-abc123.vercel.app
```

Vercel will auto-redeploy when you update environment variables.

## 📝 Important Notes

### Backend CORS Configuration
Update your backend to allow your Vercel domains:

```javascript
// backend/src/config/index.js
corsOrigin: process.env.CORS_ORIGIN || 
  'https://aegis-landing.vercel.app,https://aegis-map.vercel.app,https://aegis-report.vercel.app,https://aegis-incident-admin.vercel.app,https://aegis-mission-admin.vercel.app,https://aegis-location.vercel.app'
```

### Auto-Deploy
Vercel automatically redeploys when you push to your main branch on GitHub.

### Custom Domains (Optional)
You can add custom domains in Vercel project settings:
- `aegis.yourdomain.com` → Landing Page
- `map.aegis.yourdomain.com` → Map Public
- etc.

## 🎯 Deployment Checklist

- [ ] Deploy Landing Page
- [ ] Deploy Map Public
- [ ] Deploy Location Popup
- [ ] Deploy Report Incidents
- [ ] Deploy Mission Admin
- [ ] Deploy Incident Admin
- [ ] Update all environment variables with actual Vercel URLs
- [ ] Update backend CORS configuration
- [ ] Test navigation between apps
- [ ] Test API calls to backend
- [ ] Verify all features work

## 🚨 Troubleshooting

### Build Fails
- Check if `package.json` exists in the root directory specified
- Verify `npm run build` works locally
- Check build logs in Vercel dashboard

### Navigation Not Working
- Verify environment variables are set correctly
- Check that URLs don't have trailing slashes
- Ensure all apps are deployed and accessible

### API Calls Failing
- Verify `VITE_API_URL` points to your deployed backend
- Check backend CORS configuration
- Verify backend is accessible from Vercel (not localhost)

## ✅ Success Indicators

Your deployment is successful when:
- All 6 apps are deployed and accessible
- You can navigate between apps using buttons/links
- API calls to backend work
- No console errors in browser
- All features function as expected

---

**Your URLs will be:**
- https://aegis-landing.vercel.app
- https://aegis-map.vercel.app
- https://aegis-location.vercel.app
- https://aegis-report.vercel.app
- https://aegis-mission-admin.vercel.app
- https://aegis-incident-admin.vercel.app
