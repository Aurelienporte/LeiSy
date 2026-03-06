<script setup>
defineProps({
  card: {
    type: Object,
    required: true,
  },
  error: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>
<template>
  <div class="card-thumbnail">
    <div class="card__front" :class="{ error: error }">
      <span>Réponse incorrecte </span>
      <p>{{ card.question }}</p>
    </div>
    <div class="card__back">
      <span>Bonne réponse</span>
      <span>La bonne réponse est:</span>
      <p>{{ card.answer }}</p>
    </div>
  </div>
</template>
<style scoped>
.card-thumbnail {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 25vh;
  place-items: center;
  width: 100%;

  .card__front,
  .card__back {
    grid-area: 1/1/2/2;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    place-items: center;
    border: 1px solid black;
    border-radius: 8px;
    background-color: white;

    & span {
      grid-area: 1/1/2/2;
      align-self: start;
      visibility: hidden;
    }
    & p {
      grid-area: 1/1/2/2;
      align-self: center;
    }
  }
  /* .card__back {
    display: none;
  } */
  .card__front {
    display: none;
  }
  .error:has(span) {
    & span {
      visibility: visible;
    }
  }
}
</style>
