<script setup>
import { ref } from 'vue'

import TheHeader from '@/components/TheHeader.vue'
import ItemsViewer from '@/components/ItemsViewer.vue'
import AddButton from '@/components/AddButton.vue'
import CollectionCreator from '@/components/collectionCreator.vue'
import CollectionThumbnail from '@/components/CollectionThumbnail.vue'

import { openDB } from 'idb'

const collections = ref([])

// Fetch collections from IndexedDB and update the collections ref
async function getCollectionFromStore() {
  const db = await openDB('leiSyDB', 1)
  const value = await db.getAll('collections')

  collections.value = value
  console.log('collections in store:', collections.value)
}
getCollectionFromStore()

// Update viewer props when a collection is created or deleted
function updateViewer() {
  getCollectionFromStore()
}

// No navigation if the dialog is open
const isInteractive = ref(true)

function toogleInteractivity(state) {
  if (state === 'open') {
    isInteractive.value = false
  }
  if (state === 'closed') {
    isInteractive.value = true
  }
}
</script>

<template>
  <TheHeader />
  <section class="collection-manager">
    <ItemsViewer v-if="collections.length > 0" v-bind="{ inert: isInteractive ? null : 'inert' }">
      <CollectionThumbnail
        v-for="collection in collections"
        :key="collection.name"
        :collection="collection"
      />
    </ItemsViewer>
    <AddButton target="collection"></AddButton>
  </section>
  <CollectionCreator @newCollection="updateViewer" @new-state="toogleInteractivity($event)" />
</template>
<style scoped>
.collection-manager {
  overflow: scroll;
  grid-area: 1/1/3/2;
  padding-top: var(--header-height);
}
</style>
