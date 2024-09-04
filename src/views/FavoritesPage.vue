<template>
  <div class="p-4 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Favorite Games</h1>

    <div v-if="favoriteGames.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="game in favoriteGames" :key="game.id" class="bg-white shadow-md rounded-lg overflow-hidden">
        <img :src="game.background_image" :alt="game.name" class="w-full h-48 object-cover"/>
        <div class="p-4">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold">{{ game.name }}</h2>
            <button 
              @click="removeFavorite(game.id)" 
              class="text-xl text-red-500"
            >
              <i class="fa fa-heart"></i>
            </button>
          </div>
          <p class="text-gray-600">Released: {{ game.released }}</p>
          <p class="text-gray-600">Rating: {{ game.rating }}</p>
          <router-link :to="{ name: 'GameDetail', params: { id: game.id } }" class="text-blue-500 mt-2 block">
            View Details
          </router-link>
        </div>
      </div>
    </div>

    <div v-else class="text-gray-600">
      No favorite games found.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useGameStore } from '@/stores/gameStore';

const store = useGameStore();

const favoriteGames = computed(() => store.favoriteGames);

const removeFavorite = (gameId: number) => {
  store.removeFavorite(gameId);
};

onMounted(() => {
  store.loadFavorites();
});
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
