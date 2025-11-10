<template>
  <header>
    <RouterLink v-if="!home" to="/"><arrowBackIcon></arrowBackIcon></RouterLink>
    <h1 class="header__title">{{ title }}</h1>
    <button class="header__settings" :disabled="!settingsEnabled">
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

<script setup>
import ArrowBackIcon from '@/assets/ArrowBackIcon.vue'
import WheelIcon from '@/assets/WheelIcon.vue'

import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'

defineProps({
  // title: {
  //   type: String,
  //   required: true,
  // },
  settingsEnabled: {
    type: Boolean,
    required: false,
  },
})

const route = useRoute()
const path = ref(route.path)
const home = computed(() => {
  if (path.value === '/') {
    return true
  } else {
    return false
  }
})

const title = ref('')

if (path.value === '/') {
  title.value = 'LeiSy'
} else if (path.value === '/collections') {
  title.value = 'Collections'
} else if (path.value === '/training') {
  title.value = 'Training'
} else if (route.params !== '') {
  title.value = route.params.collection
} else {
  title.value = 'LeiSy'
}
</script>
