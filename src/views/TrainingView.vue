<script setup>
import TheHeader from '@/components/TheHeader.vue'
import TrainingCard from '@/components/TrainingCard.vue'
import TrainingStatusBar from '@/components/TrainingStatusBar.vue'
import { getCardsFromStore, getCollectionFromStore } from '@/utils'
import { computed, ref, onMounted } from 'vue'

const cards = ref([])
const collections = ref([])
// Fetch cards on mount
onMounted(async () => {
  cards.value = await getCardsFromStore()
})
// Fetch collections on mount
onMounted(async () => {
  collections.value = await getCollectionFromStore()
})
const selectedCards = computed(() => {
  if (customizedCollectionsList.value === 'all') {
    return cards.value
  }
  return cards.value.filter((card) => selectedCollections.value.includes(card.collection))
})
const userAnswer = ref('')
const goodAnswer = ref(false)
const badAnswer = ref(false)
const failure = ref(false)
const currentCardIndex = ref(0)
const severityMode = ref('nice')
const wrongAttempts = ref(0)
const attemptsLimit = ref(3)
const hints = ref('some')
const isFinished = ref(false)
const selectedCollections = ref([])
const customizedCollectionsList = ref('all')

const answerNeeded = computed(() => {
  return !goodAnswer.value && !failure.value && !isFinished.value
})

const enableCustomCollections = computed(() =>
  customizedCollectionsList.value === 'custom' ? true : false,
)

const placeholder = computed(() => {
  if (hints.value === 'some' && wrongAttempts.value > 0) {
    const currentCard = selectedCards.value[currentCardIndex.value]
    if (currentCard) {
      return `${currentCard.answer.substring(0, wrongAttempts.value)}...`
    }
  }
  return 'Votre réponse'
})

function checkAnswer(mode) {
  const currentCard = selectedCards.value[currentCardIndex.value]
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
  } else {
    goodAnswer.value = false
    badAnswer.value = true
    wrongAttempts.value++
    if (wrongAttempts.value >= attemptsLimit.value) {
      failure.value = true
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

const currentCard = computed(() => {
  if (selectedCards.value.length > 0 && currentCardIndex.value < selectedCards.value.length) {
    return selectedCards.value[currentCardIndex.value]
  }
  return false
})

function nextCard() {
  if (currentCardIndex.value < selectedCards.value.length - 1) {
    currentCardIndex.value++
    //reset states
    goodAnswer.value = false
    badAnswer.value = false
    failure.value = false
    wrongAttempts.value = 0
  } else {
    isFinished.value = true
  }
}
</script>
<template>
  <TheHeader :settings-enabled="false" />
  <div class="training">
    <TrainingStatusBar
      :current-card-index="currentCardIndex"
      :total-cards="selectedCards.length"
      :attempts-limit="attemptsLimit"
      :wrong-attempts="wrongAttempts"
      :good-answer="goodAnswer"
      :bad-answer="badAnswer"
      :failure="failure"
      :is-finished="isFinished"
    />
    <TrainingCard
      v-if="currentCard && isFinished === false"
      :card="currentCard"
      :success="goodAnswer"
      :failure="failure"
    />
    <button @click="nextCard" v-if="!isFinished">Question suivante</button>
    <form @submit.prevent="checkAnswer(severityMode)" v-show="answerNeeded">
      <label for="answer">Réponse:</label>
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
      <div>
        <label for="customizeCollectionsList">Toutes</label>
        <input type="radio" id="all" value="all" v-model="customizedCollectionsList" checked />
      </div>
      <div>
        <label for="customizeCollectionsList">Sélectionner</label>
        <input type="radio" id="custom" value="custom" v-model="customizedCollectionsList" />
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
