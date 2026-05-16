<script setup>
import DeleteIcon from '@/assets/DeleteIcon.vue'

defineProps({
  card: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['deleteCard'])
function emitCardToDelete(id) {
  emit('deleteCard', id)
}
</script>
<template>
  <div class="card-thumbnail">
    <p>{{ card.question }}</p>
    <button popovertarget="card-deleter" @click="emitCardToDelete(card.id)">
      <DeleteIcon />
    </button>
  </div>
</template>
<style scoped>
.card-thumbnail {
  display: grid;
  /* grid-template-columns: 1fr 50px; */
  place-items: center;
  height: 25svh;
  /* border: 1px solid black; */
  /* border-radius: 8px; */
  /* background-color: #f0f9ff; */
  display: grid;
  place-items: center;
  /* height: 96px;
  min-width: 64px; */
  font-family: var(--primary-font);
  font-size: var(--title-medium);
  padding: 16px;

  &::after,
  &::before {
    --size: 120%;

    grid-area: 1/1;
    content: '';
    background-color: var(--text-color);
    height: var(--size);
    width: calc(var(--size) - 10%);

    clip-path: shape(
      from 0% 5%,
      curve to 5% 0% with -1% 0%,
      line to 18% 2%,
      line to 38% 4%,
      line to 83% 3%,
      curve to 100% 5% with 98% 3%,
      line to 98% 46%,
      line to 98% 89%,
      curve to 95% 95% with 98% 94%,
      line to 78% 97%,
      line to 42% 95%,
      line to 9% 99%,
      curve to 2% 97% with 11% 99%,
      line to 2% 67%,
      line to 0% 15%,
      close
    );
  }
  &::before {
    --thickness: 5px;
    z-index: -10;
    height: calc(var(--size) + var(--thickness));
    width: calc(var(--size) - 10% + var(--thickness));
  }
  &::after {
    z-index: -5;
    background-color: #f0f9ff;
  }
  p {
    grid-area: 1/1;
  }
  button {
    grid-area: 1/1;
    justify-self: end;
    align-self: start;
    background-color: transparent;
  }
}
</style>
