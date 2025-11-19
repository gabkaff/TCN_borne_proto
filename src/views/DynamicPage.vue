<template>
  <div class="dynamic-page">
    <nav class="breadcrumb">
      <router-link to="/">← Retour à l'accueil</router-link>
    </nav>

    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      <p>Chargement...</p>
    </div>

    <div v-else-if="!page" class="not-found">
      <h1>404</h1>
      <p>Page non trouvée</p>
      <router-link to="/" class="home-link">Retour à l'accueil</router-link>
    </div>

    <div v-else class="page-content">
      <header class="page-header">
        <h1>{{ page.title }}</h1>
        <div class="page-meta">
          <span>Créée le: {{ formatDate(page.dates.created) }}</span>
          <span>Mise à jour: {{ formatDate(page.dates.updated) }}</span>
        </div>
      </header>

      <div class="blocks-container">
        <BlockRenderer
          v-for="(block, index) in page.blocs"
          :key="`${block.id}-${index}`"
          :block="block"
        />
      </div>

      <div v-if="page.translations.length > 0" class="translations">
        <h3>Traductions disponibles:</h3>
        <ul>
          <li v-for="translation in page.translations" :key="translation.siteId">
            {{ translation.language }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '../stores/app.store';
import { storeToRefs } from 'pinia';
import BlockRenderer from '../components/blocks/BlockRenderer.vue';

const route = useRoute();
const store = useAppStore();
const { isLoading } = storeToRefs(store);

const slug = computed(() => route.params.slug as string);
const page = computed(() => store.getPageBySlug(slug.value));

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('fr-FR');
};

// Recharge si le slug change
watch(slug, () => {
  // La page est déjà chargée via le store
  // Scroll to top lors du changement de page
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

onMounted(() => {
  // Si aucune donnée n'est chargée, rediriger vers l'accueil
  if (!store.apiData) {
    // Router push home
  }
});
</script>

<style scoped>
.dynamic-page {
  min-height: 100vh;
}

.breadcrumb {
  padding: 1rem 2rem;
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

.breadcrumb a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.breadcrumb a:hover {
  text-decoration: underline;
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

.not-found {
  text-align: center;
  padding: 4rem 2rem;
}

.not-found h1 {
  font-size: 4rem;
  color: #667eea;
  margin-bottom: 1rem;
}

.home-link {
  display: inline-block;
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
}

.page-content {
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  padding: 3rem 2rem;
  text-align: center;
  background: linear-gradient(to bottom, #f8f9fa, white);
}

.page-header h1 {
  font-size: 3rem;
  color: #333;
  margin-bottom: 1rem;
}

.page-meta {
  display: flex;
  gap: 2rem;
  justify-content: center;
  color: #666;
  font-size: 0.9rem;
}

.blocks-container {
  display: flex;
  flex-direction: column;
}

.translations {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.translations h3 {
  margin-bottom: 1rem;
  color: #333;
}

.translations ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1rem;
}

.translations li {
  padding: 0.5rem 1rem;
  background: white;
  border-radius: 6px;
  color: #667eea;
  font-weight: 600;
}
</style>
