<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const isSoloModalOpen = ref(false)
const soloModal = ref(null)
onClickOutside(soloModal, () => isSoloModalOpen.value = false)

const soloModeSelected = ref(1)

</script>

<template>

  <main>

    <div :class="{'blur-sm' : isSoloModalOpen, 'flex flex-col text-black px-6 lg:px-64 mt-10' : true}">

      <section class="flex flex-col">
        <!-- INTRO DESCRIPTION -->
        <div class="flex flex-col mb-10">
          <h2 class="text-3xl font-bold upper mb-2">Mijnlieff</h2>
          <p class="text-base lg:text-lg text-justify">
            This is an unofficial fan-made adaptation of the bagstract game Mijnlieff, designed by <a href="https://www.hopwoodgames.com" class="underline" target="_blank">Andy Hopwood</a>.
          </p>
          <p class="text-base lg:text-lg text-justify">
            The game is played on a 4 x 4 square grid. Each Player has eight pieces with two of four different symbols. Each piece when played determines where your opponent can play their next piece. For example you can force your opponent to play in a straight line (either othogonally or diagonally) from the piece just played, or to play next to or away from the piece just played. The aim is to form lines of 3 pieces of your color to get a point or lines of 4 that worth you two points.
          </p>
        </div>

        <!-- BUTTONS -->
        <div class="flex flex-col justify-center items-center w-fit m-auto gap-y-3 text-xl lg:text-2xl font-bold mb-10">
          <button
            class="betterhover:hover:bg-blue-900/20 duration-300 w-full m-auto px-16 py-2 rounded-md bg-blue-900/10 drop-shadow-sm text-center"
            @click="isSoloModalOpen = true"
          >
            Play
          </button>
          <!-- PLAY MODAL -->
          <Teleport to="#modal">
            <Transition name="modal">
              <div v-if="isSoloModalOpen" class="fixed w-screen h-screen top-0 left-0 bg-black/30 flex justify-center items-center">
                <div ref="soloModal" class="relative bg-gradient-to-b from-blue-50 to-pink-50 px-16 py-10 rounded-md drop-shadow-md">
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
                    :to="`/local-game?ai=true&playerColor=${soloModeSelected === 0 ? 'blue' : soloModeSelected === 1 ? 'rand' : 'pink'}`"
                    class="flex mt-6 py-1 w-full justify-center items-center rounded-md uppercase font-fam text-xl bg-blue-900/10 betterhover:hover:bg-blue-900/20 duration-300 drop-shadow-sm"
                  >
                    play vs AI
                  </router-link>
                  <router-link 
                    :to="`/local-game?ai=false&playerColor=${soloModeSelected === 0 ? 'blue' : soloModeSelected === 1 ? 'rand' : 'pink'}`"
                    class="flex mt-3 px-4 py-1 w-full justify-center items-center rounded-md uppercase font-fam text-xl bg-blue-900/10 betterhover:hover:bg-blue-900/20 duration-300 drop-shadow-sm"
                  >
                    play locally
                  </router-link>

                  <h6 class="uppercase text-sm w-full flex justify-center items-center text-center font-bold font-fam mb-3 mt-3">or</h6>
                  <router-link 
                    :to="`/online-game`"
                    class="flex px-4 py-1 w-full justify-center items-center rounded-md uppercase font-fam text-xl bg-blue-900/10 betterhover:hover:bg-blue-900/20 duration-300 drop-shadow-sm"
                  >
                    play online
                  </router-link>
                </div>
              </div>
            </Transition>
          </Teleport>

          <router-link 
            class="betterhover:hover:bg-blue-900/20 duration-300 w-full m-auto px-16 py-2 rounded-md bg-blue-900/10 drop-shadow-sm text-center"
            :to="'/how-to-play'"
          >
            How to play
          </router-link>
        </div>

        <!-- HOW TO ADD WEBSITE TO HOME SCREEN -->
        <div class="flex flex-col font-sans">
          <p class="text-sm lg:text-base text-justify">
            <span class="font-bold mr-2">N.B.</span>
            <span>For a better experience on smarthphones, I suggest to add this website on your home screen.</span>
          </p>

          <p class="font-bold text-sm mt-1">iPhone:</p>
          <div class="flex flex-col font-sans text-sm lg:text-base text-justify px-2">
            <p>
              <span class="font-bold mr-2">1.</span>
              <span>Launch “Safari” app. This does not work from the “Chrome” app.</span>
            </p>
            <p>
              <span class="font-bold mr-2">2.</span>
              <span>Enter into the address field the URL of the website you want to create a shortcut to. Tap “Go.”</span>
            </p>
            <p>
              <span class="font-bold mr-2">3.</span>
              <span>Tap the icon featuring a right-pointing arrow coming out of a box along the top of the Safari window to open a drop-down menu.</span>
            </p>
            <p>
              <span class="font-bold mr-2">4.</span>
              <span>Tap “Add to Home Screen.” The Add to Home dialog box will appear, with the icon that will be used for this website on the left side of the dialog box.</span>
            </p>
            <p>
              <span class="font-bold mr-2">5.</span>
              <span>Enter the name for the shortcut using the on-screen keyboard and tap “Add.” Safari will close automatically, and you will be taken to where the icon is located on your iPhone desktop.</span>
            </p>
          </div>

          <p class="font-bold text-sm mt-1">Android:</p>
          <div class="flex flex-col font-sans text-sm lg:text-base text-justify px-2">
            <p>
              <span class="font-bold mr-2">1.</span>
              <span>Launch “Chrome” app.</span>
            </p>
            <p>
              <span class="font-bold mr-2">2.</span>
              <span>Open the website or web page you want to pin to your home screen.</span>
            </p>
            <p>
              <span class="font-bold mr-2">3.</span>
              <span>Tap the menu icon (3 dots in upper right-hand corner) and tap Add to home screen.</span>
            </p>
            <p>
              <span class="font-bold mr-2">4.</span>
              <span>You’ll be able to enter a name for the shortcut and then Chrome will add it to your home screen.</span>
            </p>

          </div>
        </div>
      </section>

    </div>

  </main>

  <footer class="fles text-center font-sans mt-12 pb-6">
    © 2022 Alessio Poggi
  </footer>

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
