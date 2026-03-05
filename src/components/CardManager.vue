<script setup>
import CardCreator from './CardCreator.vue'
// import collectionDeleter from './collectionDeleter.vue'
import AddButton from './AddButton.vue'
// import DeleteButton from './DeleteButton.vue'

import { ref, computed } from 'vue'

// const toDelete = computed(() => {
//   return selectedCard.value !== '' && enableDeletion.value
// })

import { openDB } from 'idb'
import CardViewer from './CardViewer.vue'

const props = defineProps({
  collection: {
    type: String,
    required: true,
  },
})

const cards = ref([])

// Fetch cards from IndexedDB and update the cards ref
async function getCardsFromStore() {
  const db = await openDB('leiSyDB', 1)
  const value = await db.getAll('cards')

  cards.value = value
  console.log('cards in store:', cards.value)
}
getCardsFromStore()

const cardsInCollection = computed(() => {
  return cards.value.filter((card) => card.collection === props.collection)
})
console.log('cards in collection:', props.collection, cardsInCollection.value)

// Update picker props when a card is created or deleted
function updateViewer() {
  getCardsFromStore()
  console.log('cards in store after update:', cards.value)
  // clearSelection()
}

const selectedCard = ref('')

function setSelection(e) {
  selectedCard.value = e
}

// function clearSelection() {
//   selectedCard.value = ''
// }

// Manage deletion state
// const enableDeletion = ref(false)

// function toggleDeletion() {
//   enableDeletion.value = !enableDeletion.value
// }
</script>

<template>
  <section class="card-manager">
    <CardViewer
      v-if="cards.length > 0"
      :cards="cardsInCollection"
      @selected="setSelection"
      @newCard="updateViewer"
    />
    <CardCreator @newCard="updateViewer" />
    <!-- <collectionDeleter
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
    /> -->
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
