<script setup>
import { openDB } from 'idb'
import { ref, useTemplateRef } from 'vue'
const name = ref('')
const collectionCreator = useTemplateRef('collection-creator')
const form = useTemplateRef('form')
const emit = defineEmits(['newCollection', 'newState'])

function sendCreation() {
  emit('newCollection')
}

function sendNewState(event) {
  emit('newState', event.newState)
}

async function createCollection() {
  const db = await openDB('leiSyDB', 1)

  // Create a transaction on the 'collections' store in read/write mode:
  const tx = db.transaction('collections', 'readwrite')

  // Add items to the store in a single transaction:
  await Promise.all([
    tx.store.add({
      name: name.value.trim(),
    }),
    tx.done,
  ])
  sendCreation()
  // Clear form and close popover
  form.value.reset()
  collectionCreator.value.hidePopover()
}
</script>

<template>
  <dialog
    popover
    id="collection-creator"
    ref="collection-creator"
    class="collection-creator"
    @toggle="sendNewState($event)"
  >
    <form
      @submit.prevent="createCollection(name)"
      method="dialog"
      ref="form"
      class="collection-creator__form"
    >
      <h2>Nouvelle collection</h2>
      <label for="newCollection" class="collection-creator__label">Nom :</label>
      <input
        v-model="name"
        type="text"
        id="newCollection"
        name="newCollection"
        class="collection-creator__input"
        required
        pattern="^(?!\s*$).+"
      />
      <input type="submit" value="Ajouter" class="collection-creator__button" />
      <span class="error-message">Min 1 caractère</span>
    </form>
  </dialog>
  <svg class="border-wave">
    <clipPath id="wave" clipPathUnits="objectBoundingBox">
      <path d="M 1 0.104 c -0.04 0.038 -0.11 0.064 -0.398 0.045 S 0.243 0.058 0 0.13 V 0 h 1 z" />
    </clipPath>
  </svg>
</template>

<style scoped>
.collection-creator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 8px;
  color: black;
  width: 80vw;
  height: 80vw;

  &:popover-open {
    /*Set a display outside of this selector will force popover to stay open */
    display: grid;
  }
  &::before {
    content: '';
    grid-area: 1/1;
    width: 100%;
    height: 100%;
    background-color: var(--main-color);
    clip-path: url(#wave);
    z-index: -1;
  }

  .collection-creator__form {
    grid-area: 1/1;
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 16px;

    &:has(input:user-invalid) {
      .error-message {
        color: red;
      }
    }
  }
}
.border-wave {
  height: 0;
}
.error-message {
  color: black;
  font-size: 0.8em;
}
</style>
