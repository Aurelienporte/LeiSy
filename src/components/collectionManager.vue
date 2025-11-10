<template>
  <section class="collection-manager">
    <collectionCreator @newCollection="updatePicker" />
    <collectionDeleter
      v-if="toDelete"
      :collection="selectedCollection"
      @deleted="updatePicker"
      @canceled="clearSelection"
    />
    <collectionViewer
      v-if="collections.length > 0"
      :collections="collections"
      :isSelectMode="enableDeletion"
      @selected="setSelection"
    />

    <DeleteButton
      v-if="collections.length > 0"
      @click="toggleDeletion"
      :class="{ active: enableDeletion }"
    />
    <AddButton />
    <collectionEditor v-if="toEdit" :collection="selectedCollection" />
  </section>
</template>

<style scoped>
.collection-manager {
  height: 90vh;
  overflow: scroll;
}
.collection-manager:has(.active) {
  background-color: orange;
}
</style>

<script setup>
import collectionCreator from './collectionCreator.vue'
import collectionDeleter from './collectionDeleter.vue'
import collectionViewer from './collectionViewer.vue'
import collectionEditor from './collectionEditor.vue'
import AddButton from './AddButton.vue'
import DeleteButton from './DeleteButton.vue'

import { ref, computed } from 'vue'

const toEdit = computed(() => {
  return selectedCollection.value !== '' && !enableDeletion.value
})
const toDelete = computed(() => {
  return selectedCollection.value !== '' && enableDeletion.value
})

const collections = ref([])
import { openDB } from 'idb'

// Fetch collections from IndexedDB and update the collections ref
async function getCollectionFromStore() {
  const db = await openDB('leiSyDB', 1)
  const value = await db.getAll('collections')

  collections.value = value
}
getCollectionFromStore()

// Update picker props when a collection is created or deleted
function updatePicker() {
  getCollectionFromStore()
  clearSelection()
}

const selectedCollection = ref('')

function setSelection(e) {
  selectedCollection.value = e
}

function clearSelection() {
  selectedCollection.value = ''
}

// Manage deletion state
const enableDeletion = ref(false)

function toggleDeletion() {
  enableDeletion.value = !enableDeletion.value
}
</script>
