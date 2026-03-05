<script setup>
import ArrowBackIcon from '@/assets/ArrowBackIcon.vue'
import WheelIcon from '@/assets/WheelIcon.vue'
import { getCollectionFromStore } from '@/utils.js'

import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'

defineProps({
  settingsEnabled: {
    type: Boolean,
    required: false,
  },
})

const route = useRoute()
const router = useRouter()
const path = ref(route.path)
const collections = ref([])

// Fetch collections on mount
onMounted(async () => {
  collections.value = await getCollectionFromStore()
})

const home = computed(() => path.value === '/')

// Computed property to get the collection name from slug
const collectionName = computed(() => {
  const slug = route.params.collection
  if (slug && collections.value.length > 0) {
    const collection = collections.value.find((c) => c.slug === slug)
    return collection ? collection.name : slug
  }
  return ''
})

// Updated title logic using computed properties
const title = computed(() => {
  if (path.value === '/') {
    return 'LeiSy'
  } else if (path.value === '/collections') {
    return 'Collections'
  } else if (path.value === '/training') {
    return 'Training'
  } else if (route.params.collection) {
    return collectionName.value
  } else {
    return 'LeiSy'
  }
})

function goBack() {
  if (path.value === '/collections') {
    router.push('/')
  } else {
    router.go(-1)
  }
}
</script>

<template>
  <header>
    <button class="header__back-button" v-if="!home" @click="goBack">
      <arrowBackIcon></arrowBackIcon>
    </button>
    <h1 class="header__title">{{ title }}</h1>
    <button
      class="header__settings"
      :disabled="!settingsEnabled"
      popovertarget="collection-options"
    >
      <wheelIcon></wheelIcon>
    </button>
  </header>
</template>

<style scoped>
header {
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  place-items: center;
  background-color: var(--main-color);
  color: var(--text-color);

  .header__back-button {
    background: none;
    border: none;
    cursor: pointer;
  }

  .header__title {
    grid-area: 1/2/2/3;
    line-height: var(--header-height);
    text-align: center;
  }
  .header__settings {
    background: none;
    border: none;
    cursor: pointer;
    display: none;

    &:enabled {
      display: block;
    }
  }
  svg {
    fill: var(--text-color);
  }
}
</style>
