<template>
  <component :is="blockComponent" :content="block.content" v-if="blockComponent" />
  <div v-else class="unknown-block">
    <p>⚠️ Type de bloc inconnu: {{ block.type }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Block } from '../../types/api.types';
import HeroBlock from './HeroBlock.vue';

interface Props {
  block: Block;
}

const props = defineProps<Props>();

// Map des types de blocs vers leurs composants
const blockComponents = {
  hero: HeroBlock,
  // Ajoutez d'autres types de blocs ici
  // text: TextBlock,
  // image: ImageBlock,
  // video: VideoBlock,
  // gallery: GalleryBlock,
};

const blockComponent = computed(() => {
  return blockComponents[props.block.type as keyof typeof blockComponents];
});
</script>

<style scoped>
.unknown-block {
  padding: 2rem;
  background: #f0f0f0;
  border: 2px dashed #ccc;
  text-align: center;
  color: #666;
}
</style>
