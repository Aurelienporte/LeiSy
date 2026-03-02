<template>
  <section class="card-manager">
    <CardCrator @newCard="updateViewer" />
    <collectionDeleter
      v-if="toDelete"
      :collection="selectedCard"
      @deleted="updateViewer"
      @canceled="clearSelection"
    />
    <CardViewer v-if="cards.length > 0" :cards="cards" @selected="setSelection" />

    <DeleteButton
      v-if="cards.length > 0"
      @click="toggleDeletion"
      :class="{ active: enableDeletion }"
    />
    <AddButton />
  </section>
</template>

<style scoped>
.card-manager {
  height: 90vh;
  overflow: scroll;
}
.card-manager:has(.active) {
  background-color: orange;
}
</style>

<script setup>
import CardCrator from './CardCreator.vue'
import collectionDeleter from './collectionDeleter.vue'
import AddButton from './AddButton.vue'
import DeleteButton from './DeleteButton.vue'

import { ref, computed } from 'vue'

const toDelete = computed(() => {
  return selectedCard.value !== '' && enableDeletion.value
})

const cards = ref([])
import { openDB } from 'idb'

// Fetch collections from IndexedDB and update the collections ref
async function getCardsFromStore() {
  const db = await openDB('leiSyDB', 1)
  const value = await db.getAll('cards')

  cards.value = value
}
getCardsFromStore()

// Update picker props when a card is created or deleted
function updateViewer() {
  getCardsFromStore()
  clearSelection()
}

const selectedCard = ref('')

function setSelection(e) {
  selectedCard.value = e
}

function clearSelection() {
  selectedCard.value = ''
}

// Manage deletion state
const enableDeletion = ref(false)

function toggleDeletion() {
  enableDeletion.value = !enableDeletion.value
}
</script>
