<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { tilesRotation, whiteFlag } from '../store/store.js'

const route = useRoute();
const showRotateButton = ref(false)
const showWhiteFlag = ref(false)

watchEffect(() => {
  if( (route.path).includes('game') )
    showRotateButton.value = true
  else
    showRotateButton.value = false

  if( (route.path).includes('online') )
    showWhiteFlag.value = true
  else
    showWhiteFlag.value = false
})

</script>

<template>
  <header>
    <nav class="flex relative w-full h-14 bg-blue-900/10 justify-center items-center text-center px-6">

      <button 
        v-if="showWhiteFlag" :class="{'absolute left-4 material-icons duration-300': true}"
        @click="whiteFlag.setHasBeenClicked(true)"
      >
        flag
      </button>

      <h1 v-if="showWhiteFlag" class="text-2xl font-bold">MIJNLIEFF</h1>
      <router-link v-else :to="'/'" class="text-2xl font-bold">MIJNLIEFF</router-link>

      <button 
        v-if="showRotateButton" :class="{'rotate-[-180deg]': tilesRotation.areRotate, 'absolute right-4 material-icons duration-300': true}"
        @click="tilesRotation.setAreRotate(!tilesRotation.areRotate)"
      >
        flip_camera_android
      </button>
      
    </nav>
  </header>
</template>