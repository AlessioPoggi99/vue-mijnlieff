<script setup>
import { ref, watchEffect } from 'vue'
import Tile from '../components/Tile.vue';
import Board from '../components/Board.vue';
import { tilesRotation } from '../store/store.js'
import io from "socket.io-client";

/*** FOR TESTING ***/
const isOnlineGame = true


/*** HANDLE CONNECTIONS ***/
const socket = io.connect("https://vue-mijnlieff-server.herokuapp.com")
const isRoomModalOpen = ref(true)
const roomCode = ref("")
const roomCodeError = ref(false)
const isRoomFull = ref(false)
const playerIndex = ref(3)  // 1 = player1, 2 = player2, (>= 3) = room's full
const waitingOpponent = ref(true)
const waitingString = ref("Waiting opponent")

const joinRoom = () => {
  roomCode.value = roomCode.value.toUpperCase()
  if(roomCode.value.length >= 4)
    socket.emit("joinRoom", roomCode.value)
  else
    roomCodeError.value = true
}
socket.on("playerIndex", (_playerIndex) => {
  playerIndex.value = _playerIndex
  if(playerIndex.value > 2)
    isRoomFull.value = true
  else
    isRoomModalOpen.value = false
});
socket.on("startGame", (firstPlayer) => {
  waitingOpponent.value = false
  if(playerIndex.value === firstPlayer)
    playerColor.value = 'blue'
  else
    playerColor.value = 'pink'
});
socket.on("move", (args) => {
  userSelection.value = args.userSelection
  selectBoardTile(args.payload)
})
/*** ### ### ### ***/

const BOARD_DIM = 4
const playerColor = ref('blue')
const board = ref([])
const blueTiles = ref([])
const pinkTiles = ref([])
const userSelection = ref(null)
const turn = ref(0)
const canMove = ref(true)
const points = ref([0,0])
const gameOver = ref(false)


/*
### BOARD SETUP ###
*/
const setupBoard = () => {
  board.value = []
  for(let i = 0; i < BOARD_DIM*BOARD_DIM; i++) {
    board.value.push({
      position: i,
      empty: true,
      lastPlayed: false,
      playable: false,
      type: '',
      color: '',
    })
  }
}

/*
### GAME BOARD LOGIC ###
*/
const clearLastPlayedBoardTile = () => {
  board.value.forEach(tile => {
    tile.lastPlayed = false
  })
}
// Handle board tile's click -> Player's going to play
const selectBoardTile = (payload) => {
  if(payload.empty && payload.playable && userSelection.value != null) {
    clearLastPlayedBoardTile()
    board.value[payload.position].type = userSelection.value.type
    board.value[payload.position].color = userSelection.value.color
    board.value[payload.position].empty = false
    board.value[payload.position].lastPlayed = true

    if(turn.value % 2 === 0) {
      blueTiles.value[userSelection.value.position].played = true
    }
    else {
      pinkTiles.value[userSelection.value.position].played = true
    }

    // Emit mmove to online opponent
    if(isOnlineGame && userSelection.value.color === playerColor.value) 
      socket.emit("play", { 
        roomCode: roomCode.value,
        payload: payload,
        userSelection: userSelection.value,
      })
    
    checkGameOver()
    turn.value += 1
    setBoardTilesPlayable(payload)
    checkCanMove()
    clearSelection()
  }
}

// Check game over (when opponent has finished his tiles you have last move if you can play otherwise instant game over)
const checkGameOver = () => {
  if(turn.value % 2 === 0) {
    let finished = true
    pinkTiles.value.forEach(tile => {
      if(tile.played === false)
        finished = false
    })
    if(finished) gameOver.value = true
  } else {
    let finished = true
    blueTiles.value.forEach(tile => {
      if(tile.played === false)
        finished = false
    })
    if(finished) gameOver.value = true
  }
}

// Set all the board tiles playable or not
const setAllBoardTilesPlayable = (bool) => {
  board.value.forEach(tile => tile.playable = bool)
}
// Set the initial playable board tiles
const setInitialBoardTilePlayable = () => {
  board.value.forEach((tile, i) => {
    if(i === 5 || i === 6 || i === 9 || i === 10) return
    tile.playable = true
  })
}
// Called by 'selectBoardTile' set next move playable board tiles
const setBoardTilesPlayable = (payload) => {
  const type = userSelection.value.type
  const position = payload.position
  const column = position % BOARD_DIM
  const row = Math.floor(position / BOARD_DIM)

  if(type === 'straight') {
    setAllBoardTilesPlayable(false)
    for (let i = 1; i < BOARD_DIM; i++) {
      let pos = position + (i * BOARD_DIM)
      try { board.value[pos].playable = true } catch (error) {}
      pos = position - (i * BOARD_DIM)
      try { board.value[pos].playable = true } catch (error) {}
      pos = position + i
      try { if(pos % BOARD_DIM !== column && Math.floor(pos / BOARD_DIM) === row) board.value[pos].playable = true } catch (error) {}
      pos = position - i
      try { if(pos % BOARD_DIM !== column && Math.floor(pos / BOARD_DIM) === row) board.value[pos].playable = true } catch (error) {}
    }
  } else if(type === 'diagonal') {
    setAllBoardTilesPlayable(false)
    for (let i = 1; i < BOARD_DIM; i++) {
      let pos = position - (BOARD_DIM*i) - i
      try { if(pos % BOARD_DIM === column-i && Math.floor(pos / BOARD_DIM) === row-i) board.value[pos].playable = true } catch (error) {}
      pos = position - (BOARD_DIM*i) + i
      try { if(pos % BOARD_DIM === column+i && Math.floor(pos / BOARD_DIM) === row-i) board.value[pos].playable = true } catch (error) {}
      pos = position + (BOARD_DIM*i) + i
      try { if(pos % BOARD_DIM === column+i && Math.floor(pos / BOARD_DIM) === row+i) board.value[pos].playable = true } catch (error) {}
      pos = position + (BOARD_DIM*i) - i
      try { if(pos % BOARD_DIM === column-i && Math.floor(pos / BOARD_DIM) === row+i) board.value[pos].playable = true } catch (error) {}
    }
  } else if(type === 'puller' || type === 'pusher') {
    const bool =  type === 'puller' ? true : false
    setAllBoardTilesPlayable(!bool)
    let pos = position + (1 * BOARD_DIM)
    try { board.value[pos].playable = bool } catch (error) {}
    pos = position - (1 * BOARD_DIM)
    try { board.value[pos].playable = bool } catch (error) {}
    pos = position + 1
    try { if(pos % BOARD_DIM !== column && Math.floor(pos / BOARD_DIM) === row) board.value[pos].playable = bool } catch (error) {}
    pos = position - 1
    try { if(pos % BOARD_DIM !== column && Math.floor(pos / BOARD_DIM) === row) board.value[pos].playable = bool } catch (error) {}

    pos = position - BOARD_DIM - 1
    try { if(pos % BOARD_DIM === column-1 && Math.floor(pos / BOARD_DIM) === row-1) board.value[pos].playable = bool } catch (error) {}
    pos = position - BOARD_DIM + 1
    try { if(pos % BOARD_DIM === column+1 && Math.floor(pos / BOARD_DIM) === row-1) board.value[pos].playable = bool } catch (error) {}
    pos = position + BOARD_DIM + 1
    try { if(pos % BOARD_DIM === column+1 && Math.floor(pos / BOARD_DIM) === row+1) board.value[pos].playable = bool } catch (error) {}
    pos = position + BOARD_DIM - 1
    try { if(pos % BOARD_DIM === column-1 && Math.floor(pos / BOARD_DIM) === row+1) board.value[pos].playable = bool } catch (error) {}
  }
}

// Check if current player can make a move otherwise increment turn
const checkCanMove = () => {
  canMove.value = false
  board.value.forEach(tile => {
    if(tile.playable && tile.empty)
      canMove.value = true
  })
  if(!canMove.value) {
    checkGameOver()
    turn.value+=1
    setAllBoardTilesPlayable(true)
  }
}


/*
### WINNER LOGIC ###
*/
const calculateWinner = () => {
  const QUADRIS = [ 
    [ [0,1,2,3], [4,5,6,7], [8,9,10,11], [12,13,14,15] ],
    [ [0,4,8,12], [1,5,9,13], [2,6,10,14], [3,7,11,15] ],
    [ [0,5,10,15], [3,6,9,12] ],
  ]
  const TRIS = [
    [ [0,1,2], [1,2,3], [4,5,6], [5,6,7], [8,9,10], [9,10,11], [12,13,14], [13,14,15] ],
    [ [0,4,8], [4,8,12], [1,5,9], [5,9,13], [2,6,10], [6,10,14], [3,7,11], [7,11,15] ],
    [ [0,5,10], [5,10,15], [3,6,9], [6,9,12] ],
  ]
  const TRIS_SECONDARY_DIAG = [ [4,9,14], [1,6,11], [2,5,8], [7,10,13] ]

  let skip = [ [0,0,0,0], [0,0,0,0], [0,0] ] // [0][index] = rows | [1][index] = cols | [2][index] = diags

  QUADRIS.forEach((qArr, index) => {
    qArr.forEach((internalArr, internalIndex) => {
      const color1 = board.value[internalArr[0]].color
      const color2 = board.value[internalArr[1]].color
      const color3 = board.value[internalArr[2]].color
      const color4 = board.value[internalArr[3]].color
      if(color1 === color2 && color1 === color3 && color1 === color4 && color1 !== '') {
        skip[index][internalIndex] = 1
        if(color1 === 'blue')
          points.value[0] += 2
        else
          points.value[1] += 2
      }
    })
  })
  TRIS.forEach((tArr, index) => {
    tArr.forEach((internalArr, internalIndex) => {
      const color1 = board.value[internalArr[0]].color
      const color2 = board.value[internalArr[1]].color
      const color3 = board.value[internalArr[2]].color
      if(color1 === color2 && color1 === color3 && skip[index][Math.floor(internalIndex/2)] === 0 && color1 !== '') {
        if(color1 === 'blue')
          points.value[0] += 1
        else
          points.value[1] += 1
      }
    })
  })
  TRIS_SECONDARY_DIAG.forEach(tsArr => {
    const color1 = board.value[tsArr[0]].color
    const color2 = board.value[tsArr[1]].color
    const color3 = board.value[tsArr[2]].color
    if(color1 === color2 && color1 === color3 && color1 !== '') {
      if(color1 === 'blue')
        points.value[0] += 1
      else
        points.value[1] += 1
    }
  })
}


/*
### PLAYER SETUP ###
*/
const setupPlayer = () => {
  blueTiles.value = []
  pinkTiles.value = []
  for(let i = 0; i < BOARD_DIM*BOARD_DIM/2; i++) {
    blueTiles.value.push({
      position: i,
      played: false,
      selected: false,
      type: i < BOARD_DIM*BOARD_DIM/8 ? 'pusher' : i < BOARD_DIM*BOARD_DIM/4 ? 'puller' : i < BOARD_DIM*BOARD_DIM/(16/6) ? 'straight' : 'diagonal',
      color: 'blue',
    })
    pinkTiles.value.push({
      position: i,
      played: false,
      selected: false,
      type: i < BOARD_DIM*BOARD_DIM/8 ? 'pusher' : i < BOARD_DIM*BOARD_DIM/4 ? 'puller' : i < BOARD_DIM*BOARD_DIM/(16/6) ? 'straight' : 'diagonal',
      color: 'pink',
    })
  }
}

/*
### GAME PLAYERS' TILES SELECTION LOGIC ###
*/
const clearSelection = () => {
  blueTiles.value.forEach((tile, i) => tile.selected = false)
  pinkTiles.value.forEach((tile, i) => tile.selected = false)
  userSelection.value = null
}
// Allow current turn user to select only one own tile piece
const selectTile = (payload) => {
  // When online game don't let select opponent's tiles
  if( (isOnlineGame && waitingOpponent.value) || (isOnlineGame && payload.color !== playerColor.value) )
    return
  if(payload.color === 'blue' && turn.value % 2 === 0) {
    if(blueTiles.value[payload.position].selected) {
      clearSelection()
    } else {
      clearSelection()
      blueTiles.value[payload.position].selected = true
      userSelection.value = payload
    }
  } else if(payload.color === 'pink' && turn.value % 2 !== 0){
    if(pinkTiles.value[payload.position].selected) {
      clearSelection()
    } else {
      clearSelection()
      pinkTiles.value[payload.position].selected = true
      userSelection.value = payload
    }
  }
}

/*
### GAME OVER LOGIC ###
*/
watchEffect(() => {
  if(gameOver.value) {
    setAllBoardTilesPlayable(false)
    calculateWinner()
  }
})


/*
### RESET CONFIG & INITIALIZE GAME ###
*/
const resetGame = () => {
  if(!isOnlineGame)
    playerColor.value = props.playerColor === null ? null : props.playerColor === 'blue' ? 'blue' : props.playerColor === 'pink' ? 'pink' : Math.round(Math.random()) === 0 ? 'blue' : 'pink'
  userSelection.value = null
  turn.value = 0
  canMove.value = true
  points.value = [0,0]
  gameOver.value = false
  setupBoard()
  setupPlayer()
  setInitialBoardTilePlayable()
}
resetGame()
</script>


<template>

  <main>

    <div 
      :class="`flex ${playerColor === 'blue' ?
        tilesRotation.areRotate ? 'flex-col lg:flex-row-reverse' : 'flex-col-reverse lg:flex-row' :
        tilesRotation.areRotate ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row-reverse'}
        gap-y-5 lg:gap-x-20 w-full items-center justify-center ${''/*lg:min-h-[80vh] pb-10*/} min-h-[calc(100vh-3.5rem)] py-10
        ${isRoomModalOpen ? 'blur-sm' : ''}`"
    >

      <!-- MODAL -->
      <Teleport to="#modal">
        <Transition name="modal">
          <div v-if="isRoomModalOpen" class="fixed w-screen h-screen top-0 left-0 bg-black/30 flex justify-center items-center font-fam">
            <div ref="soloModal" class="relative bg-gradient-to-b from-blue-50 to-pink-50 px-12 py-10 rounded-md drop-shadow-md">

              <h6 class="uppercase text-base w-full flex justify-center items-center text-center font-bold mb-2">create or join a game</h6>
              <input
                @input="() => { roomCodeError = false; isRoomFull = false }"
                v-model.trim="roomCode"
                placeholder="room code: 1234"
                :class="`flex py-1 w-full justify-center items-center rounded-md uppercase bg-white border border-blue-900/20 betterhover:hover:border-blue-900/50
                  focus:border-blue-900/50 outline-none duration-300 drop-shadow-sm text-center text-base ${roomCodeError ? 'border-red-500/80' : ''}`"
              />
              <p v-if="roomCodeError" class="text-sm text-red-500/80 flex-wrap text-center mt-1">minimum 4 characters</p>
              <p v-if="isRoomFull" class="text-sm text-red-500/80 flex-wrap text-center mt-1">this room is full</p>

              <button 
                @click="joinRoom"
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
      

      <!-- BLUE TILES -->
      <div class="grid grid-cols-4 grid-rows-2 grid-flow-col lg:grid-cols-2 lg:grid-rows-4 lg:grid-flow-row gap-1">
        <Tile v-for="(tile, index) in blueTiles" 
          :key="`blue-tile-${index}`"
          :position="tile.position"
          :played="tile.played"
          :selected="tile.selected"
          :type="tile.type"
          :color="tile.color"
          @select-tile="selectTile"
        />
      </div>
      
      <div class="flex flex-col justify-center items-center">
        <!-- Turn -->
        <div class="flex flex-col w-full font-bold text-xl lg:text-2xl justify-center text-center items-center mb-2 lg:gap-y-1">
          <div v-if="gameOver" :class="`flex ${playerColor === 'blue' ? 'flex-row' : 'flex-row-reverse'} w-full text-center justify-center items-center gap-x-4`">
            <h3 class="font-sans font-extrabold bg-blue-200 text-blue-900 rounded-md px-2 drop-shadow-sm shadow-blue-600/50">{{ points[0] }}</h3>
            <h3 :class="`uppercase font-black ${ points[0] === points[1] ? 'text-black' :  points[0] > points[1] ? 'text-blue-600' : 'text-pink-600'}`">
              {{ points[0] === points[1] ? 'draw' :  points[0] > points[1] ? 'blue wins' : 'pink wins'}}
            </h3>
            <h3 class="font-sans font-extrabold bg-pink-200 text-pink-900 rounded-md px-2 drop-shadow-sm shadow-pink-600/50">{{ points[1] }}</h3>
          </div>
          <h3 v-else :class="`${turn % 2 === 0 ? 'text-blue-500' : 'text-pink-500'}`">{{ turn % 2 === 0 ? 'Blue' : 'Pink'}}'s turn</h3>
          <h6 v-if="!canMove && !gameOver" :class="`text-xs lg:text-sm font uppercase ${turn % 2 === 0 ? 'text-pink-500' : 'text-blue-500'}`">
            {{ turn % 2 === 0 ? 'Pink ' : 'Blue '}}<span class="text-black">can't move</span>
          </h6>
          <h6 v-else :class="`text-xs lg:text-sm font uppercase text-black ${gameOver ? 'opacity-0' : 'opacity-100'}`">
            {{ waitingOpponent ? waitingString : isOnlineGame ? ((turn % 2 === 0 && playerColor === 'blue') || (turn % 2 !== 0 && playerColor === 'pink')) ? 'Make a move' : "Opponent's turn" : 'Make a move' }}
          </h6>
        </div>
        <!-- BOARD -->
        <div class="grid grid-cols-4 grid-rows-4 w-fit items-center border-[0.5px] border-black">
          <Board v-for="(boardTile, index) in board"
            :key="`blue-tile-${index}`"
            :position="boardTile.position"
            :empty="boardTile.empty"
            :last-played="boardTile.lastPlayed"
            :playable="boardTile.playable"
            :type="boardTile.type"
            :color="boardTile.color"
            :turn="turn"
            @select-board-tile="selectBoardTile"
          />
        </div>
        <!-- Reset button -->
        <div class="flex w-full justify-center text-center items-center mt-2 lg:pt-7">
          <button
            @click="resetGame"
            class="px-2 lg:px-3 lg:py-1 bg-gray-300 font-extrabold uppercase text-sm text-black rounded drop-shadow-sm betterhover:hover:bg-gray-400 duration-300"
          >
            Reset game
          </button>
        </div>
      </div>

      <!-- PINK TILES -->
      <div class="grid grid-cols-4 grid-rows-2 grid-flow-col lg:grid-cols-2 lg:grid-rows-4 lg:grid-flow-row gap-1">
        <Tile v-for="(tile, index) in pinkTiles" 
          :key="`pink-tile-${index}`"
          :position="tile.position"
          :played="tile.played"
          :selected="tile.selected"
          :type="tile.type"
          :color="tile.color"
          @select-tile="selectTile"
        />
      </div>
    </div>

  </main>
  
</template>


<style>
</style>
