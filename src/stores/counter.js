import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    counter: 1,
  }),
  getters: {
    doubleCounter: (state) => state.counter * 2,
    doubleCounterPlusOne() {
      return this.doubleCounter + 1;
    },
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
