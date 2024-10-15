<template>
  <div
    class="py-2 text-base leading-6 space-y-4 text-gray-200 sm:text-lg sm:leading-7 w-full"
  >
    <div class="flex flex-col items-start">
      <label class="leading-loose">Event Name</label>
      <input
        type="text"
        class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
        placeholder="Event name"
        v-model="roleStore.name"
      />
    </div>
  </div>

  <div class="flex flex-col w-full">
    <div
      class="py-3 text-base leading-6 space-y-4 text-gray-200 sm:text-lg sm:leading-7 w-full"
    >
      <div class="flex flex-col items-start w-full">
        <label class="leading-loose">Participants</label>
        <div class="flex w-full gap-3">
          <input
            type="text"
            class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            placeholder="Add participant"
            v-model="participant"
          />
          <button @click="addParticipant" class="px-4 py-2 bg-blue-600 transition-all hover:bg-blue-700 text-white rounded-md">
            Add
          </button>
        </div>

        <div class="flex flex-wrap gap-2 py-2 w-full min-h-[34px]">
          <div
            v-if="roleStore.participants.length"
            v-for="item in roleStore.participants"
            :key="item"
            class="flex justify-between items-center text-xs px-2 py-1 rounded-xl gap-3 bg-customOrange-500 shadow-md shadow-gray-600 text-gray-100 uppercase"
          >
            <span class="">{{ item }}</span>
            <button class="text-xs flex justify-center items-center" @click="removeParticipant(item)">
              <Icon name="ph:x-bold" class="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import { useRoleStore } from '~/store/role';

const roleStore = useRoleStore();
const participant = ref("");

const addParticipant = () => {
  if(!participant.value) return;
  roleStore.participants.push(participant.value);

  if(roleStore.expenses && roleStore.expenses.length > 0) {
    roleStore.expenses.forEach((item) => {
      item.consumers.push({
        name: participant.value,
        value: true
      })
    })
  }
  participant.value = "";
}

const removeParticipant = (person: string) => {
  if(!person) return;

  roleStore.participants = roleStore.participants.filter((item) => item !== person);
}

</script>
<style scoped></style>
