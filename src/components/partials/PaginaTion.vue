<template>
    <nav aria-label="Page navigation example">
      <ul class="flex items-center -space-x-px h-10 text-base">
        <li>
          <a 
            href="#" 
            @click.prevent="emitChangePage(currentPage - 1)"
            :class="['flex items-center justify-center px-4 h-10 ms-0 leading-tight', currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700']"
            :disabled="currentPage === 1"
          >
            <span class="sr-only">Previous</span>
            <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
          </a>
        </li>
        <li v-for="page in pages" :key="page">
          <a 
            href="#" 
            @click.prevent="emitChangePage(page)"
            :class="['flex items-center justify-center px-4 h-10 leading-tight', page === currentPage ? 'z-10 text-blue-600 border border-blue-300 bg-blue-50' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700']"
          >
            {{ page }}
          </a>
        </li>
        <li>
          <a 
            href="#" 
            @click.prevent="emitChangePage(currentPage + 1)"
            :class="['flex items-center justify-center px-4 h-10 leading-tight', currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700']"
            :disabled="currentPage === totalPages"
          >
            <span class="sr-only">Next</span>
            <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { defineEmits, defineProps } from 'vue';
  
  const emit = defineEmits<{
    (e: 'change-page', page: number): void;
  }>();
  
  const props = defineProps<{
    currentPage: number;
    totalPages: number;
  }>();
  
  const emitChangePage = (page: number) => {
    if (page >= 1 && page <= props.totalPages) {
      emit('change-page', page);
    }
  };
  
  const pages = Array.from({ length: props.totalPages }, (_, i) => i + 1);
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
  