<script setup>
import { openDB } from 'idb'

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
})

async function deleteCard(id) {
  const db = await openDB('leiSyDB', 1)

  // Create a transaction on the 'cards' store in read/write mode:
  const tx = db.transaction('cards', 'readwrite')

  // Delete a card from the store in a single transaction:
  await Promise.all([tx.store.delete(id), tx.done])

  confirmDeletion()
}

const emit = defineEmits(['deleted'])

function confirmDeletion() {
  emit('deleted')
}
</script>

<template>
  <dialog class="card-deleter" popover id="card-deleter">
    <h2 class="card-deleter__title">Supprimer la carte</h2>
    <div class="container">
      <p class="card-deleter__message">
        <span>
          <span>" </span>
          <span class="question">{{ props.card.question }}</span>
          <span> "</span>
        </span>
        <span>?</span> Cette action est définitive.
      </p>
      <div class="card-deleter__options">
        <button
          @click="deleteCard(props.card.id)"
          class="card-deleter__button"
          data-content="Supprimer"
          popovertarget="card-deleter"
          popovertargetaction="close"
        >
          Supprimer
        </button>
        <button
          popovertarget="card-deleter"
          popovertargetaction="close"
          class="card-deleter__button"
          data-content="Annuler"
        >
          Annuler
        </button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.card-deleter {
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
  .card-deleter__title {
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
    place-items: center;
    width: calc(100% - 24px * 2);
    place-self: center;
    height: 100%;
  }
  .card-deleter__message {
    display: flex;
    flex-flow: column nowrap;

    font-size: 1rem;
    font-weight: 700;
    font-family: var(--secondary-font);
    opacity: 0.8;
    text-align: center;
    /* text-wrap: balance; */

    .question {
      position: relative;
      display: inline-block;
      width: 60vw;
      text-wrap-mode: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .card-deleter__options {
    display: flex;
    gap: 16px;
  }
  .card-deleter__button {
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
  .card-deleter__button[data-content='Supprimer']::after {
    background-color: var(--alert-color);
  }
  .card-deleter__button[data-content='Annuler']::after {
    background-color: rgb(148, 233, 91);
  }
}
</style>
