# Quick Reference: URL Changes

## ✅ What Changed

### Navigation Links
All hardcoded `http://localhost:PORT` URLs are now **relative paths** or **environment variables**.

## 📝 Quick Examples

### Before
```typescript
// ❌ Hardcoded localhost URL
window.location.href = 'http://localhost:3000/about';
```

### After
```typescript
// ✅ Relative path with environment variable fallback
window.location.href = import.meta.env.VITE_MAP_PUBLIC_URL || '/map';
```

## 🎯 Default Paths (No .env needed)

| App | Default Path |
|-----|--------------|
| Landing Page | `/` |
| Map Public | `/map` |
| Location Popup | `/location` |
| Report Incidents | `/report-incident` |
| Incident Admin | `/admin/incidents` |
| Mission Admin | `/admin/missions` |
| Backend API | `/api` |

## 🔧 For Development (Optional)

Create a `.env` file in each frontend app:

```bash
# For full localhost URLs (development only)
VITE_API_URL=http://localhost:5000/api
VITE_MAP_PUBLIC_URL=http://localhost:3000
VITE_INCIDENT_ADMIN_URL=http://localhost:3004
VITE_MISSION_ADMIN_URL=http://localhost:3003
VITE_REPORT_INCIDENTS_URL=http://localhost:3002
VITE_LANDING_PAGE_URL=http://localhost:5173
```

## 🚀 For Production

The default relative paths (`/map`, `/admin/incidents`, etc.) work automatically!

Just set your API URL:
```bash
VITE_API_URL=https://api.yourdomain.com/api
```

## 📦 Files Changed

### Frontend Apps
- ✅ `frontend/Landing Page/src/App.tsx`
- ✅ `frontend/mapPublic/src/App.tsx`
- ✅ `frontend/LocationPopup/src/App.tsx`
- ✅ `frontend/MissionAdmin/src/App.tsx`
- ✅ `frontend/IncidentAdmin/src/App.tsx`
- ✅ `frontend/ReportIncidents/src/config/api.ts`
- ✅ `frontend/mapPublic/src/components/BroadcastNotification.tsx`

### TypeScript Definitions
- ✅ All `vite-env.d.ts` files updated/created

### Environment Examples
- ✅ All `.env.example` files updated/created

## 🧪 Testing

1. Start your apps
2. Test navigation between pages
3. Verify API calls work
4. Check that no 404 errors occur

## 💡 Key Benefits

- ✅ **Production Ready** - Deploy anywhere without code changes
- ✅ **Flexible** - Easy to configure via environment variables
- ✅ **Faster** - Relative paths = better performance
- ✅ **Clean** - No hardcoded URLs in code

---

**Ready to deploy!** 🎉
