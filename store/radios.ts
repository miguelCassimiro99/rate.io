import { defineStore } from "pinia";
import type { RadioType } from "~/types/radio";

export type ReactionType = "like" | "angry" | "sad" | "wow";

export type RadioReaction = {
  radioId: string;
  reactions: {
    [key in ReactionType]: number;
  };
  userReaction: ReactionType | null;
};

export const useRadioStore = defineStore("radio", {
  state: () => ({
    radios: [] as RadioType[],
    todaySessions: [] as string[],
  }),

  actions: {
    setRadios(radios: RadioType[]) {
      this.radios = radios;
    },
    addRadio(newRadio: RadioType) {
      this.radios.unshift(newRadio);
    },
  },
});
