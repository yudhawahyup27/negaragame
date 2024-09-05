<!-- src/components/GameDetail.vue -->
<template>
    <div v-if="gameDetail" class="mx-auto mb-4">
      <img
        :src="gameDetail.background_image"
        :alt="gameDetail.name"
        class="p-4 max-w-4xl mb-4 mx-auto rounded-lg dark:bg-white bg-gray-900"
      />
      <h1 class="text-2xl font-bold mb-4">{{ gameDetail.name }}</h1>
      <p class="text-gray-600">Released: {{ gameDetail.released }}</p>
      <p class="text-gray-600">Rating: {{ gameDetail.rating }}</p>
  
      <h2 class="font-bold mb-2 text-xl">Description</h2>
      <p class="mb-2">{{ gameDetail.description_raw }}</p>
  
      <hr />
      <h2 class="text-lg font-semibold mt-4">Platforms</h2>
      <ul class="list-disc list-inside">
        <li v-for="platform in gameDetail.platforms" :key="platform.platform.id">
          {{ platform.platform.name }}
        </li>
      </ul>
  
      <h2 class="text-lg font-semibold mt-4">Genres</h2>
      <ul class="list-disc list-inside">
        <li v-for="genre in gameDetail.genres" :key="genre.id">
          {{ genre.name }}
        </li>
      </ul>
  
      <button
        @click="toggleFavorite"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
      </button>
    </div>
    <div v-else class="p-4">
      <p class="text-gray-600">Loading game data...</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useGameStore } from '@/stores/gameStore'
  
  interface Platform {
    platform: {
      id: number
      name: string
    }
  }
  
  interface Genre {
    id: number
    name: string
  }
  
  interface GameDetail {
    id: number
    name: string
    background_image: string
    released: string
    rating: number
    description_raw: string
    platforms: Platform[]
    genres: Genre[]
  }
  
  const route = useRoute()
  const store = useGameStore()
  
  const gameDetail = ref<GameDetail | null>(null)

  const isFavorite = computed(() => {
  if (gameDetail.value) {
    return store.favoriteGames.some((fav) => fav.id === gameDetail.value?.id);
  }
  return false;
});
  const fetchGameDetail = async () => {
    const gameId = route.params.id as string
    await store.fetchGameDetail(parseInt(gameId))
    gameDetail.value = store.gameDetail as GameDetail
  }
  
  const toggleFavorite = () => {
    if (gameDetail.value) {
      if (isFavorite.value) {
        store.removeFavorite(gameDetail.value.id)
      } else {
        store.addFavorite(gameDetail.value)
      }
    }
  }
  
  onMounted(() => {
    fetchGameDetail()
  })
  </script>
  
  <style scoped></style>
  