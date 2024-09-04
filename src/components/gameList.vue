<template>
    <div>
      <SearchBar @search="setSearchQuery" />
      <div class="grid grid-cols-2 gap-4">
        <div v-for="game in games" :key="game.id" class="bg-white p-4 rounded shadow">
          <h2 class="text-lg font-bold">{{ game.name }}</h2>
          <img :src="game.background_image" alt="game.name" class="w-full h-32 object-cover rounded"/>
          <router-link :to="`/game/${game.id}`" class="text-blue-500">View Details</router-link>
          <button @click="addFavorite(game)" class="ml-2 text-green-500">Add to Favorites</button>
        </div>
      </div>
      <div class="mt-4 flex justify-between">
        <button @click="prevPage" :disabled="page === 1" class="bg-gray-300 px-4 py-2 rounded">Previous</button>
        <button @click="nextPage" class="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useGameStore } from '@/stores/gameStore';
  import { onMounted } from 'vue';
  import SearchBar from '@/components/searchBar.vue';
  
  const store = useGameStore();
  
  const { games, page, fetchGames, setSearchQuery, addFavorite, prevPage, nextPage } = store;
  
  onMounted(() => {
    fetchGames();
  });
  </script>
  