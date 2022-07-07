<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const isSoloModalOpen = ref(false)
const soloModal = ref(null)
onClickOutside(soloModal, () => isSoloModalOpen.value = false)

const soloModeSelected = ref(0)

</script>

<template>

  <main>

    <div class="flex flex-col justify-center items-center w-fit m-auto gap-y-3 z-50 text-xl lg:text-2xl font-bold pt-10">

       <button
        class="betterhover:hover:bg-gray-400 duration-300 w-full m-auto px-6 py-2 rounded-md bg-gray-300 drop-shadow-sm"
        @click="isSoloModalOpen = true"
      >
        Play vs AI
      </button>
      <Teleport to="#modal">
        <Transition name="modal">
          <div v-if="isSoloModalOpen" class="fixed w-screen h-screen top-0 left-0 bg-black/30 flex justify-center items-center">
            <div ref="soloModal" class="relative bg-white px-20 py-10 rounded-md drop-shadow-md">
              <h6 class="uppercase text-base w-full flex justify-center items-center text-center font-bold font-fam mb-2">i play as</h6>
              <div class="flex items-center justify-center gap-x-4">
                <div
                  @click="soloModeSelected = 0"
                  :class="`w-10 h-10 rounded-md flex items-center justify-center material-icons text-black
                  ${soloModeSelected === 0 ? 'bg-blue-300 border border-black' : 'bg-blue-500'}`"
                >
                  {{ soloModeSelected === 0 ? 'done_outline' : ''}}
                </div>
                <div
                  @click="soloModeSelected = 1"
                  :class="`w-10 h-10 rounded-md flex items-center justify-center material-icons text-black
                  ${soloModeSelected === 1 ? 'both-color-bg-light border border-black' : 'both-color-bg-dark'}`"
                >
                  {{ soloModeSelected === 1 ? 'done_outline' : ''}}
                </div>
                <div
                  @click="soloModeSelected = 2"
                  :class="`w-10 h-10 rounded-md flex items-center justify-center material-icons text-black
                  ${soloModeSelected === 2 ? 'bg-pink-300 border border-black' : 'bg-pink-500'}`"
                >
                  {{ soloModeSelected === 2 ? 'done_outline' : ''}}
                </div>
              </div>
              <button 
                @click="isSoloModalOpen = false" 
                class="absolute top-1 right-2 bg-none border-none cursor-pointer material-icons text-base"
              >
                close
              </button>

              <router-link 
                :to="`/localgame?ai=true&playerColor=${soloModeSelected === 0 ? 'blue' : soloModeSelected === 1 ? 'rand' : 'pink'}`"
                class="flex mt-7 py-1 w-full justify-center items-center rounded-md uppercase font-fam text-2xl bg-gray-300 betterhover:hover:bg-gray-400 duration-300 drop-shadow-sm"
              >
                play
              </router-link>
            </div>
          </div>
        </Transition>
      </Teleport>

      <router-link 
        class="betterhover:hover:bg-gray-400 duration-300 w-full m-auto px-6 py-2 rounded-md bg-gray-300 drop-shadow-sm"
        :to="'/localgame?ai=false&playerColor=null'"
      >
        Local multiplayer
      </router-link>
      <!--
      <router-link 
        class="betterhover:hover:bg-gray-400 duration-300 w-full m-auto px-6 py-2 rounded-md bg-gray-300"
        :to="'/localgame?ai=true&playerColor=blue'"
      >
        Play vs AI (blue)
      </router-link>
      <router-link 
        class="betterhover:hover:bg-gray-400 duration-300 w-full m-auto px-6 py-2 rounded-md bg-gray-300"
        :to="'/localgame?ai=true&playerColor=pink'"
      >
        Play vs AI (pink)
      </router-link>
      -->
    </div>

  </main>

</template>


<style>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
.both-color-bg-dark {
  background: linear-gradient(to left, #ec4899 50%, #3b82f6 50%);
}
.both-color-bg-light {
  background: linear-gradient(to left, #f9a8d4 50%, #93c5fd 50%);
}
.font-fam {
  font-family: Bradley Hand, Helvetica, Arial, sans-serif;
}
</style>
