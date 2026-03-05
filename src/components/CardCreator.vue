<script setup>
import { openDB } from 'idb'
import { ref, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const collection = route.params.collection
const cardCreator = useTemplateRef('card-creator')
const form = useTemplateRef('form')

const card = ref({ question: '', answer: '' })

const emit = defineEmits(['newCard'])

function emitNewCard() {
  emit('newCard')
}

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
  emitNewCard()
  // Clear form and close popover
  form.value.reset()
  cardCreator.value.hidePopover()
}
function clearForm() {
  form.value.reset()
}
</script>
<template>
  <dialog popover id="card-creator" ref="card-creator" class="card-creator" @toggle="clearForm()">
    <form @submit.prevent="createCard(name)" ref="form">
      <label for="newCard">Question</label>
      <input v-model="card.question" type="text" id="question" name="question" />
      <label for="newCard">Réponse</label>
      <input v-model="card.answer" type="text" id="answer" name="answer" />
      <input type="submit" value="Créer" />
    </form>
  </dialog>
  <svg class="border-wave">
    <clipPath id="wave" clipPathUnits="objectBoundingBox">
      <path d="M 1 0.104 c -0.04 0.038 -0.11 0.064 -0.398 0.045 S 0.243 0.058 0 0.13 V 0 h 1 z" />
    </clipPath>
  </svg>
</template>

<style scoped>
.card-creator {
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

  .card-creator__form {
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
