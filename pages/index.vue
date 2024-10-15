<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
    <header class="container mx-auto px-4 py-8">
      <nav class="flex justify-between items-center">
        <div class="flex justify-center items-center">
          <NuxtImg src="/rateio.svg" class="w-12 h-12" />
          <h1 class="text-2xl font-bold">Rate.io</h1>

        </div>
        <NuxtLink to="https://github.com/miguelCassimiro99" target="_blank">
          <Icon name="mdi:github" class="w-6 h-6 bg-customPink-400 hover:bg-gradient-to-r from-customOrange-500 to-customPink-500" />
        </NuxtLink>
      </nav>
    </header>

    <main class="container mx-auto px-4 py-12">
      <section class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4">Split Expenses Effortlessly</h2>
        <p class="text-xl text-gray-300 mb-8">
          Say goodbye to complicated calculations and awkward money conversations.
        </p>

        <StartButtonClient label="Get Started" />
      
      </section>

      <section class="grid md:grid-cols-3 gap-8 mb-16">
        <div v-for="(feature, index) in features" :key="index" class="bg-gray-800 p-6 rounded-lg">
          <component :is="feature.icon" class="w-12 h-12 mb-4 text-customPink-400" />
          <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
          <p class="text-gray-400">{{ feature.description }}</p>
        </div>
      </section>

      <section class="bg-gray-800 p-8 rounded-lg mb-16">
        <h3 class="text-2xl font-bold mb-4">How It Works</h3>
        <ol class="list-decimal list-inside space-y-4">
          <li v-for="(step, index) in howItWorks" :key="index" class="flex items-start">
            <span class="mr-2">{{ index + 1 }}.</span>
            <p>{{ step }}</p>
          </li>
        </ol>
      </section>

      <section class="text-center">
        <h3 class="text-2xl font-bold mb-4">Ready to simplify your expense sharing?</h3>
        <StartButtonClient label="Novo role" />
      </section>
    </main>

    <footer class="bg-gray-900 py-8 mt-16">
      <div class="container mx-auto px-4 text-center text-gray-400">
        <p>&copy; 2024 SplitSmart. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { UsersIcon, CalculatorIcon, CreditCardIcon } from 'lucide-vue-next'

import StartButtonClient from '~/components/sections/StartButton.client.vue';

const features = [
  {
    icon: UsersIcon,
    title: 'Add Participants',
    description: 'Easily input the names of everyone involved in the shared expenses.'
  },
  {
    icon: CalculatorIcon,
    title: 'Enter Expenses',
    description: 'Add items, amounts, and who paid for each expense.'
  },
  {
    icon: CreditCardIcon,
    title: 'Get Transfer Recommendations',
    description: 'Receive clear instructions on who needs to pay whom and how much.'
  }
]

const howItWorks = [
  'Create a new event and add all participants.',
  'Enter each expense, including the item name, amount, and who paid for it.',
  'Click "Calculate Split" to see the results.',
  'Review the transfer recommendations to settle all debts.',
  'Share the results with your friends and settle up!'
]
</script>