import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import HowToPlay from '../views/HowToPlay.vue'
import LocalGame from '../views/LocalGame.vue'
import OnlineGame from '../views/OnlineGame.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/how-to-play',
    name: 'HowToPlay',
    component: HowToPlay,
  },
  {
    path: '/local-game',
    name: 'LocalGame',
    component: LocalGame,
    props: (route) => ({ 
      ai: (String(route.query.ai).toLowerCase() === 'true'),
      playerColor: String(route.query.playerColor).toLowerCase() === 'null' ? null : String(route.query.playerColor).toLowerCase(),
    }),
  },
  {
    path: '/online-game',
    name: 'OnlineGame',
    component: OnlineGame,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router