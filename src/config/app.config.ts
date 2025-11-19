import type { AppConfig, AppMode } from '../types/api.types';

// Détermine le mode de l'application depuis les variables d'environnement
const getAppMode = (): AppMode => {
  const mode = import.meta.env.VITE_APP_MODE as AppMode;
  return mode === 'kiosk' || mode === 'ipad' ? mode : 'ipad';
};

// Configuration de l'application
export const appConfig: AppConfig = {
  mode: getAppMode(),
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  refreshInterval: parseInt(import.meta.env.VITE_REFRESH_INTERVAL || '300000'), // 5 minutes par défaut
  enableCache: getAppMode() === 'kiosk',
};

// Constantes
export const CACHE_VERSION = '1.0.0';
export const CACHE_DB_NAME = 'proto-tauri-cache';
export const ASSETS_DIR = 'assets-cache';
