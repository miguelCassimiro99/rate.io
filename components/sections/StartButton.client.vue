<template>
  <button
    @click="handleModalOpen"
    class="bg-gradient-to-r from-customOrange-500 to-customPink-500 px-6 py-3 rounded-md text-lg font-semibold transition duration-300 ease-in-out"
  >
    {{ props.label }}
  </button>

  <Modal
    :open="isModalOpen"
    :title="$t('modal.title')"
    @close="isModalOpen = false"
  >
    <template #modal-content>
      <Expense />
    </template>
  </Modal>
</template>
<script setup lang="ts">
import Modal from "../ui/Modal.vue";
import Expense from "./Expense.vue";
const { gtag } = useGtag();

const props = defineProps<{ label: string }>();
const isModalOpen = ref(false);

const handleModalOpen = () => {
  isModalOpen.value = true;
  gtag("event", "open_modal", {
    app_name: "Rate.io",
    screen_name: "index",
    value: "get_started",
  });
};
</script>
<style scoped></style>
