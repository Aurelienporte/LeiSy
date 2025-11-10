<template>
  <div class="collection-viewer">
    <div
      class="collection-thumbnail"
      v-for="collection in collections"
      :key="collection.name"
      @click="selectOrExplore(collection.name, isSelectMode)"
    >
      <span>
        {{ collection.name }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.collection-viewer {
  --gap: 16px;

  display: flex;
  flex-flow: row wrap;
  gap: var(--gap);
  padding-inline: var(--gap);
  padding-block: 48px;
  position: relative;
  z-index: 5;

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
}
</style>

<script setup>
import router from '@/router'

defineProps({
  collections: {
    type: Array,
    required: true,
  },
  isSelectMode: {
    type: Boolean,
    required: false,
    default: false,
  },
})

// Emit selected collection name to parent component
const emit = defineEmits(['selected'])

function selectCollection(name) {
  emit('selected', name)
}
function exploreCollection(name) {
  router.push({ name: 'cardsView', path: `/collections/:collection`, params: { collection: name } })
}
function selectOrExplore(name, isSelectMode) {
  if (isSelectMode) {
    selectCollection(name)
  } else {
    exploreCollection(name)
  }
}
</script>
