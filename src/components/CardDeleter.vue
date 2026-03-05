<script setup>
import { openDB } from 'idb'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})
// import { getCollectionFromStore } from '@/utils.js'
// import { ref, computed, onMounted } from 'vue'

// const collections = ref([])

// // Fetch collections on mount
// onMounted(async () => {
//   collections.value = await getCollectionFromStore()
// })

async function deleteCard(id) {
  const db = await openDB('leiSyDB', 1)

  // Create a transaction on the 'cards' store in read/write mode:
  const tx = db.transaction('cards', 'readwrite')

  // Delete a card from the store in a single transaction:
  await Promise.all([tx.store.delete(id), tx.done])

  confirmDeletion()
}

const emit = defineEmits(['deleted', 'canceled'])

function confirmDeletion() {
  emit('deleted')
}

function cancelDeletion() {
  emit('canceled')
}
</script>

<template>
  <dialog class="card-deleter" popover id="card-deleter">
    <div class="deleter__message">
      <h2>
        <span>Supprimer cette carte ? {{ props.id }}</span>
      </h2>
      Cette action est définitive.
    </div>
    <div class="deleter__button-bar">
      <button @click="deleteCard(id)">Supprimer</button>
      <button @click="cancelDeletion">Annuler</button>
    </div>
  </dialog>
</template>

<style scoped>
.card-deleter {
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
