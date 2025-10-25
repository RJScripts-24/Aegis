/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAP_PUBLIC_URL: string;
  readonly VITE_INCIDENT_ADMIN_URL: string;
  readonly VITE_MISSION_ADMIN_URL: string;
  readonly VITE_REPORT_INCIDENTS_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
