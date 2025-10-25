# Navigation Flow Guide

## Current Navigation Structure

```
Landing Page (/)
├── "Get Alerts" Button → /map (Map Public)
└── "Admin Login" Button → /admin/incidents (Incident Admin)

Map Public (/map)
├── "Report Incident" Button → /report-incident (Report Incidents)
└── "Map Layers" Panel → Opens LayersPanel

Location Popup (/location)
└── After Location Permission → /map (Map Public)

Mission Admin (/admin/missions)
├── "Incidents" Menu → /admin/incidents (Incident Admin)
└── "Log Out" Menu → / (Landing Page)

Incident Admin (/admin/incidents)
└── (No navigation buttons currently)

Report Incidents (/report-incident)
└── After Submission → Shows success message
```

## URL Mapping

### Development (with .env)
```
Landing Page:     http://localhost:5173
Map Public:       http://localhost:3000
Location Popup:   http://localhost:3001
Report Incidents: http://localhost:3002
Incident Admin:   http://localhost:3004
Mission Admin:    http://localhost:3003
Backend API:      http://localhost:5000
```

### Production (relative paths)
```
Landing Page:     https://yourdomain.com/
Map Public:       https://yourdomain.com/map
Location Popup:   https://yourdomain.com/location
Report Incidents: https://yourdomain.com/report-incident
Incident Admin:   https://yourdomain.com/admin/incidents
Mission Admin:    https://yourdomain.com/admin/missions
Backend API:      https://api.yourdomain.com/api
```

## Environment Variables by App

### Landing Page
```bash
VITE_MAP_PUBLIC_URL=/map
VITE_INCIDENT_ADMIN_URL=/admin/incidents
```

### Map Public
```bash
VITE_API_URL=/api
VITE_REPORT_INCIDENTS_URL=/report-incident
```

### Location Popup
```bash
VITE_MAP_PUBLIC_URL=/map
```

### Mission Admin
```bash
VITE_API_URL=/api
VITE_INCIDENT_ADMIN_URL=/admin/incidents
VITE_LANDING_PAGE_URL=/
```

### Incident Admin
```bash
VITE_API_URL=/api
```

### Report Incidents
```bash
VITE_API_URL=/api
VITE_SOCKET_URL=ws://your-domain.com
```

## API Endpoints

All frontend apps now use relative API paths:

```typescript
// Old way (hardcoded)
fetch('http://localhost:5000/api/incidents')

// New way (flexible)
const apiUrl = import.meta.env.VITE_API_URL || '/api';
fetch(`${apiUrl}/incidents`)
```

### Available API Endpoints
- `GET /api/incidents/admin` - Get all incidents (admin)
- `PUT /api/incidents/:id` - Update incident status
- `POST /api/incidents` - Create new incident
- `GET /api/alerts/broadcast` - Get broadcast alerts
- `POST /api/alerts/broadcast` - Send broadcast alert

## Deployment Scenarios

### Scenario 1: Single Domain (Recommended)
All apps deployed on same domain with different paths:
```
https://aegis.com/              → Landing Page
https://aegis.com/map           → Map Public
https://aegis.com/location      → Location Popup
https://aegis.com/report-incident → Report Incidents
https://aegis.com/admin/incidents → Incident Admin
https://aegis.com/admin/missions  → Mission Admin
https://api.aegis.com/api       → Backend API
```

### Scenario 2: Multi-Domain
Each app on different subdomain:
```
https://aegis.com/              → Landing Page
https://map.aegis.com/          → Map Public
https://location.aegis.com/     → Location Popup
https://report.aegis.com/       → Report Incidents
https://admin.aegis.com/incidents → Incident Admin
https://admin.aegis.com/missions  → Mission Admin
https://api.aegis.com/api       → Backend API
```

Set environment variables accordingly:
```bash
VITE_MAP_PUBLIC_URL=https://map.aegis.com
VITE_INCIDENT_ADMIN_URL=https://admin.aegis.com/incidents
# ... etc
```

## Navigation Examples

### User Journey 1: View Alerts
1. User lands on Landing Page (/)
2. Clicks "Get Alerts" → Redirected to /map
3. Views map with live incidents
4. Clicks "Report Incident" → Redirected to /report-incident
5. Submits incident → Success message shown

### User Journey 2: Admin Management
1. Admin lands on Landing Page (/)
2. Clicks "Admin Login" → Redirected to /admin/incidents
3. Views all incidents on map
4. Updates incident status
5. Needs to prioritize → Navigates via menu to /admin/missions
6. Sets priorities and sends rescue teams
7. Broadcasts alert to public

### User Journey 3: Location Permission
1. User opens /location (Location Popup)
2. Grants location permission
3. Automatically redirected to /map
4. Map centers on user's location

## Best Practices

### 1. Always Use Environment Variables
```typescript
// ✅ Good
window.location.href = import.meta.env.VITE_MAP_PUBLIC_URL || '/map';

// ❌ Bad
window.location.href = 'http://localhost:3000';
```

### 2. Use Relative Paths in Production
```bash
# .env.production
VITE_MAP_PUBLIC_URL=/map
VITE_API_URL=/api
```

### 3. Use Absolute URLs for External APIs
```bash
# .env.production
VITE_API_URL=https://api.yourdomain.com/api
```

### 4. Test All Navigation Paths
- Click every button and link
- Verify redirects work correctly
- Check API calls succeed

## Troubleshooting

### Issue: Navigation not working
**Solution**: Check that environment variables are set correctly

### Issue: API calls failing
**Solution**: Verify `VITE_API_URL` is correct and backend is running

### Issue: CORS errors
**Solution**: Update backend CORS configuration to include your frontend URLs

### Issue: 404 on navigation
**Solution**: Configure your web server (Nginx/Apache) to handle client-side routing:
```nginx
# Nginx example
location / {
    try_files $uri $uri/ /index.html;
}
```

---

**Last Updated**: October 25, 2025
