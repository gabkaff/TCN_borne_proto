// Types pour la structure de données de l'API

export interface ApiResponse {
  meta: MetaData;
  data: Record<string, Page>;
}

export interface MetaData {
  timestamp: number;
  execution_time: string;
  site: SiteInfo;
}

export interface SiteInfo {
  id: number;
  name: string;
  handle: string;
  language: string;
  primary: boolean;
}

export interface Page {
  id: number;
  url: string | null;
  title: string;
  slug: string;
  dates: PageDates;
  blocs: Block[];
  translations: Translation[];
}

export interface PageDates {
  created: number;
  updated: number;
  posted: number;
}

export interface Translation {
  siteId: number;
  language: string;
  url: string | null;
}

// Types de blocs
export type BlockType = 'hero' | 'text' | 'image' | 'video' | 'gallery' | 'cta';

export interface Block {
  id: number;
  type: BlockType;
  content: BlockContent;
}

export interface BlockContent {
  title?: string;
  description?: string;
  text?: string;
  image?: MediaAsset;
  video?: MediaAsset;
  images?: MediaAsset[];
  cta?: CTAButton;
  [key: string]: any; // Pour les propriétés personnalisées
}

export interface MediaAsset {
  src: string;
  alt?: string;
  localPath?: string; // Chemin local pour le cache
}

export interface CTAButton {
  label: string;
  href: string;
}

// Configuration de l'environnement
export type AppMode = 'kiosk' | 'ipad';

export interface AppConfig {
  mode: AppMode;
  apiUrl: string;
  refreshInterval?: number; // En millisecondes, pour les bornes
  enableCache: boolean;
}
