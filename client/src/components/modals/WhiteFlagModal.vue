<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core'

const outsideModalRef = ref(null)
onClickOutside(outsideModalRef, () => emit('close-modal'))

const emit = defineEmits(['close-modal', 'surrender'])
const props = defineProps({
  isWhiteFlagModalOpen: Boolean,
})

</script>

<template>

  <Teleport to="#modal">
    <Transition name="modal">
      <div v-if="props.isWhiteFlagModalOpen" class="fixed w-screen h-screen top-0 left-0 bg-black/30 flex justify-center items-center font-fam">
        <div ref="outsideModalRef" class="relative bg-gradient-to-b from-blue-50 to-pink-50 px-12 py-10 rounded-md drop-shadow-md">

          <h6 class="uppercase text-base w-full flex justify-center items-center text-center font-bold font-fam">Do you want to leave</h6>
          <h6 class="uppercase text-base w-full flex justify-center items-center text-center font-bold font-fam mb-2">the game?</h6>

          <button
            @click="emit('surrender')"
            class="flex mt-6 px-8 py-1 w-full justify-center items-center rounded-md uppercase text-xl bg-blue-900/10 betterhover:hover:bg-blue-900/20 duration-300 drop-shadow-sm"
          >
            Leave game
          </button>

          <button 
            @click="emit('close-modal')" 
            class="absolute top-1 right-2 bg-none border-none cursor-pointer material-icons text-base"
          >
            close
          </button>

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