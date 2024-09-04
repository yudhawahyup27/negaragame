import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GameDetail from '@/views/GameDetail.vue'
import FavoritesPage from '@/views/FavoritesPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },    
    {
      path: '/game/:id',
      name: 'Game Detail',
      component: GameDetail
    },
    {
      path: '/favorites',
      name: 'Favorite Page',
      component: FavoritesPage
    },
  ]
})

export default router
