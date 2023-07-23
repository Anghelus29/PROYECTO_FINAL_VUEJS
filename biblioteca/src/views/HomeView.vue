<template>
    <div class="home">  <Home/></div>
  
  </template>
  <style>
  .home{
    text-align: center;
  }
</style>

<script>
// @ is an alias to /src
import Home from '@/components/Home.vue'

export default {
  name: 'HomeView',
  components: {
    Home
  }
}
</script>
