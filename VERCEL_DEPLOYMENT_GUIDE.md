# Vercel Deployment Guide for Aegis Frontend

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
