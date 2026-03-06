<script setup>
import DeleteIcon from '@/assets/DeleteIcon.vue'

defineProps({
  card: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['deleteCard'])
function emitIdToDelete(id) {
  emit('deleteCard', id)
}
</script>
<template>
  <div class="card-thumbnail">
    <span> {{ card.question }} </span>
    <button popovertarget="card-deleter" @click="emitIdToDelete(card.id)">
      <DeleteIcon />
    </button>
  </div>
</template>
<style scoped>
.card-thumbnail {
  display: grid;
  grid-template-columns: 1fr 50px;
  place-items: center;
  height: 25svh;
  border: 1px solid black;
  border-radius: 8px;
  background-color: white;
}
</style>
