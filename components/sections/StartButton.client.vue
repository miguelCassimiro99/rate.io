<template>
  <button @click="isModalOpen = true" class="bg-gradient-to-r from-customOrange-500 to-customPink-500 px-6 py-3 rounded-md text-lg font-semibold transition duration-300 ease-in-out">
    {{ props.label }}
  </button>

  <Modal :open="isModalOpen" title="Split bill" @close="isModalOpen = false">
    <template #modal-content>
      <Expense />
    </template>
  </Modal>
</template>
<script setup lang="ts">
import Modal from '../ui/Modal.vue';
import Expense from './Expense.vue';

const props = defineProps<{label: string}>()

const isModalOpen = ref(false);

</script>
<style scoped>
</style>