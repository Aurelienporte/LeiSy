<script setup>
import TheHeader from '@/components/TheHeader.vue'
import TrainingCard from '@/components/TrainingCard.vue'
// import { getCardsFromStore } from '@/utils'
import { computed, ref } from 'vue'

const cards = ref([
  {
    id: 1,
    question: 'Question 1',
    answer: 'Réponse 1',
    collection: 'collection-1',
  },
  {
    id: 2,
    question: 'Question 2',
    answer: 'Réponse 2',
    collection: 'collection-1',
  },
])

const userAnswer = ref('')
const goodAnswer = ref(false)
const badAnswer = ref(false)
const currentCardIndex = ref(0)
const severityMode = ref('nice')
const wrongAttempts = ref(0)
const attemptsLimit = ref(3)
const hints = ref('some')
const placeholder = computed(() => {
  if (hints.value === 'some' && wrongAttempts.value > 0) {
    const currentCard = cards.value[currentCardIndex.value]
    if (currentCard) {
      return `${currentCard.answer.substring(0, wrongAttempts.value)}...`
    }
  }
  return 'Votre réponse'
})
const isFinished = ref(false)

function checkAnswer(mode) {
  const currentCard = cards.value[currentCardIndex.value]
  if (!currentCard) return

  // very strict mode
  const userAnswerTrimmed = userAnswer.value.trim()
  const correctAnswerTrimmed = currentCard.answer.trim()

  let isCorrect = false

  if (mode === 'very strict') {
    isCorrect = userAnswerTrimmed === correctAnswerTrimmed
  }

  // strict mode (ignoring diacritics)
  const userAnswerNormalized = userAnswerTrimmed.normalize('NFD').replace(/\p{Diacritic}+/gu, '')
  const correctAnswerNormalized = correctAnswerTrimmed
    .normalize('NFD')
    .replace(/\p{Diacritic}+/gu, '')

  if (mode === 'strict') {
    isCorrect = userAnswerNormalized === correctAnswerNormalized
  }

  // nice mode (strict with case insensitivity)
  const userAnswerCaseInsensitive = userAnswerNormalized.toLowerCase()
  const correctAnswerCaseInsensitive = correctAnswerNormalized.toLowerCase()

  if (mode === 'nice') {
    isCorrect = userAnswerCaseInsensitive === correctAnswerCaseInsensitive
  }

  // tolerant mode (nice mode with a Levenshtein distance of 1 or less)
  if (mode === 'tolerant') {
    isCorrect = levenshtein(userAnswerCaseInsensitive, correctAnswerCaseInsensitive) <= 1
  }
  // cool mode ( Levenshtein distance of 2 or less)
  if (mode === 'cool') {
    isCorrect = levenshtein(userAnswerCaseInsensitive, correctAnswerCaseInsensitive) <= 2
  }

  if (isCorrect) {
    goodAnswer.value = true
    badAnswer.value = false
    // Move to next card + reset
    currentCardIndex.value++
    wrongAttempts.value = 0
    goodAnswer.value = false
    badAnswer.value = false
    if (currentCardIndex.value >= cards.value.length) {
      isFinished.value = true
    }
  } else {
    goodAnswer.value = false
    badAnswer.value = true
    wrongAttempts.value++
    if (wrongAttempts.value >= attemptsLimit.value) {
      // Move to next card after attempts limit reached + reset
      currentCardIndex.value++
      wrongAttempts.value = 0
      goodAnswer.value = false
      badAnswer.value = false
      if (currentCardIndex.value >= cards.value.length) {
        isFinished.value = true
      }
    }
  }

  // Clear user answer for next attempt
  userAnswer.value = ''
}

function levenshtein(a, b) {
  const matrix = []

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + (a[j - 1] === b[i - 1] ? 0 : 1),
      )
    }
  }
  console.log('Levenshtein distance:', matrix[b.length][a.length])
  return matrix[b.length][a.length]
}

function setTrainingParams() {
  // This function can be used to set any additional parameters for the training session based on the selected severity mode.
  console.log('Selected severity mode:', severityMode.value)
  console.log('Selected attempts limit:', attemptsLimit.value)
}

const currentCard = computed(() => {
  if (cards.value.length > 0 && currentCardIndex.value < cards.value.length) {
    return cards.value[currentCardIndex.value]
  }
  return false
})
</script>
<template>
  <TheHeader :settings-enabled="false" />
  <div class="training">
    <TrainingCard v-if="currentCard" :card="currentCard" :error="badAnswer" />
    <form @submit.prevent="checkAnswer(severityMode)">
      <label for="answer">Réponse:</label>
      <span v-if="goodAnswer">Bonne réponse!</span>
      <span v-else-if="badAnswer">Quelque chose n'est pas correct.</span>
      <input
        type="text"
        :placeholder="placeholder"
        name="answer"
        id="answer"
        v-model="userAnswer"
      />
      <input type="submit" value="Vérifier" />
    </form>
    <form>
      <label for="severity">Sévérité:</label>
      <select
        name="severity"
        id="severity"
        required
        v-model="severityMode"
        @change="setTrainingParams"
      >
        <option value="very strict">Très strict</option>
        <option value="strict">Strict</option>
        <option value="nice" selected>Nice</option>
        <option value="tolerant">Tolerant</option>
        <option value="cool">Cool</option>
      </select>
      <label for="attemptsLimit">Limite d'essais:</label>
      <select
        name="attemptsLimit"
        id="attemptsLimit"
        v-model="attemptsLimit"
        @change="setTrainingParams"
      >
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
    <span v-if="isFinished">Vous avez fini le quizz</span>
    <span v-if="cards.length === 0">Aucune carte disponible.</span>
  </div>
</template>
<style scoped>
.training {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
