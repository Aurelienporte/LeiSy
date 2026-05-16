<script setup>
// import { useTemplateRef } from 'vue'
// const emit = defineEmits(['rename', 'delete'])
// const collectionOptions = useTemplateRef('training-options')

// function deleteCollection() {
//   emit('delete')
//   collectionOptions.value.hidePopover()
// }
// function renameCollection() {
//   emit('rename')
// }
import { ref, computed } from 'vue'
// Settings
const severityMode = ref('nice')
const hints = ref('some')
const attemptsLimit = ref(3)
// const wrongAttempts = ref(0)
// Unlock collection selection if user chooses to customize collections list
const customizedCollectionsList = ref('all')
const enableCustomCollections = computed(() =>
  customizedCollectionsList.value === 'custom' ? true : false,
)
</script>
<template>
  <dialog id="training-options" popover class="training-options" ref="training-options">
    <h2 class="training-options__title">Paramètres</h2>
    <form class="training-options__menu">
      <h3>Collections</h3>
      <div class="collections-options">
        <div>
          <label for="all">Toutes</label>
          <input type="radio" id="all" value="all" v-model="customizedCollectionsList" checked />
        </div>
        <div>
          <label for="custom">Sélectionner</label>
          <input type="radio" id="custom" value="custom" v-model="customizedCollectionsList" />
        </div>
      </div>

      <label for="collections">Collections:</label>
      <select
        name="collections"
        id="collections"
        v-model="selectedCollections"
        multiple
        :disabled="!enableCustomCollections"
      >
        <option value="">Choisir une ou plusieurs collections</option>
        <option v-for="collection in collections" :key="collection.id" :value="collection.slug">
          {{ collection.name }}
        </option>
      </select>
      <label for="severity">Sévérité:</label>
      <select name="severity" id="severity" required v-model="severityMode">
        <option value="very strict">Très strict</option>
        <option value="strict">Strict</option>
        <option value="nice" selected>Nice</option>
        <option value="tolerant">Tolerant</option>
        <option value="cool">Cool</option>
      </select>
      <label for="attemptsLimit">Limite d'essais:</label>
      <select name="attemptsLimit" id="attemptsLimit" v-model="attemptsLimit">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3" selected>3</option>
      </select>
      <label for="hints">Indices:</label>
      <select name="hints" id="hints" v-model="hints">
        <option value="none">Aucun</option>
        <option value="some" selected>Première lettre</option>
      </select>
    </form>
  </dialog>
</template>
<style scoped>
.training-options {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 8px;
  color: black;
  width: 80vw;
  height: 80dvh;
  overflow: hidden;
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
  .training-options__title {
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
  .training-options__menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    width: calc(100% - 24px * 2);
    place-self: center;
  }
  .training-options__button {
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
  .collections-options {
    display: flex;
    gap: 16px;

    input[type='radio'] {
      appearance: none;
    }
    label:has(+ input[type='radio']:checked) {
      font-weight: 700;
    }
  }
  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    font-family: var(--primary-font);
    opacity: 0.8;
  }
  label {
    font-size: 1rem;
    font-weight: 700;
    font-family: var(--primary-font);
    opacity: 0.8;
  }
  label[for='collections'] {
    display: none;
  }
}
</style>
