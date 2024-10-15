import { defineStore } from "pinia";

export interface IConsumer {
  name: string;
  value: boolean
}

export interface IExpense {
  name: string;
  value: number;
  paidBy: string;
  consumers: IConsumer[];
}

export type RoleType = {
  name: string;
  participants: string[];
  expenses: IExpense[];
};

export const useRoleStore = defineStore("role", {
  state: () =>
    ({
      name: "",
      participants: [],
      expenses: [] as IExpense[],
    } as RoleType),
    actions: {
        addExpense(expense: IExpense) {
            this.expenses.push(expense);
        },
        removeExpense(index: number) {
            this.expenses.splice(index, 1);
        },
        updateExpense(index: number, expense: IExpense) {
            this.expenses[index] = expense;
        }
    }
});