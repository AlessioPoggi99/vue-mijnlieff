<script setup>

const emit = defineEmits(['play-again', 'new-room', 'back-home'])
const props = defineProps({
  isGameOverModalOpen: Boolean,
  playerColor: String,
  points: Array,
  hasOpponentSurrendered: Boolean,
  waitingOpponent: Boolean,
  haveSurrendered: Boolean,
})

</script>

<template>

  <Teleport to="#modal">
    <Transition name="modal">
      <div v-if="props.isGameOverModalOpen" class="fixed w-screen h-screen top-0 left-0 bg-black/30 flex justify-center items-center font-fam">
        <div ref="soloModal" class="relative bg-gradient-to-b from-blue-50 to-pink-50 px-12 py-10 rounded-md drop-shadow-md">

          <div v-if="!waitingOpponent">
            <div :class="`flex ${playerColor === 'blue' ? 'flex-row' : 'flex-row-reverse'} w-full text-center justify-center items-center gap-x-4`">
              <h3 class="font-sans font-extrabold bg-blue-200 text-blue-900 rounded-md px-2 drop-shadow-sm shadow-blue-600/50">{{ props.points[0] }}</h3>
              <h3 :class="`uppercase font-black ${ props.points[0] === props.points[1] ? 'text-black' :  props.points[0] > props.points[1] ? 'text-blue-600' : 'text-pink-600'}`">
                {{ props.points[0] === props.points[1] ? 'draw' :  props.points[0] > props.points[1] ? 'blue wins' : 'pink wins'}}
              </h3>
              <h3 class="font-sans font-extrabold bg-pink-200 text-pink-900 rounded-md px-2 drop-shadow-sm shadow-pink-600/50">{{ props.points[1] }}</h3>
            </div>

            <h6 v-if="props.hasOpponentSurrendered || props.haveSurrendered" class="uppercase text-xs mt-2 w-full flex justify-center items-center text-center font-bold font-fam">by resignation</h6>
          </div>

          <button
            @click="emit('play-again')"
            :class="`flex ${!waitingOpponent ? 'mt-6' : 'mt-0'} py-1 w-full justify-center items-center rounded-md uppercase text-xl bg-blue-900/10 betterhover:hover:bg-blue-900/20 duration-300 drop-shadow-sm`"
          >
            Play again
          </button>
          <button
            @click="emit('new-room')"
            class="flex mt-3 py-1 w-full justify-center items-center rounded-md uppercase text-xl bg-blue-900/10 betterhover:hover:bg-blue-900/20 duration-300 drop-shadow-sm"
          >
            New room
          </button>
          <router-link 
            :to="`/`"
            @click="emit('back-home')"
            class="flex mt-6 px-8 py-1 w-full justify-center items-center rounded-md uppercase text-xl bg-blue-900/10 betterhover:hover:bg-blue-900/20 duration-300 drop-shadow-sm"
          >
            Back to home
          </router-link>

        </div>
      </div>
    </Transition>
  </Teleport>

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
</style>