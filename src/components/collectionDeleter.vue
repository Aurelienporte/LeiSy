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

const emit = defineEmits(['deleted'])

function sendDeletion() {
  emit('deleted')
}
</script>

<template>
  <dialog class="collection-deleter" id="collection-deleter" popover>
    <h2 class="collection-deleter__title">Supprimer {{ collectionName }} ?</h2>
    <div class="container">
      <p class="collection-deleter__message">
        Cette action est irréversible et supprimera tous les éléments de cette collection.
      </p>
      <div class="collection-deleter__options">
        <button
          @click="deleteCollection(collectionName)"
          class="collection-deleter__button"
          data-content="Supprimer"
        >
          Supprimer
        </button>
        <button
          class="collection-deleter__button"
          data-content="Annuler"
          popovertarget="collection-deleter"
          popovertargetaction="close"
        >
          Annuler
        </button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.collection-deleter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 8px;
  color: black;
  width: 80vw;
  height: 80vw;
  clip-path: shape(
    evenodd from 2% 1%,
    line to 39% 1%,
    line to 80% 0%,
    line to 94% 1%,
    curve to 100% 4% with 99% 1%,
    line to 99% 39%,
    line to 98% 89%,
    line to 97% 95%,
    curve to 92% 101% with 96% 99%,
    line to 78% 99%,
    line to 34% 98%,
    line to 8% 99%,
    curve to 1% 90% with 2% 99%,
    line to 1% 82%,
    line to 2% 61%,
    line to 1% 12%,
    curve to 5% 1% with 1% 1%
  );

  &:popover-open {
    /*Set a display outside of this selector will force popover to stay open */
    display: grid;
    grid-template-rows: auto 1fr;

    &::backdrop {
      background-color: #00000080;
    }
  }
  .collection-deleter__title {
    font-size: var(--title-medium);
    font-family: var(--primary-font);

    --mark-color: oklch(0.83 0.18 79.34);
    --mark-bg-angle: 30deg;

    background:
      conic-gradient(at 0 100%, var(--mark-color) 1%, #fff0 3%) no-repeat 0 0 / auto 120%,
      conic-gradient(from 180deg at 100% 0, #fff0, var(--mark-color) 1%, #fff0 4%) no-repeat 100%
        100% / auto 120%,
      linear-gradient(
          var(--mark-bg-angle),
          color-mix(in srgb, var(--mark-color), transparent 40%),
          color-mix(in srgb, var(--mark-color), transparent 80%) 75%,
          color-mix(in srgb, var(--mark-color), transparent 45%)
        )
        no-repeat center / auto;
    clip-path: shape(
      from 0 0,
      hline to 100%,
      vline to 100%,
      curve to 50% 85% with 76% 95%,
      curve to 0 90% with 120% 207%,
      close
    );
    padding: 8px;
    text-align: center;
    place-content: center;
  }
  .container {
    display: grid;
    grid-template-rows: 1fr 1fr;
    /* flex-direction: column;
    justify-content: center;
    align-items: center; */
    place-items: center;
    width: calc(100% - 24px * 2);
    place-self: center;
    height: 100%;
  }
  .collection-deleter__message {
    font-size: 1rem;
    font-weight: 700;
    font-family: var(--secondary-font);
    opacity: 0.8;
    text-align: center;
    text-wrap: balance;
  }
  .collection-deleter__options {
    display: flex;
    gap: 16px;
  }
  .collection-deleter__button {
    --button-width: 120px;
    --button-height: 44px;
    display: grid;
    position: relative;
    place-items: center;
    font-size: 1.25rem;
    font-weight: 700;
    font-family: var(--primary-font);
    background-color: transparent;
    width: var(--button-width);
    height: var(--button-height);
    min-width: fit-content;
    min-height: fit-content;
    padding: 8px;
    vertical-align: middle;
    justify-self: center;
    &::before,
    &::after {
      content: '';
      position: absolute;
      z-index: -5;
      border-radius: 50%;
      background-color: white;
      clip-path: shape(
        from 0% 9%,
        curve to 9% 10% with 6% 2%,
        curve to 51% 9% with 49% 8%,
        curve to 97% 11% with 97% 0,
        line to 93% 95%,
        curve to 40% 86% with 76% 87%,
        curve to 1% 86% with 6% 86%,
        line to 5% 15%,
        close
      );
    }
    &::before {
      background-color: var(--text-color);
      height: calc(var(--button-height) + 8px);
      width: calc(var(--button-width) + 8px);
    }
    &::after {
      height: calc(var(--button-height) + 4px);
      width: calc(var(--button-width) + 4px);
    }
  }
  .collection-deleter__button[data-content='Supprimer']::after {
    background-color: var(--alert-color);
  }
  .collection-deleter__button[data-content='Annuler']::after {
    background-color: rgb(148, 233, 91);
  }
}
</style>
