<script setup>
const emit = defineEmits(['select-tile'])
const props = defineProps({
  position: Number,
  played: Boolean,
  selected: Boolean,
  type: String,
  color: String,
})

const selectTile = () => {
  if(props.played) return

  emit('select-tile', {
    position: props.position,
    played: true,
    type: props.type,
    color: props.color,
  })
}
</script>

<template>

  <div
    @click="selectTile"
    :class="`${props.selected ? props.color === 'blue' ? 'bg-blue-200' : 'bg-pink-200' :
              props.played ? props.color === 'blue' ? 'bg-blue-50' : 'bg-pink-50' : 
              props.color === 'blue' ? 'bg-blue-100 betterhover:hover:bg-blue-200' : 'bg-pink-100 betterhover:hover:bg-pink-200'}
              ${props.color === 'blue' ? 'text-blue-500' : 'text-pink-500'} 
              rounded-xl w-[3.5rem] h-[3.5rem] lg:w-[4.5rem] lg:h-[4.5rem] flex items-center justify-center material-icons drop-shadow
              ${played ? 'cursor-default' : 'cursor-pointer'}
              ${props.type === 'puller' ? 'text-3xl font-black' : 'text-5xl font-thin'}`">
    {{ props.played ? '' : props.type === 'puller' ? 'adjust' : props.type === 'pusher' ? 'stop_circle' : props.type === 'diagonal' ? 'close' : 'add'}}
  </div>

</template>

<!--
stop_circle
filter_tilt_shift
-->
