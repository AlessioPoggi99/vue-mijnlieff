<script setup>
const emit = defineEmits(['select-board-tile'])
const props = defineProps({
  position: Number,
  empty: Boolean,
  lastPlayed: Boolean,
  playable: Boolean,
  type: String,
  color: String,
  turn: Number,
})

const selectBoardTile = () => {
  emit('select-board-tile', {
    position: props.position,
    empty: props.empty,
    playable: props.playable,
  })
}
</script>

<template>

  <div 
    @click="selectBoardTile"
    :class="`relative border-[0.5px] border-black w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center
      ${props.lastPlayed ? 'bg-gray-300/70' : ''}
      ${props.empty ? props.playable ? 'cursor-pointer betterhover:hover:bg-gray-200' : 'cursor-default' : ''}`"
  >
    <div :class="`absolute flex text-[0.5rem] w-full h-full justify-center items-center material-icons ${/*text-gray-400/80*/(props.turn % 2) == 0 ? 'text-blue-400/80' : 'text-pink-400/80'}`">
      {{ props.playable ? 'circle' : ''}}
    </div>
    <div 
      :class="`${props.color === 'blue' ? 'bg-blue-200' : props.color === 'pink' ? 'bg-pink-200' : ''} ${props.empty ? '' : 'cursor-default'}
                ${props.color === 'blue' ? 'text-blue-500' : props.color === 'pink' ? 'text-pink-500' : ''} rounded-xl w-[3.5rem] h-[3.5rem] lg:w-[4.5rem] lg:h-[4.5rem]
                drop-shadow-sm flex items-center justify-center material-icons ${props.type === 'puller' ? 'text-3xl font-black' : 'text-5xl font-thin'}`"
    >
      {{ props.type === 'puller' ? 'adjust' : props.type === 'pusher' ? 'stop_circle' : props.type === 'diagonal' ? 'close' : props.type === 'straight' ? 'add' : ''}}
    </div>
  </div>

</template>

<style>
</style>
