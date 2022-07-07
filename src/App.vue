<script setup>
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div class="">
    <Navbar />
    <router-view />
  </div>
</template>


<style>
#app {
  font-family: Bradley Hand, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: rgb(243 244 246);
  min-height: 100vh;
}
</style>
