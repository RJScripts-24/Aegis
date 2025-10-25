# Deployment Checklist

## ✅ Completed Fixes

- [x] Fixed video path issue (moved from `src/` to `public/`)
- [x] Fixed vite.config.ts outDir mismatch (changed `build` to `dist` in all apps)
- [x] Added environment variables for dynamic URLs in Landing Page
- [x] Created TypeScript declarations for environment variables
- [x] Fixed Landing Page TypeScript types compatibility

## 🚀 Next Steps - You Need To Do These

### 1. Commit and Push Changes
```bash
git add .
git commit -m "Fix deployment issues: video path, build output, and dynamic URLs"
git push
```

### 2. Deploy Each App on Netlify

Deploy these 5 apps as **separate sites** on Netlify:

- [ ] **Landing Page** 
  - Base: `frontend/Landing Page`
  - Build: `npm run build`
  - Publish: `dist`
  
- [ ] **IncidentAdmin**
  - Base: `frontend/IncidentAdmin`
  - Build: `npm run build`
  - Publish: `dist`
  
- [ ] **MapPublic**
  - Base: `frontend/mapPublic`
  - Build: `npm run build`
  - Publish: `dist`
  
- [ ] **MissionAdmin**
  - Base: `frontend/MissionAdmin`
  - Build: `npm run build`
  - Publish: `dist`
  
- [ ] **ReportIncidents**
  - Base: `frontend/ReportIncidents`
  - Build: `npm run build`
  - Publish: `dist`

### 3. Configure Landing Page Environment Variables

After all deployments, get the URLs and add to Landing Page on Netlify:

Go to: Landing Page Site → Site settings → Environment variables

Add these (replace with your actual URLs):

```
VITE_MAP_PUBLIC_URL=https://your-map-public.netlify.app
VITE_INCIDENT_ADMIN_URL=https://your-incident-admin.netlify.app
VITE_MISSION_ADMIN_URL=https://your-mission-admin.netlify.app
VITE_REPORT_INCIDENTS_URL=https://your-report-incidents.netlify.app
```

### 4. Redeploy Landing Page

After adding environment variables:
- [ ] Go to Deploys tab
- [ ] Click "Trigger deploy" → "Deploy site"

### 5. Test Everything

- [ ] Landing Page loads correctly
- [ ] Video displays in hero section
- [ ] "Get Alerts" button opens Map Public app
- [ ] "Admin Login" button opens Incident Admin app
- [ ] No localhost URLs in production

## 📋 Files Changed

- `frontend/Landing Page/vite.config.ts` - Fixed outDir
- `frontend/Landing Page/src/App.tsx` - Added environment variables
- `frontend/Landing Page/src/vite-env.d.ts` - TypeScript declarations
- `frontend/Landing Page/.env` - Local environment variables
- `frontend/Landing Page/.env.example` - Environment template
- `frontend/Landing Page/package.json` - Fixed TypeScript types
- `frontend/Landing Page/public/hero.mp4` - Moved video file
- `frontend/IncidentAdmin/vite.config.ts` - Fixed outDir
- `frontend/MissionAdmin/vite.config.ts` - Fixed outDir
- `frontend/mapPublic/vite.config.ts` - Fixed outDir
- `frontend/ReportIncidents/vite.config.ts` - Fixed outDir
- `frontend/LocationPopup/vite.config.ts` - Fixed outDir

## 📄 Documentation Added

- `NETLIFY_DEPLOYMENT_GUIDE.md` - Complete deployment guide
- `frontend/Landing Page/DEPLOYMENT.md` - Environment setup guide

## 🎯 Expected Results

After completing all steps:
1. ✅ Hero video displays on deployed Landing Page
2. ✅ Buttons navigate to deployed apps (not localhost)
3. ✅ All apps build and deploy successfully
4. ✅ No errors in browser console
