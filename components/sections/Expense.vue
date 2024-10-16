<template>
  <div class="max-w-md mx-auto text-gray-200 relative">
    <div class="text-left">
      <button
        v-if="currentStep === 2"
        @click="currentStep = 1"
        class="flex justify-center items-center gap-2 btn btn-xs"
      >
        <Icon
          name="ph:arrow-bend-up-left-light"
          class="w-4 h-4 text-gray-900"
        />
        <span class="text-xs">{{ $t("modal.back") }}</span>
      </button>
    </div>
    <div
      v-if="currentStep === 1"
      class="mt-10 divide-gray-200 flex flex-col justify-start items-center gap-5"
    >
      <div class="collapse gap-2 collapse-arrow">
        <input type="radio" name="my-accordion-1" checked />
        <div
          class="collapse-title text-xl font-medium rounded-xl bg-slate-500 data-[chec] shadow-2xl text-left flex justify-start items-center gap-3"
        >
          <Icon name="ph:users-three" class="w-8 h-8 text-customOrange-400" />
          <span>{{ $t("modal.participantsInfo") }}</span>
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
          <span>{{ $t("modal.items") }}</span>
        </div>
        <div class="collapse-content">
          <Items />
        </div>
      </div>

      <button
        :disabled="!expenses.length || !participants.length"
        @click="handleCalculateSplit"
        class="disabled:opacity-30 px-4 py-2 bg-gradient-to-r from-customOrange-500 to-customPink-500 transition-all hover:bg-customPink-500 text-white rounded-md w-full"
      >
        {{ $t("modal.calculate") }}
      </button>
    </div>

    <div class="text-left min-h-[15vh] flex flex-col justify-between gap-12 overflow-hidden" v-if="currentStep === 2 && resultMessage.length">
      <div>
        <h2 class="text-left text-xl font-semibold mt-6">
          {{ $t("modal.resultTitle") }}:
        </h2>
        <ul class="list-disc">
          <li class="my-2" v-for="result in resultMessage" :key="result">
            {{ result }}
          </li>
        </ul>
      </div>
      <div class="flex justify-center items-center gap-2">
        <button @click="currentStep = 1" class="btn btn-sm rounded-lg flex-1 btn-info text-gray-100">{{ $t("modal.actions.edit") }}</button>
        <button @click="shareOnWhatsapp" class="btn btn-sm rounded-lg flex-1 btn-success">
          <Icon name="mdi:whatsapp" class="h-6 w-6 text-gray-100" />
        </button>
        <button @click="startOver" class="btn btn-sm rounded-lg border-none text-gray-100 flex-1 bg-gradient-to-r from-customOrange-500 to-customPink-500">{{ $t("modal.actions.startOver") }}</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import RoleInfo from "./expenses/RoleInfo.vue";
import Items from "./expenses/Items.vue";
import { useRoleStore, type RoleType } from "~/store/role";
import { useI18n } from "#imports";
const { gtag } = useGtag();

const { t } = useI18n();

interface IParticipantDebt {
  name: string;
  balance: number;
}

const { expenses, participants } = useRoleStore();
const currentStep = ref<1 | 2>(1);
const resultMessage = ref<string[]>([]);
const store = useRoleStore();

const emptyRole = {
  name: "",
  participants: [],
  expenses: []
} as RoleType

const startOver = () => {
  currentStep.value = 1;
  resultMessage.value = [];

  store.name = "";
  store.participants = [];
  store.expenses = [];
}

const handleCalculateSplit = () => {
  resultMessage.value = [];
  currentStep.value = 2;
  gtag("event", "calculate", {
    app_name: "Rate.io",
    screen_name: "index",
    value: "calculate_costs",
  });

  let balances: { [key: string]: number } = {};

  participants.forEach((participant) => {
    balances[participant] = 0;
  });

  expenses.forEach((expense) => {
    const validConsumers = expense.consumers.filter(
      (consumer) => consumer.value
    );

    if (validConsumers.length === 0) return;

    let individualValue = expense.value / validConsumers.length;

    validConsumers.forEach((consumer) => {
      balances[consumer.name] -= individualValue;
    });

    balances[expense.paidBy] += expense.value;
  });

  let debts: IParticipantDebt[] = [];

  Object.keys(balances).forEach((participant) => {
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

    // resultMessage.value.push(
    //   `${debtor.name} deve transferir R$${amount.toFixed(2)} para ${
    //     creditor.name
    //   }.`
    // );

    resultMessage.value.push(
      t("modal.resultMessage", {
        debtorName: debtor.name,
        amountValue: amount.toFixed(2),
        creditorName: creditor.name,
      })
    );

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
};

const shareOnWhatsapp = () => {
  gtag("event", "share_split", {
    app_name: "Rate.io",
    screen_name: "index",
    value: "share",
  });

  const formatted = `Rate-io: \n\n${resultMessage.value.join(`;\n`)}
  `

  const encodedText = encodeURIComponent(formatted);
  const url = `https://wa.me/?text=${encodedText}`;
  window.open(url, "_blank");
}
</script>
<style scoped></style>
