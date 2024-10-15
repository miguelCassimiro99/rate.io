<template>
  <div
    class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
  >
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
      ></div>
      <div
        class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"
      >
        <div class="max-w-md mx-auto">
          <div>
            <h1 class="text-2xl font-semibold">Split Expenses</h1>
          </div>
          <div class="divide-y divide-gray-200">
            <div
              class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
            >
              <div class="flex flex-col">
                <label class="leading-loose">Event Name</label>
                <input
                  type="text"
                  v-model="eventName"
                  class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Event name"
                />
              </div>
              <div class="flex flex-col">
                <label class="leading-loose">Participants</label>
                <div class="flex items-center space-x-2">
                  <input
                    type="text"
                    v-model="newParticipant"
                    class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Add participant"
                  />
                  <button
                    @click="addParticipant"
                    class="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Add
                  </button>
                </div>
                <div class="mt-2 flex flex-wrap">
                  <span
                    v-for="(participant, index) in participants"
                    :key="index"
                    class="px-2 py-1 m-1 text-sm bg-gray-200 rounded-full"
                  >
                    {{ participant }}
                    <button
                      @click="removeParticipant(index)"
                      class="ml-1 text-red-500"
                    >
                      &times;
                    </button>
                  </span>
                </div>
              </div>
              <div class="flex flex-col">
                <label class="leading-loose">Expenses</label>
                <div
                  v-for="(expense, index) in expenses"
                  :key="index"
                  class="flex items-center space-x-2 mb-2"
                >
                  <input
                    v-model="expense.item"
                    type="text"
                    class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Item"
                  />
                  <input
                    v-model.number="expense.amount"
                    type="number"
                    class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-24 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Amount"
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
                    class="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Remove
                  </button>
                </div>
                <button
                  @click="addExpense"
                  class="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Add Expense
                </button>
              </div>
            </div>
            <div class="pt-4 flex items-center space-x-4">
              <button
                @click="calculateSplit"
                class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
              >
                Calculate Split
              </button>
            </div>
          </div>
          <div v-if="showResults" class="mt-6">
            <h2 class="text-xl font-semibold mb-2">Results</h2>
            <div
              v-for="(amount, person) in splitResult"
              :key="person"
              class="mb-1"
            >
              {{ person }}: {{ amount.toFixed(2) }}
            </div>
            <h3 class="text-lg font-semibold mt-4 mb-2">
              Transfer Recommendations
            </h3>
            <div
              v-for="(transfer, index) in transferRecommendations"
              :key="index"
              class="mb-1"
            >
              {{ transfer.from }} should pay {{ transfer.to }}
              {{ transfer.amount.toFixed(2) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const eventName = ref("");
const newParticipant = ref("");
const participants = ref([]);
const expenses = ref([]);
const showResults = ref(false);
const splitResult = ref({});
const transferRecommendations = ref([]);

const addParticipant = () => {
  if (
    newParticipant.value &&
    !participants.value.includes(newParticipant.value)
  ) {
    participants.value.push(newParticipant.value);
    newParticipant.value = "";
  }
};

const removeParticipant = (index) => {
  participants.value.splice(index, 1);
};

const addExpense = () => {
  expenses.value.push({ item: "", amount: 0, paidBy: "" });
};

const removeExpense = (index) => {
  expenses.value.splice(index, 1);
};

const calculateSplit = () => {
  const totalExpense = expenses.value.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const perPersonShare = totalExpense / participants.value.length;

  const balances = {};
  participants.value.forEach((participant) => {
    balances[participant] = 0;
  });

  expenses.value.forEach((expense) => {
    if (expense.paidBy) {
      balances[expense.paidBy] += expense.amount;
    }
  });

  participants.value.forEach((participant) => {
    balances[participant] -= perPersonShare;
  });

  splitResult.value = balances;
  calculateTransfers(balances);
  showResults.value = true;
};

const calculateTransfers = (balances) => {
  const debtors = Object.entries(balances)
    .filter(([_, balance]) => balance < 0)
    .sort(([, a], [, b]) => a - b);
  const creditors = Object.entries(balances)
    .filter(([_, balance]) => balance > 0)
    .sort(([, a], [, b]) => b - a);

  transferRecommendations.value = [];

  while (debtors.length > 0 && creditors.length > 0) {
    const [debtor, debtAmount] = debtors.shift();
    const [creditor, creditAmount] = creditors.shift();

    const transferAmount = Math.min(Math.abs(debtAmount), creditAmount);

    transferRecommendations.value.push({
      from: debtor,
      to: creditor,
      amount: transferAmount,
    });

    if (Math.abs(debtAmount) > creditAmount) {
      debtors.unshift([debtor, debtAmount + transferAmount]);
    } else if (Math.abs(debtAmount) < creditAmount) {
      creditors.unshift([creditor, creditAmount - transferAmount]);
    }
  }
};
</script>
