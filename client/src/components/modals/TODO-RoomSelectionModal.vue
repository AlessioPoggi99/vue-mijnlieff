<script setup>
import { ref } from 'vue';

const emit = defineEmits(['set-room-code-error', 'set-is-room-full', 'call-join-room'])
const props = defineProps({
  isRoomModalOpen: Boolean,
  roomCodeError: Boolean,
  isRoomFull: Boolean,
  roomCode: String,
})

const roomCode = ref(props.roomCode)

</script>

<template>

  <!-- MODAL -->
  <Teleport to="#modal">
    <Transition name="modal">
      <div v-if="props.isRoomModalOpen" class="fixed w-screen h-screen top-0 left-0 bg-black/30 flex justify-center items-center font-fam">
        <div ref="soloModal" class="relative bg-gradient-to-b from-blue-50 to-pink-50 px-12 py-10 rounded-md drop-shadow-md">

          <h6 class="uppercase text-base w-full flex justify-center items-center text-center font-bold mb-2">create or join a game</h6>
          <input
            @input="() => { emit('set-room-code-error', false); emit('set-is-room-full', false) }"
            v-model.trim="roomCode"
            placeholder="room code: 1234"
            :class="`flex py-1 w-full justify-center items-center rounded-md uppercase bg-white border border-blue-900/20 betterhover:hover:border-blue-900/50
              focus:border-blue-900/50 outline-none duration-300 drop-shadow-sm text-center text-base ${props.roomCodeError ? 'border-red-500/80' : ''}`"
          />
          <p v-if="props.roomCodeError" class="text-sm text-red-500/80 flex-wrap text-center mt-1">minimum 4 characters</p>
          <p v-if="props.isRoomFull" class="text-sm text-red-500/80 flex-wrap text-center mt-1">this room is full</p>

          <button 
            @click="emit('call-join-room', roomCode)"
            class="flex mt-3 py-1 w-full justify-center items-center rounded-md uppercase text-xl bg-blue-900/10 betterhover:hover:bg-blue-900/20 duration-300 drop-shadow-sm"
          >
            Join game
          </button>
          <router-link 
            :to="`/`"
            class="flex mt-6 py-1 w-full justify-center items-center rounded-md uppercase text-xl bg-blue-900/10 betterhover:hover:bg-blue-900/20 duration-300 drop-shadow-sm"
          >
            Back home
          </router-link>

        </div>
      </div>
    </Transition>
  </Teleport>

</template>

<style>
</style>