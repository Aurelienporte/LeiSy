<template>
  <div class="collection-deleter" ref="form">
    <div class="deleter__message">
      <h2>
        <span>Supprimer</span> <span>{{ collection }} ?</span>
      </h2>

      Cette action est irréversible et supprimera tous les éléments de cette collection.
    </div>
    <div class="deleter__button-bar">
      <button @click="deleteCollection(collection)">Oui</button>
      <button @click="cancelDeletion">Non</button>
    </div>
  </div>
</template>

<style scoped>
.collection-deleter {
  display: grid;
  grid-template-rows: 2fr 1fr;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 8px;
  color: black;
  width: 80vw;
  height: 80vw;
  background-color: white;

  .deleter__button-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;

    button {
      width: 30%;
      height: 40px;
      border-radius: 8px;
      background-color: var(--main-color);
      color: var(--text-color);
      font-size: 1.2rem;
    }
  }
  .deleter__message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 16px;

    h2 {
      margin-bottom: 16px;
      span {
        display: block;
      }
    }
  }
}
</style>

<script setup>
defineProps({
  collection: {
    type: String,
    required: true,
    default: '',
  },
})

import { openDB } from 'idb'

async function deleteCollection(name) {
  const db = await openDB('leiSyDB', 1)

  // Create a transaction on the 'collections' store in read/write mode:
  const tx = db.transaction('collections', 'readwrite')

  // Delete a collection from the store in a single transaction:
  await Promise.all([tx.store.delete(name), tx.done])

  sendDeletion()
}

const emit = defineEmits(['deleted', 'canceled'])

function sendDeletion() {
  emit('deleted')
}

function cancelDeletion() {
  emit('canceled')
}
</script>
