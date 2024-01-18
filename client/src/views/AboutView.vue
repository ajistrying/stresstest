<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <button @click="doSomething" class="border border-white">Button</button>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>
export default {
  methods: {
    doSomething() {
      console.log('Hello')
    }
  }
}
</script>
