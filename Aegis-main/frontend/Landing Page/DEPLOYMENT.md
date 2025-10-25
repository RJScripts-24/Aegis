# Landing Page - Environment Setup

## For Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. The default values in `.env` use localhost URLs for local development.

## For Netlify Deployment

You need to set environment variables in Netlify for each deployed app URL:

### Step 1: Deploy Each Frontend App to Netlify

Deploy these apps separately on Netlify:
- **IncidentAdmin** → Will get a URL like `https://aegis-incident-admin.netlify.app`
- **mapPublic** → Will get a URL like `https://aegis-map-public.netlify.app`
- **MissionAdmin** → Will get a URL like `https://aegis-mission-admin.netlify.app`
- **ReportIncidents** → Will get a URL like `https://aegis-report-incidents.netlify.app`

### Step 2: Configure Environment Variables in Netlify

For the **Landing Page** deployment on Netlify:

1. Go to your Landing Page site in Netlify
2. Navigate to **Site settings** → **Environment variables**
3. Add these environment variables with your deployed URLs:

```
VITE_MAP_PUBLIC_URL=https://your-map-public-app.netlify.app
VITE_INCIDENT_ADMIN_URL=https://your-incident-admin-app.netlify.app
VITE_MISSION_ADMIN_URL=https://your-mission-admin-app.netlify.app
VITE_REPORT_INCIDENTS_URL=https://your-report-incidents-app.netlify.app
```

4. Redeploy the site for the changes to take effect

### Step 3: Verify

After setting the environment variables and redeploying, the buttons on the Landing Page should now navigate to your deployed apps instead of localhost.

## Environment Variables

| Variable | Description | Default (Local) |
|----------|-------------|----------------|
| `VITE_MAP_PUBLIC_URL` | URL for the public map application | `http://localhost:3001` |
| `VITE_INCIDENT_ADMIN_URL` | URL for the incident admin panel | `http://localhost:3003` |
| `VITE_MISSION_ADMIN_URL` | URL for the mission admin panel | `http://localhost:3004` |
| `VITE_REPORT_INCIDENTS_URL` | URL for reporting incidents | `http://localhost:3002` |

## Notes

- Environment variables in Vite must be prefixed with `VITE_` to be exposed to the client
- Changes to environment variables in Netlify require a redeploy
- Never commit the `.env` file to version control (it's already in `.gitignore`)
