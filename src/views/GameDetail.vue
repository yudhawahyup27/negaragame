<template>
    <div v-if="gameDetail" class="p-4">
      <h1 class="text-2xl font-bold">{{ gameDetail.name }}</h1>
      <img :src="gameDetail.background_image" alt="gameDetail.name" class="w-full h-64 object-cover rounded my-4"/>
      <p class="text-gray-700">{{ gameDetail.description_raw }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useGameStore } from '../stores/gameStore';
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const store = useGameStore();
  const route = useRoute();
  
  const { fetchGameDetail, gameDetail } = store;
  
  onMounted(() => {
    fetchGameDetail(route.params.id as string);
  });
  </script>
  