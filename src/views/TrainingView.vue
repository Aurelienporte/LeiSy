<script setup>
import CardThumbnail from '@/components/CardThumbnail.vue'
import TheHeader from '@/components/TheHeader.vue'
// import { getCardsFromStore } from '@/utils'
import { ref } from 'vue'

const cards = ref([
  {
    id: 1,
    question: 'Question 1',
    answer: 'Answer 1',
    collection: 'collection-1',
  },
])

const userAnswer = ref('')
const goodAnswer = ref(false)
const badAnswer = ref(false)
// // Fetch cards on mount
// onMounted(async () => {
//   cards.value = await getCardsFromStore()
//   console.log('cards in store:', cards.value)
// })

// const counter = ref(0)
// const nextCard = computed(() => {
//   if (cards.value.length > 0) {
//     return cards.value[counter.value]
//   }
//   return null
// })
</script>
<template>
  <TheHeader :settings-enabled="false" />
  <CardThumbnail :card="cards[0]" />
  <form action="">
    <label for="answer">Réponse:</label>
    <span v-if="goodAnswer">Bonne réponse!</span>
    <span v-else-if="badAnswer">Quelque chose n'est pas correct.</span>
    <input type="text" placeholder="Votre réponse" name="answer" id="answer" v-model="userAnswer" />
    <input type="submit" value="Vérifier" />
  </form>
</template>
<style scoped></style>
