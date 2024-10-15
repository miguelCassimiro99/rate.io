<template>
  <dialog id="my_modal_3" class="modal " :class="{ 'modal-open': open }">
    <div class="modal-box bg-gray-800">
      <form method="dialog">
        <button
          @click="closeModal"
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-300"
        >
          ✕
        </button>
      </form>
      <h3 class="text-2xl font-bold text-gray-200">{{ title }}</h3>
      <slot name="modal-content"></slot>
    </div>
  </dialog>
</template>
<script setup lang="ts">
defineProps<{ title: string; open: boolean }>();

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>
<style scoped></style>
