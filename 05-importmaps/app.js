import { createApp } from 'vue'

const Counter = {
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
    <p>Counter: {{ count }}</p>
    <button @click="increment">Increment</button>
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
}

createApp(Counter).mount('#app')
