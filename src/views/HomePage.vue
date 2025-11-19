<template>
  <div class="home-page">
    <header class="page-header">
      <h1>🏠 Page d'accueil</h1>
      <div class="page-info">
        <span>Mode: <strong>{{ appConfig.mode }}</strong></span>
        <span v-if="appConfig.enableCache">Cache: <strong>Activé</strong></span>
        <span v-else>Cache: <strong>Désactivé (Live)</strong></span>
      </div>
    </header>

    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      <p>Chargement...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>❌ {{ error }}</p>
      <button @click="loadData" class="retry-button">Réessayer</button>
    </div>

    <div v-else class="content">
      <nav class="pages-nav">
        <h2>Pages disponibles:</h2>
        <ul>
          <li v-for="page in pagesList" :key="page.id">
            <router-link :to="`/${page.slug}`" class="page-link">
              {{ page.title }}
            </router-link>
          </li>
        </ul>
      </nav>

      <div class="actions">
        <button @click="refreshData" class="action-button">
          🔄 Rafraîchir les données
        </button>
        <button v-if="appConfig.enableCache" @click="clearCache" class="action-button">
          🗑️ Vider le cache
        </button>
      </div>

      <div v-if="meta" class="meta-info">
        <h3>Informations du site:</h3>
        <ul>
          <li>Nom: {{ meta.site.name }}</li>
          <li>Langue: {{ meta.site.language }}</li>
          <li>Dernière mise à jour: {{ formatDate(meta.timestamp) }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAppStore } from '../stores/app.store';
import { apiService } from '../services/api.service';
import { assetsService } from '../services/assets.service';
import { appConfig } from '../config/app.config';
import { storeToRefs } from 'pinia';

const store = useAppStore();
const { isLoading, error, pagesList, meta } = storeToRefs(store);

const loadData = async () => {
  try {
    store.setLoading(true);
    const data = await apiService.fetchData();
    store.setApiData(data);

    // Télécharge les assets si en mode borne
    if (appConfig.enableCache) {
      await assetsService.downloadAllAssets(data);
    }
  } catch (err) {
    store.setError(err instanceof Error ? err.message : 'Une erreur est survenue');
  } finally {
    store.setLoading(false);
  }
};

const refreshData = async () => {
  try {
    store.setLoading(true);
    const data = await apiService.refresh();
    store.setApiData(data);

    if (appConfig.enableCache) {
      await assetsService.downloadAllAssets(data);
    }
  } catch (err) {
    store.setError(err instanceof Error ? err.message : 'Erreur lors du rafraîchissement');
  } finally {
    store.setLoading(false);
  }
};

const clearCache = async () => {
  if (confirm('Êtes-vous sûr de vouloir vider le cache ?')) {
    await apiService.clearCache();
    await assetsService.clearAssets();
    alert('Cache vidé avec succès');
  }
};

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString('fr-FR');
};

onMounted(async () => {
  // Initialise le service des assets
  await assetsService.init();
  // Charge les données
  await loadData();
});
</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  margin-bottom: 2rem;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.page-info {
  display: flex;
  gap: 2rem;
  justify-content: center;
  font-size: 1rem;
  color: #666;
}

.loading {
  text-align: center;
  padding: 4rem 0;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 2rem;
  background: #fee;
  border-radius: 8px;
  color: #c00;
}

.retry-button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.pages-nav {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pages-nav h2 {
  margin-bottom: 1rem;
  color: #333;
}

.pages-nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.page-link {
  display: block;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-decoration: none;
  color: #667eea;
  font-weight: 600;
  transition: all 0.2s;
}

.page-link:hover {
  background: #667eea;
  color: white;
  transform: translateX(5px);
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.action-button {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.action-button:hover {
  background: #5568d3;
}

.meta-info {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.meta-info h3 {
  margin-bottom: 1rem;
  color: #333;
}

.meta-info ul {
  list-style: none;
  padding: 0;
}

.meta-info li {
  padding: 0.5rem 0;
  color: #666;
}
</style>
