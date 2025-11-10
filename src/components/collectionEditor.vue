<template>
  <cardCreator :collection="collection" />
</template>
<script setup>
import cardCreator from './CardCrator.vue'

defineProps({
  collection: {
    type: String,
    required: true,
  },
})
</script>
