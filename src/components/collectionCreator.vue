<script setup>
import { openDB } from 'idb'
import { ref, useTemplateRef } from 'vue'
const name = ref('')
const collectionCreator = useTemplateRef('collection-creator')
const form = useTemplateRef('form')
const emit = defineEmits(['newCollection', 'newState'])

function emitNewCollection() {
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
      slug: name.value.trim().toLowerCase().replace(/\s+/g, '_'),
    }),
    tx.done,
  ])
  emitNewCollection()

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
    <h2 class="collection-creator__title">Nouvelle collection</h2>
    <form
      @submit.prevent="createCollection(name)"
      method="dialog"
      ref="form"
      class="collection-creator__form"
    >
      <div class="container">
        <label for="newCollection" class="collection-creator__label">Nom :</label>
        <input
          v-model="name"
          type="text"
          id="newCollection"
          name="newCollection"
          class="collection-creator__input"
          required
          pattern="^(?!\s*$).+"
          minlength="1"
          maxlength="40"
          placeholder="Ex: Levures basidiomycètes"
        />
        <span class="error-message">1 caractère minimum</span>
      </div>
      <button class="collection-creator__button" type="submit">Ajouter</button>
    </form>
  </dialog>
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

    &::backdrop {
      background-color: #00000080;
    }
  }
  .collection-creator__title {
    font-size: var(--title-medium);
    font-family: var(--primary-font);

    --mark-color: rgb(91 233 92);
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
      curve to 0 90% with 12% 70%,
      close
    );
    padding: 8px;
    text-align: center;
    place-content: center;
  }
  .collection-creator__form {
    display: grid;
    grid-template-rows: 3fr 1fr;
    gap: 16px;
    padding-bottom: 16px;

    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: calc(100% - 24px * 2);
      place-self: center;
    }
    .collection-creator__label {
      font-size: 1rem;
      font-weight: 700;
      font-family: var(--primary-font);
      opacity: 0.8;
    }
    .collection-creator__input {
      width: 100%;
      font-family: var(--secondary-font);
      font-size: 1.25rem;
      border: none;
      border-bottom: 1px solid;
      margin-bottom: 16px;
    }
    .error-message {
      font-family: var(--secondary-font);
      color: var(--alert-color);
      font-size: 0.8em;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    &:has(input:user-invalid) {
      .error-message {
        opacity: 1;
      }
    }
    .collection-creator__button {
      --button-width: 92px;
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
          from 0 13%,
          curve to 11% 0% with 5% 0%,
          curve to 66% 2% with 39% 3%,
          curve to 96% 16% with 87% 0,
          line to 92% 95%,
          curve to 50% 92% with 76% 95%,
          curve to 0 90% with 12% 84%,
          line to 3% 52%,
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
  }
}
</style>
