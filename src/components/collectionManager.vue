<script setup>
import collectionCreator from './collectionCreator.vue'
import collectionDeleter from './collectionDeleter.vue'
import collectionViewer from './collectionViewer.vue'
import AddButton from './AddButton.vue'
import DeleteButton from './DeleteButton.vue'

import { ref, computed } from 'vue'

// Manage edition state to disable deletion when editing
const isEditing = ref(false)

function setOngoingEdition(newState) {
  if (newState === 'open') {
    isEditing.value = true
  } else if (newState === 'closed') {
    isEditing.value = false
  } else {
    console.warn('Unexpected newState value:', newState)
  }
}

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

<template>
  <section class="collection-manager">
    <collectionCreator @newCollection="updatePicker" @newState="setOngoingEdition" />
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
      :disabled="isEditing"
      :class="{ active: enableDeletion }"
    />
    <AddButton :disabled="enableDeletion" :class="{ active: isEditing }" />
    <!-- <collectionEditor v-if="toEdit" /> -->
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
