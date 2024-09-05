<script setup lang="ts">

NavBar
import FooTer from '@/components/partials/FooTer.vue'
import NavBar from './components/partials/NavBar.vue';

</script>

<template>
  <NavBar/>
  <div class="dark:bg-gray-900  ">
    <router-view />
  </div>
  
<FooTer/>
</template>
