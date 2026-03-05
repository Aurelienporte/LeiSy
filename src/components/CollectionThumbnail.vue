<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  collection: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <div class="collection-thumbnail">
    <RouterLink :to="`/collections/${collection.slug}`">{{ collection.name }}</RouterLink>
  </div>
</template>
<style scoped>
.collection-thumbnail {
  --side: calc((100vw - var(--gap) - var(--gap) * 2) / 2);

  display: grid;
  place-items: center;
  height: var(--side);
  width: var(--side);
  border: 1px solid black;
  border-radius: 8px;
  background-color: white;

  &::after,
  &::before {
    grid-area: 1/1;
    content: '';
    position: absolute;
    width: var(--side);
    height: var(--side);
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    rotate: 2deg;
    border: 1px solid black;
  }
  &::before {
    z-index: -10;
    rotate: 4deg;
    background-color: white;
  }
  &::after {
    z-index: -5;
    background-color: white;
  }
}
</style>
