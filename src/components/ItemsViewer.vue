<!-- <script setup>
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
</script> -->

<template>
  <div class="items-viewer">
    <slot></slot>
  </div>
</template>

<style scoped>
.items-viewer {
  --gap: 16px;

  display: flex;
  flex-flow: row wrap;
  gap: var(--gap);
  padding-inline: var(--gap);
  padding-block: 48px;
  position: relative;
  z-index: 5;
}
</style>
