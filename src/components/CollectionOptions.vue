<script setup>
const emit = defineEmits(['rename', 'delete'])
function deleteCollection() {
  emit('delete')
}
function renameCollection() {
  emit('rename')
}
</script>
<template>
  <dialog id="collection-options" popover>
    <button @click="renameCollection">Renommer</button>
    <button @click="deleteCollection">Supprimer</button>
  </dialog>
</template>
