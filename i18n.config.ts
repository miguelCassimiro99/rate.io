export default defineI18nConfig(() => ({
  legacy: false,
  locale: "pt-BR",
  messages: {
    en: {
      welcome: "Welcome to Rate.io",
      hero: {
        title: "Separate expenses, not friendships",
        description:
          "Say goodbye to awkward conversations and complicated cost calculations",
        features: [
          {
            title: "Add Participants",
            description:
              "Easily input the names of everyone involved in the shared expenses.",
          },
          {
            title: "Enter Expenses",
            description: "Add items, amounts, and who paid for each expense.",
          },
          {
            title: "Get Transfer Recommendations",
            description:
              "Receive clear instructions on who needs to pay whom and how much.",
          },
        ],
        howItWorksTitle: "How it works",
        howItWorks: {
          1: "Create a new event and add all participants.",
          2: "Enter each expense, including the item name, amount, and who paid for it.",
          3: 'Click "Calculate Split" to see the results.',
          4: "Review the transfer recommendations to settle all debts.",
          5: "Share the results with your friends and settle up!",
        },
        call: "Ready to simplify your expense sharing?",
        cta: "Get Started",
      },

      modal: {
        title: "New divide",
        back: "Back",
        participantsInfo: "Members",
        items: "Items",
        calculate: "Calculate",
        inputEventName: "Event Name",
        inputEventNamePlaceholder: "Party on...",
        inputMembers: "Members",
        inputMembersPlaceholder: "John doe, ...",

        inputExpenseName: "Expense",
        inputPaidBy: "Payd by",
        btnAddOrRemove: "Add or remove participants",
        btnAddItem: "Add item",
        btnCreateItem: "Create item",
        verifyPayingMessage: "One or more items without 'Payd By'",
        resultTitle: "Result",
        resultMessage:
          "{ debtorName } must transfer ${amountValue} to { creditorName }",
        actions: {
          edit: "Edit",
          startOver: "Start over"
        }
      },
    },
    "pt-BR": {
      welcome: "Hello world",

      hero: {
        title: "Separe gastos, não amizades",
        description:
          "Diga adeus a conversas embaraçosas e calculos complicados sobre custos",
        features: [
          {
            title: "Adicionar Participantes",
            description:
              "Facilmente insira os nomes de todos os envolvidos nos gastos compartilhados.",
          },
          {
            title: "Inserir Gastos",
            description:
              "Adicione itens, quantidades e quem pagou por cada gasto.",
          },
          {
            title: "Obter Recomendações de Transferência",
            description:
              "Receba instruções claras sobre quem precisa pagar quem e quanto.",
          },
        ],
        howItWorksTitle: "Como funciona",
        howItWorks: {
          1: "Crie um novo evento e adicione todos os participantes.",
          2: "Insira cada gasto, incluindo o nome do item, quantidade e quem pagou.",
          3: 'Clique em "Calcular" para ver os resultados.',
          4: "Reveja as recomendações de transferência para resolver todos os dívidas.",
          5: "Compartilhe os resultados com seus amigos e resolva!",
        },
        call: "Precisa saber quem vai te fazer o Pix?",
        cta: "Novo rolê",
      },
      modal: {
        title: "Novo rolê",
        back: "Voltar",
        participantsInfo: "Membros",
        items: "Itens",
        calculate: "Calcular",
        inputEventName: "Nome do evento",
        inputEventNamePlaceholder: "Festa...",
        inputMembers: "Membros",
        inputMembersPlaceholder: "João, ...",

        inputExpenseName: "Gasto",
        inputPaidBy: "Pago por",
        btnAddOrRemove: "Adicionar ou remover membros",
        btnAddItem: "Adicionar item",
        btnCreateItem: "Criar item",
        verifyPayingMessage: "Um ou mais itens sem 'Pago Por'",
        resultTitle: "Resultado",
        resultMessage:
          "{ debtorName } deve transferir ${amountValue} para { creditorName }",
          actions: {
            edit: "Editar",
            startOver: "Começar de novo"
          }
      },
    },
  },
  plugins: {
    i18n: {
      defaultLocale: "en",
    },
  },
}));
