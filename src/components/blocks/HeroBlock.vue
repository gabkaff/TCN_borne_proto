<template>
  <section class="hero-block">
    <div class="hero-content">
      <h1 v-if="content.title" class="hero-title">{{ content.title }}</h1>
      <p v-if="content.description" class="hero-description">{{ content.description }}</p>

      <img
        v-if="content.image"
        :src="imageUrl"
        :alt="content.image.alt || content.title"
        class="hero-image"
      />

      <a
        v-if="content.cta"
        :href="content.cta.href"
        class="hero-cta"
        target="_blank"
      >
        {{ content.cta.label }}
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { BlockContent } from '../../types/api.types';
import { assetsService } from '../../services/assets.service';

interface Props {
  content: BlockContent;
}

const props = defineProps<Props>();

const imageUrl = computed(() => {
  if (!props.content.image) return '';
  return assetsService.getAssetUrl(props.content.image);
});
</script>

<style scoped>
.hero-block {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  max-width: 1200px;
  width: 100%;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.hero-description {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-image {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 2rem 0;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.hero-cta {
  display: inline-block;
  padding: 1rem 2rem;
  background: white;
  color: #667eea;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.hero-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}
</style>
