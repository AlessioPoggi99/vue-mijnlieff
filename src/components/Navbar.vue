<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { tilesRotation } from '../store/store.js'

const route = useRoute();
const showRotateButton = ref(false)

watchEffect(() => {
  if( (route.path).includes('game') )
    showRotateButton.value = true
  else
    showRotateButton.value = false
})

</script>

<template>
  <nav class="flex w-full h-14 bg-gray-200 justify-between items-center mb-10 lg:mb-20 px-4">
    <button class="material-icons">menu</button>
    <router-link :to="'/'" class="text-2xl font-bold">MIJNLIEFF</router-link>
    <button v-if="showRotateButton" :class="{'rotate-[-180deg]': tilesRotation.areRotate, 'material-icons duration-300': true}" @click="tilesRotation.setAreRotate(!tilesRotation.areRotate)">flip_camera_android</button>
    <div v-else class="w-6 h-6"></div>
  </nav>
</template>