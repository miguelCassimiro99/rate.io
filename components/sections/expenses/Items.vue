<template>
  <div class="flex flex-col items-start w-full gap-3 my-6 overflow-y-scroll">
    <div
      class="flex flex-col gap-1 my-1 w-full"
      v-for="(expense, index) in expenses"
      :key="expense.paidBy"
    >
      <div class="flex flex-col md:flex-row gap-1 w-full">
        <input
          v-model="expense.name"
          type="text"
          class=" px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          placeholder="Nome"
        />
        <input
          v-model="expense.value"
          type="number"
          class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          placeholder="Valor"
        />

        <select
          v-model="expense.paidBy"
          class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
        >
          <option value="">Paid by</option>
          <option
            v-for="participant in participants"
            :key="participant"
            :value="participant"
          >
            {{ participant }}
          </option>
        </select>

        <button
          @click="removeExpense(index)"
          class="p-1 bg-customPink-600 transition-all hover:bg-customPink-700 focus:bg-customPink-700 text-white rounded-md w-full flex justify-center items-center"
        >
          <Icon name="material-symbols:delete-outline" class="w-7 h-7" />
        </button>
      </div>

      <div class="w-full flex justify-start">
        <div class="dropdown h-auto">
          <div
            tabindex="0"
            role="button"
            class="btn btn-xs border-customPink-300 text-customPink-300 btn-outline"
          >
            Add or remove participants
          </div>
          <ul
            tabindex="0"
            class="dropdown-content menu bg-slate-500 rounded-box z-[1] w-52 p-3 shadow"
          >
            <li class="text-left" v-for="consumer in expense.consumers" :key="consumer.name">
              <div class="p-2 capitalize">
                <input v-model="consumer.value" :id="consumer.name" type="checkbox" class="toggle toggle-sm toggle-success" :name="consumer.name" :checked="consumer.value" />
                <label :for="consumer.name" class="cursor-pointer">
                  {{ consumer.name }}
                </label>
                
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <button
      @click="handleAddConsume()"
      class="px-4 py-2 bg-blue-600 transition-all hover:bg-blue-700 text-white rounded-md w-full"
    >
      {{ expenses.length > 0 ? "Adicionar item" : "Criar item" }}
    </button>
  </div>
</template>
<script setup lang="ts">
import { useRoleStore, type IConsumer, type IExpense } from "~/store/role";

const { participants, expenses, addExpense, removeExpense } = useRoleStore();

const handleAddConsume = () => {
  const newExpenseConsumers = [] as IConsumer[];

  participants.forEach((item) => {
    newExpenseConsumers.push({
      name: item,
      value: true,
    });
  });

  addExpense({
    consumers: newExpenseConsumers,
    paidBy: "",
    name: "",
    value: 0.0,
  });
};

const newExpense = ref<IExpense>({
  consumers: [],
  paidBy: "",
  name: "",
  value: 0.0,
});
</script>
<style scoped></style>
