<script setup>
import ArrowBackIcon from '@/assets/ArrowBackIcon.vue'
import WheelIcon from '@/assets/WheelIcon.vue'
import { getCollectionFromStore } from '@/utils.js'

import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const path = ref(route.path)
const collections = ref([])

// Determine if settings button should be enabled based on the current route
const settingsEnabled = computed(() => {
  if (path.value === '/training' || route.params.collection) {
    return true
  }
  return false
})

const target = computed(() => {
  if (path.value === '/training') {
    return 'training-options'
  }
  if (route.params.collection) {
    return 'collection-options'
  }
  return null
})

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
    <button class="header__settings" :disabled="!settingsEnabled" :popovertarget="target">
      <wheelIcon></wheelIcon>
    </button>
  </header>
</template>
<style>
:root {
  --header-height: 96px;
  --main-title-size: 2.25rem;
}
</style>
<style scoped>
header {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  place-items: center;
  grid-area: 1/1/2/2;
  z-index: 10;
  background-color: var(--main-color);
  color: var(--text-color);

  font-size: var(--title-medium);
  font-family: var(--primary-font);

  --mark-color: rgb(126, 206, 255);
  --mark-bg-angle: 30deg;

  background:
    conic-gradient(from -8deg at 0% 108%, var(--mark-color) 2%, #fff0 6%) no-repeat 0 0 / auto 120%,
    conic-gradient(from 180deg at 100% 68%, #fff0, var(--mark-color) -2%, #fff0 25%) no-repeat 100%
      100% / auto 120%,
    linear-gradient(
        var(--mark-bg-angle),
        color-mix(in srgb, var(--mark-color), transparent 40%),
        color-mix(in srgb, var(--mark-color), transparent 80%) 75%,
        color-mix(in srgb, var(--mark-color), transparent 45%)
      )
      no-repeat center / auto,
    white;
  clip-path: shape(
    from 0 0,
    hline to 100%,
    vline to 100%,
    curve to 85% 73% with -40% 98%,
    curve to 0 105% with -15% 75%,
    close
  );
  /* padding: 8px;
  text-align: center; */

  .header__back-button {
    background: none;
    border: none;
    cursor: pointer;
  }

  .header__title {
    font-family: var(--primary-font);
    font-weight: 700;
    font-size: var(--main-title-size);
    grid-area: 1/2/2/3;
    line-height: var(--header-height);
    text-align: center;
    text-wrap-mode: nowrap;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: stretch;
    overflow: hidden;
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
    height: 48px;
    width: 48px;
    box-sizing: border-box;
    padding: 8px;
  }
}
</style>
