<template>
  <div class="max-w-md mx-auto text-gray-200 relative">
    <div class="text-left">
      <button v-if="currentStep === 2" @click="currentStep = 1" class="flex justify-center items-center gap-2">
        <Icon name="ph:arrow-bend-up-left-light" class="w-4 h-4 text-gray-200" />
        <span class="text-xs">voltar</span>
      </button>
    </div>
    <div v-if="currentStep === 1" class="mt-10 divide-gray-200 flex flex-col justify-start items-center gap-5">
      <div class="collapse gap-2 collapse-arrow">
        <input type="radio" name="my-accordion-1" checked />
        <div
          class="collapse-title text-xl font-medium rounded-xl bg-slate-500 data-[chec] shadow-2xl text-left flex justify-start items-center gap-3"
        >
          <Icon name="ph:users-three" class="w-8 h-8 text-customOrange-400" />
          <span> Role Info </span>
        </div>
        <div class="collapse-content">
          <RoleInfo />
        </div>
      </div>
      <div class="collapse collapse-arrow">
        <input type="radio" name="my-accordion-1" />
        <div
          class="collapse-title text-xl font-medium rounded-xl shadow-2xl bg-slate-500 flex justify-start items-center gap-3"
        >
          <Icon
            name="ph:shopping-cart-simple"
            class="w-8 h-8 text-customOrange-400"
          />
          <span>Items</span>
        </div>
        <div class="collapse-content">
          <Items />
        </div>
      </div>

      <button
        :disabled="!expenses || !participants"
        @click="handleCalculateSplit"
        class="disabled:opacity-30 px-4 py-2 bg-gradient-to-r from-customOrange-500 to-customPink-500 transition-all hover:bg-customPink-500 text-white rounded-md w-full"
      >
        CALCULAR
      </button>
    </div>

    <div class="mt-4" v-if="currentStep === 2 && resultMessage.length">
      <p class="my-2"v-for="result in resultMessage" :key="result"> {{ result }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import RoleInfo from "./expenses/RoleInfo.vue";
import Items from "./expenses/Items.vue";
import { useRoleStore } from "~/store/role";

interface IParticipantDebt {
  name: string;
  balance: number;
}

const { expenses, participants } = useRoleStore();

const currentStep = ref<1 | 2>(1);

const resultMessage = ref<string[]>([]);


const handleCalculateSplit = () => {
resultMessage.value = [];
  currentStep.value = 2;

  let balances: { [key: string]: number } = {};

  
  participants.forEach(participant => {
    balances[participant] = 0;
  });

  
  expenses.forEach(expense => {
    const validConsumers = expense.consumers.filter(consumer => consumer.value);

    if (validConsumers.length === 0) return;

    let individualValue = expense.value / validConsumers.length;

    validConsumers.forEach(consumer => {
      balances[consumer.name] -= individualValue;
    });


    balances[expense.paidBy] += expense.value;
  });

  let debts: IParticipantDebt[] = [];


  Object.keys(balances).forEach(participant => {
    if (balances[participant] !== 0) {
      debts.push({ name: participant, balance: balances[participant] });
    }
  });

  // Ordena para facilitar a resolução das dívidas (devedores primeiro)
  debts.sort((a, b) => a.balance - b.balance);

  let i = 0;
  let j = debts.length - 1;

  while (i < j) {
    let debtor = debts[i];
    let creditor = debts[j];

    let amount = Math.min(Math.abs(debtor.balance), creditor.balance);

    resultMessage.value.push(`${debtor.name} deve transferir R$${amount.toFixed(2)} para ${creditor.name}.`);

    // Atualiza os saldos após a transferência
    debtor.balance += amount;
    creditor.balance -= amount;

    // Move os ponteiros
    if (debtor.balance === 0) i++;
    if (creditor.balance === 0) j--;
  }

  if (resultMessage.value.length === 0) {
    resultMessage.value.push("Todos os pagamentos estão equilibrados.");
  }
}


</script>
<style scoped></style>
