<script setup>
import PlusIcon from '@/assets/PlusIcon.vue'
</script>

<template>
  <button class="add-button" popovertarget="collection-creator">
    <PlusIcon></PlusIcon>
  </button>
</template>

<style scoped>
.add-button {
  position: fixed;
  bottom: 16px;
  right: 16px;
  display: grid;
  place-items: center;
  width: var(--button-radius);
  height: var(--button-radius);
  border-radius: 50%;
  background-color: var(--main-color);
  z-index: 10;

  &.active {
    box-shadow: 0 0 0 4px rgba(42, 221, 96, 0.5);
  }
  &:disabled {
    background-color: #2add9b80;
    cursor: not-allowed;
  }
  svg {
    fill: var(--text-color);
    width: calc(var(--button-radius) * 2 / 3);
    height: calc(var(--button-radius) * 2 / 3);
  }
}
</style>
