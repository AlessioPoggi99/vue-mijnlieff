<script setup>
import Navbar from './components/Navbar.vue';

var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", "https://vue-mijnlieff-server.herokuapp.com", true ); // false for synchronous request
</script>

<template>
  <div class="">
    <Navbar/>
    <router-view />
  </div>
</template>


<style>
#app {
  font-family: Bradley Hand, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*background-color: rgb(243 244 246);*/
  background: linear-gradient(#eff6ff, #fdf2f8);
  min-height: 100vh;
}
</style>
