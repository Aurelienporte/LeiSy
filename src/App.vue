<script setup>
import { openDB } from 'idb'

async function useDB() {
  await openDB('leiSyDB', 1, {
    upgrade(db) {
      // Checks if the collections store exists and if not creates it:
      if (!db.objectStoreNames.contains('collections')) {
        const collectionStore = db.createObjectStore('collections', {
          // The 'id' property of the object will be the key.
          keyPath: 'name',
        })
        // Create an index on the 'name' property of the objects.
        collectionStore.createIndex('name', 'name')
      }

      // Checks if the cards store exists and if not creates it:
      if (!db.objectStoreNames.contains('cards')) {
        const cardsStore = db.createObjectStore('cards', {
          // The 'id' property of the object will be the key.
          keyPath: 'id',
          // If it isn't explicitly set, create a value by auto incrementing.
          autoIncrement: true,
        })
        // Create an index on the collection property of the objects.
        cardsStore.createIndex('collection', 'collection')
      }
    },
  })
}
useDB()
</script>

<template>
  <main class="app-main">
    <RouterView />
  </main>
</template>

<style scoped>
.app-main {
  display: grid;
  grid-template-rows: var(--header-height) 90vh;
}
</style>
