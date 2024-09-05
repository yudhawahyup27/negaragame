<template>
  <div class="p-4 max-w-6xl mx-auto">
    

<section class="bg-center bg-no-repeat rounded-md mb-2 bg-cover bg-[url('https://cdn3.whatculture.com/images/2014/08/video-game-cover-montage.png')] bg-gray-700 bg-blend-multiply">
  <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
      <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Negara Game</h1>
      <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">All Game In here</p>
      <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
              Get started
              <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
          </a>
          <a href="#" class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
              Learn more
          </a>  
      </div>
  </div>
</section>



    <div class="max-w-md mx-auto mb-4">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          v-model="searchQuery"
          @input="setSearchQuery"
          type="search"
          id="default-search"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search games.."
          required
        />
      </div>
    </div>

    <div v-if="games.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="game in games"
        :key="game.id"
        class="dark:bg-white bg-gray-900 shadow-md rounded-lg overflow-hidden"
      >
        <img :src="game.background_image" :alt="game.name" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h2 class="text-xl font-semibold dark:text-black text-white">{{ game.name }}</h2>
          <p class="dark:text-gray-600 text-white">Released: {{ game.released }}</p>
          <p class="dark:text-gray-600 text-white">Rating: {{ game.rating }}</p>
          <router-link
            :to="{ name: 'GameDetail', params: { id: game.id } }"
            class="text-center dark:text-white mt-2 block dark:bg-gray-900 bg-white text-gray-900 p-2 rounded-lg"
          >
            View Details
          </router-link>
        </div>
      </div>
    </div>

    <div v-else class="text-gray-600">No games found.</div>

    <div class="flex justify-between mt-4">
      <button
        @click="prevPage"
        :disabled="page === 1"
        class="px-4 py-2 bg-gray-300 text-gray-700 rounded"
      >
        Previous
      </button>
      <button @click="nextPage" class="px-4 py-2 bg-gray-300 text-gray-700 rounded">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const store = useGameStore()

const searchQuery = ref('')
const games = computed(() => store.games)
const page = computed(() => store.page)

const setSearchQuery = () => {
  store.setSearchQuery(searchQuery.value)
}

const nextPage = () => {
  store.nextPage()
}

const prevPage = () => {
  store.prevPage()
}

onMounted(() => {
  store.fetchGames()
})
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
