<script setup>
import DeleteIcon from '@/assets/DeleteIcon.vue'
</script>

<template>
  <button class="delete-button"><DeleteIcon></DeleteIcon></button>
</template>

<style scoped>
.delete-button {
  position: fixed;
  bottom: 80px;
  right: 16px;
  display: grid;
  place-items: center;
  width: var(--button-radius);
  height: var(--button-radius);
  z-index: 10;
  border-radius: 50%;
  background-color: #dd442a;

  svg {
    fill: var(--text-color);
    width: calc(var(--button-radius) * 2 / 3);
    height: calc(var(--button-radius) * 2 / 3);
  }

  &.active {
    box-shadow: 0 0 0 4px rgba(221, 68, 42, 0.5);
  }
  &:disabled {
    background-color: #dd442a80;
    cursor: not-allowed;
  }
}
</style>
