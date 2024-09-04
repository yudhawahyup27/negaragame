<template>
    <input 
      type="text" 
      placeholder="Search games..." 
      v-model="query" 
      @input="emitSearch" 
      class="w-full p-2 border border-gray-300 rounded"
    />
  </template>
  
  <script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  
  const query = ref('');
  const emit = defineEmits(['search']);
  
  const emitSearch = () => {
    emit('search', query.value);
  };
  </script>
  