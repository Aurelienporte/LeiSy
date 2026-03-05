<script setup>
import { openDB } from 'idb'
import { getCollectionFromStore } from '@/utils.js'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const collections = ref([])

// Fetch collections on mount
onMounted(async () => {
  collections.value = await getCollectionFromStore()
})

// Computed property to get the collection name from slug
const collectionName = computed(() => {
  const slug = route.params.collection
  if (slug && collections.value.length > 0) {
    const collection = collections.value.find((c) => c.slug === slug)
    return collection ? collection.name : slug
  }
  return ''
})

async function deleteCollection(name) {
  const db = await openDB('leiSyDB', 1)

  // Create a transaction on the 'collections' store in read/write mode:
  const tx = db.transaction('collections', 'readwrite')

  // Delete a collection from the store in a single transaction:
  await Promise.all([tx.store.delete(name), tx.done])

  sendDeletion()
  // Navigate back to collections view
  router.push('/collections')
}

const emit = defineEmits(['deleted', 'canceled'])

function sendDeletion() {
  emit('deleted')
}

function cancelDeletion() {
  emit('canceled')
}
</script>

<template>
  <dialog class="collection-deleter" popover id="collection-deleter">
    <div class="deleter__message">
      <h2>
        <span>Supprimer</span> <span>{{ collectionName }} ?</span>
      </h2>
      Cette action est irréversible et supprimera tous les éléments de cette collection.
    </div>
    <div class="deleter__button-bar">
      <button @click="deleteCollection(collectionName)">Supprimer</button>
      <button @click="cancelDeletion">Annuler</button>
    </div>
  </dialog>
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
