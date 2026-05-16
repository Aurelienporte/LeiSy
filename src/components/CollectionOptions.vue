<script setup>
import { useTemplateRef } from 'vue'
const emit = defineEmits(['rename', 'delete'])
const collectionOptions = useTemplateRef('collection-options')

function deleteCollection() {
  emit('delete')
  collectionOptions.value.hidePopover()
}
function renameCollection() {
  emit('rename')
}
</script>
<template>
  <dialog id="collection-options" popover class="collection-options" ref="collection-options">
    <h2 class="collection-options__title">Paramètres</h2>
    <ul class="collection-options__menu">
      <li>
        <button @click="renameCollection" class="collection-options__button">Renommer</button>
      </li>
      <li>
        <button
          @click="deleteCollection"
          class="collection-options__button"
          popovertarget="collection-deleter"
        >
          Supprimer
        </button>
      </li>
    </ul>
  </dialog>
</template>
<style scoped>
.collection-options {
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
    display: block;

    &::backdrop {
      background-color: #00000080;
    }
  }
  .collection-options__title {
    font-size: var(--title-medium);
    font-family: var(--primary-font);

    --mark-color: rgb(91, 179, 233);
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
  .collection-options__menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    width: calc(100% - 24px * 2);
    place-self: center;
  }
  .collection-options__button {
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
        from 0% 88%,
        line to 13% 86%,
        line to 49% 90%,
        line to 84% 89%,
        curve to 98% 96% with 98% 98%,
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
</style>
