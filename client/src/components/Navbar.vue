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
  <header>
    <nav class="flex relative w-full h-14 bg-blue-900/10 justify-center items-center text-center px-6">
      <router-link :to="'/'" class="text-2xl font-bold">MIJNLIEFF</router-link>

      <button 
        v-if="showRotateButton" :class="{'rotate-[-180deg]': tilesRotation.areRotate, 'absolute right-4 material-icons duration-300': true}"
        @click="tilesRotation.setAreRotate(!tilesRotation.areRotate)"
      >
        flip_camera_android
      </button>
      
    </nav>
  </header>
</template>