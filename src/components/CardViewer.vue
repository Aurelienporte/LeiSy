<template>
  <div class="card-viewer">
    <div class="card-thumbnail" v-for="card in cards" :key="card.id" @click="selectCard(card.id)">
      <span>
        {{ card.question }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.card-viewer {
  --gap: 16px;

  display: flex;
  flex-flow: column;
  gap: var(--gap);
  padding-inline: var(--gap);
  padding-block: 48px;
  position: relative;
  z-index: 5;

  .card-thumbnail {
    --side: calc(100vw - var(--gap) * 2);

    display: grid;
    place-items: center;
    height: calc(var(--side) / 2);
    width: var(--side);
    border: 1px solid black;
    border-radius: 8px;
    background-color: white;
  }
}
</style>

<script setup>
defineProps({
  cards: {
    type: Array,
    required: true,
  },
})

// Emit selected card id to parent component
const emit = defineEmits(['cardSelected'])

function selectCard(cardId) {
  emit('cardSelected', cardId)
}
</script>
