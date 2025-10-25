/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_SOCKET_URL: string;
  readonly VITE_INCIDENT_ADMIN_URL: string;
  readonly VITE_LANDING_PAGE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.css';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';
declare module '*.webp';

