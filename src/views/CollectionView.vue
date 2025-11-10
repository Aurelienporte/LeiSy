<template>
  <TheHeader title="Collections" :settings-enabled="true" />
  <collectionManager />
</template>
<script setup>
import collectionManager from '../components/collectionManager.vue'
import TheHeader from '@/components/TheHeader.vue'
</script>
