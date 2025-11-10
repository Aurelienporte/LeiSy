<template>
  <TheHeader title="Collections" :settings-enabled="true" />
  <collectionEditor collection="My Collection" />
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue'
import collectionEditor from '@/components/collectionEditor.vue'
</script>
