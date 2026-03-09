<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentCardIndex: {
    type: Number,
    required: true,
  },
  totalCards: {
    type: Number,
    required: true,
  },
  attemptsLimit: {
    type: Number,
    required: true,
  },
  wrongAttempts: {
    type: Number,
    required: true,
  },
  goodAnswer: {
    type: Boolean,
    required: false,
    default: false,
  },
  badAnswer: {
    type: Boolean,
    required: false,
    default: false,
  },
  failure: {
    type: Boolean,
    required: false,
    default: false,
  },
  isFinished: {
    type: Boolean,
    required: false,
    default: false,
  },
})
const remainingAttempts = computed(() => props.attemptsLimit - props.wrongAttempts)
const showAttempts = computed(() => remainingAttempts.value > 0 && props.badAnswer)
const nothingSpecific = computed(
  () =>
    !props.goodAnswer &&
    !props.badAnswer &&
    !props.failure &&
    !props.isFinished &&
    props.totalCards > 0,
)
</script>

<template>
  <div class="training-status-bar">
    <p v-if="showAttempts">Oups ! Il reste {{ remainingAttempts }} essais</p>
    <p v-if="totalCards === 0">Pas de cartes à réviser</p>
    <p v-if="goodAnswer && !isFinished">Bonne réponse !</p>
    <p v-if="failure">Désolé, tentatives épuisées</p>
    <p v-if="isFinished">Vous avez fini le quizz</p>
    <p v-if="nothingSpecific">Carte {{ currentCardIndex + 1 }} / {{ totalCards }}</p>
  </div>
</template>

<style scoped>
.training-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
}
</style>
