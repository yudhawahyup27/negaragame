<template>
    <div>
      <h1 class="text-2xl font-bold">Favorite Games</h1>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="game in favorites" :key="game.id" class="bg-white p-4 rounded shadow">
          <h2 class="text-lg font-bold">{{ game.name }}</h2>
          <img :src="game.background_image" alt="game.name" class="w-full h-32 object-cover rounded"/>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useGameStore } from '../stores/gameStore';
  import { onMounted } from 'vue';
  
  const store = useGameStore();
  const { favorites, loadFavorites } = store;
  
  onMounted(() => {
    loadFavorites();
  });
  </script>
  