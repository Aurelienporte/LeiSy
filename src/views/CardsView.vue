<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import TheHeader from '@/components/TheHeader.vue'
import ItemsViewer from '@/components/ItemsViewer.vue'
import AddButton from '@/components/AddButton.vue'
import CardCreator from '@/components/CardCreator.vue'
import CardThumbnail from '@/components/CardThumbnail.vue'
import CollectionOptions from '@/components/CollectionOptions.vue'
import CollectionDeleter from '@/components/collectionDeleter.vue'
import CardDeleter from '@/components/CardDeleter.vue'

import { openDB } from 'idb'

const route = useRoute()
const collection = route.params.collection

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
  return cards.value.filter((card) => card.collection === collection)
})
console.log('cards in collection:', collection, cardsInCollection.value)

// Update viewer props when a card is created or deleted
function updateViewer() {
  getCardsFromStore()
  console.log('cards in store after update:', cards.value)
}

const cardToDelete = ref({
  id: null,
  question: '',
})

function setCardToDelete(id) {
  const questionToDelete = cards.value.find((card) => card.id === id)?.question
  cardToDelete.value = {
    id: id,
    question: questionToDelete,
  }
}
</script>

<template>
  <TheHeader />
  <section class="collection-manager">
    <ItemsViewer v-if="cardsInCollection.length > 0">
      <CardThumbnail
        v-for="card in cardsInCollection"
        :key="card.id"
        :card="card"
        @delete-card="setCardToDelete($event)"
      />
    </ItemsViewer>
    <AddButton target="card"></AddButton>
  </section>
  <CardCreator @newCard="updateViewer" />
  <CollectionOptions></CollectionOptions>
  <CollectionDeleter></CollectionDeleter>
  <CardDeleter :card="cardToDelete" @deleted="updateViewer"></CardDeleter>
</template>
<style scoped>
.collection-manager {
  height: 90vh;
  overflow: scroll;
}
.collection-manager:has(.add-button.active) {
  background-color: rgb(76, 0, 255);
}
</style>
