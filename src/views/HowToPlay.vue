<script setup>
</script>

<template>

  <main>

    <div class="flex flex-col text-black px-6 lg:px-64">

      <section class="flex flex-col">
        <!-- RULES  -->
        <div class="flex flex-col mb-10">
          <h2 class="text-3xl font-bold upper mb-2">Rules</h2>
          <p class="text-base lg:text-lg text-justify">
            The game is played on a 4 x 4 square grid. Each Player has eight pieces with two of four different symbols. 
            Each piece when played determines where your opponent can play their next piece. 
            For example you can force your opponent to play in a straight line (either othogonally or diagonally) from the piece just played, 
            or to play next to or away from the piece just played. 
            The aim is to form lines of 3 pieces of your color to get a point or lines of 4 that worth you two points. 
            When game ends the player with highest score wins.
          </p>
        </div>

        <!-- PIECES  -->
        <div class="flex flex-col mb-10">
          <h2 class="text-3xl font-bold upper mb-4">Pieces</h2>
          <p class="text-base lg:text-lg text-justify">
            Pieces are blue or pink and who has the blue ones is the first player. 
            In following examples pink dots indicates where opponent is allowed to play.
            N.B. In every game first blue piece must be placed in one of the edge board tiles.
          </p>

          <div class="lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-2">
            <div class="flex flex-col mt-4 px-2">
              <h2 class="text-xl font-bold upper text-center">Straights</h2>
              <div class="flex w-full text-center justify-center items-center my-2">
                <img src="../assets/how-to-play-straights.png" alt="how-to-play-straights" class="w-40">
              </div>
              <p class="text-base lg:text-lg text-center">
                Makes your opponent play into any one of the empty squares that lie in a straight line from where you play it
              </p>
            </div>
            <div class="flex flex-col mt-4 px-2">
              <h2 class="text-xl font-bold upper text-center">Diagonals</h2>
              <div class="flex w-full text-center justify-center items-center my-2">
                <img src="../assets/how-to-play-diagonals.png" alt="how-to-play-straights" class="w-40">
              </div>
              <p class="text-base lg:text-lg text-center">
                Makes your opponent play into any one of the empty squares that lie in a diagonal line from where you play it
              </p>
            </div>
            <div class="flex flex-col mt-4 px-2">
              <h2 class="text-xl font-bold upper text-center">Pushers</h2>
              <div class="flex w-full text-center justify-center items-center my-2">
                <img src="../assets/how-to-play-pushers.png" alt="how-to-play-straights" class="w-40">
              </div>
              <p class="text-base lg:text-lg text-center">
                Makes your opponent play into any one of the empty squares that aren't adjacent to the square you play this into
              </p>
            </div>
            <div class="flex flex-col mt-4 px-2">
              <h2 class="text-xl font-bold upper text-center">Pullers</h2>
              <div class="flex w-full text-center justify-center items-center my-2">
                <img src="../assets/how-to-play-pullers.png" alt="how-to-play-straights" class="w-40">
              </div>
              <p class="text-base lg:text-lg text-center">
                Makes your opponent play into any one of the empty squares that are adjacent to the square you play this into
              </p>
            </div>
          </div>

          <p class="text-base lg:text-lg text-justify mt-6">
            If you are unable to play because the are no legal spaces available you must PASS. When a player passes the other one can play into ANY space on the board, and he's able to force the opponent to pass again.
          </p>
        </div>

        <div class="flex flex-col">
          <h2 class="text-3xl font-bold upper mb-2">Ending the game</h2>
          <p class="text-base lg:text-lg text-justify">
            As soon as one player places their last piece their opponent gets ONE last chance to play, which they forsake if they have to PASS, and the game ends. The player with most points wins.
          </p>
        </div>

      </section>
    </div>
  </main>

  <footer class="fles text-center font-sans mt-12 pb-6">
    © 2022 Alessio Poggi
  </footer>

</template>

<style>
</style>