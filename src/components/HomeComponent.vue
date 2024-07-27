<template>
  <div class="home">
    <h1>Welcome to the Typing Website</h1>
    <router-link to="/typing">Start Typing Test</router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeComponent'
}
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}
</style>