<script setup>
defineProps({
  card: {
    type: Object,
    required: true,
  },
  success: {
    type: Boolean,
    required: false,
    default: false,
  },
  failure: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>
<template>
  <div class="card-thumbnail" :class="{ flipped: success || failure }">
    <div class="card__back">
      <p>{{ card.answer }}</p>
    </div>
    <div class="card__front">
      <p>{{ card.question }}</p>
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
  perspective: 500px;
  transform-style: preserve-3d;
  transition: none;

  &:is(.flipped) {
    transform: rotateX(180deg);
    transition: transform 0.4s ease-out;
  }
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
  .card__back {
    /* display: none; */
    transform: rotateX(180deg);
    backface-visibility: hidden;
  }
  .card__front {
    /* display: none; */
    backface-visibility: hidden;
  }
  .error:has(span) {
    & span {
      visibility: visible;
    }
  }
}
</style>
