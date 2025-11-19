import type { ApiResponse } from '../types/api.types';

// Données mock pour tester l'application
export const mockApiData: ApiResponse = {
  meta: {
    timestamp: Date.now(),
    execution_time: 'Time: 00:00.162, Memory: 8.00 MB',
    site: {
      id: 1,
      name: 'FR',
      handle: 'fr_CA',
      language: 'fr-CA',
      primary: true,
    },
  },
  data: {
    'page-1': {
      id: 11128,
      url: null,
      title: 'Page 1 - Bienvenue',
      slug: 'page-1',
      dates: {
        created: Date.now() - 86400000,
        updated: Date.now() - 43200000,
        posted: Date.now() - 86400000,
      },
      blocs: [
        {
          id: 1,
          type: 'hero',
          content: {
            title: 'Bienvenue sur notre application',
            description: 'Une expérience tactile moderne pour bornes et iPads',
            image: {
              src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800',
              alt: 'Image de bienvenue',
            },
            cta: {
              label: 'En savoir plus',
              href: '/page-2',
            },
          },
        },
      ],
      translations: [
        {
          siteId: 2,
          language: 'en-CA',
          url: null,
        },
      ],
    },
    'page-2': {
      id: 11130,
      url: null,
      title: 'Page 2 - Nos services',
      slug: 'page-2',
      dates: {
        created: Date.now() - 86400000,
        updated: Date.now() - 43200000,
        posted: Date.now() - 86400000,
      },
      blocs: [
        {
          id: 1,
          type: 'hero',
          content: {
            title: 'Découvrez nos services',
            description: 'Des solutions innovantes pour votre entreprise',
            image: {
              src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
              alt: 'Image de services',
            },
            cta: {
              label: 'Nous contacter',
              href: 'https://example.com',
            },
          },
        },
      ],
      translations: [
        {
          siteId: 2,
          language: 'en-CA',
          url: null,
        },
      ],
    },
    'page-3': {
      id: 11131,
      url: null,
      title: 'Page 3 - Contact',
      slug: 'page-3',
      dates: {
        created: Date.now() - 86400000,
        updated: Date.now() - 43200000,
        posted: Date.now() - 86400000,
      },
      blocs: [
        {
          id: 1,
          type: 'hero',
          content: {
            title: 'Contactez-nous',
            description: 'Nous sommes là pour répondre à vos questions',
            image: {
              src: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800',
              alt: 'Image de contact',
            },
            cta: {
              label: 'Envoyer un message',
              href: 'mailto:contact@example.com',
            },
          },
        },
      ],
      translations: [
        {
          siteId: 2,
          language: 'en-CA',
          url: null,
        },
      ],
    },
  },
};
