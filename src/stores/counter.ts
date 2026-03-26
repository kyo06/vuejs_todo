import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  
  //States
  const count = ref(0)
  
  //Getters
  const doubleCount = computed(() => count.value * 2)
  
  //Actions
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})



export const useCounter2Store = defineStore('counter2', {
  //State
  state: () => ({
    count: 0
  }),

  //Getters
  getters: {
    doubleCount: (state) => state.count * 2
  },

  //Actions
  actions: {
    increment() {
      this.count++;
    }
  }
})
