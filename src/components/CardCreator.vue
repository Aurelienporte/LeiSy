<script setup>
import { openDB } from 'idb'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const collection = route.params.collection

const card = ref({ question: '', answer: '' })

async function createCard() {
  const db = await openDB('leiSyDB', 1)

  // Create a transaction on the 'cards' store in read/write mode:
  const tx = db.transaction('cards', 'readwrite')

  // Add items to the store in a single transaction:
  await Promise.all([
    tx.store.add({
      question: card.value.question,
      answer: card.value.answer,
      collection: collection,
    }),
    tx.done,
  ])
}
</script>

<template>
  <form @submit.prevent="createCard(name)">
    <label for="newCard">Question</label>
    <input v-model="card.question" type="text" id="question" name="question" />
    <label for="newCard">Réponse</label>
    <input v-model="card.answer" type="text" id="answer" name="answer" />
    <input type="submit" value="Créer" />
  </form>
</template>
