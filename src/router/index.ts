import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GameDetail from '@/views/GameDetail.vue'
import FavoritesPage from '@/views/FavoritesPage.vue'


const  routes= [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },    
  {
    path: '/game/:id',
    name: 'GameDetail',
    component: GameDetail,
    props: true
  },
  {
    path: '/favorites',
    name: 'Favorite Page',
    component: FavoritesPage
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
