<script setup lang="ts">

import NavBar from '@/components/partials/NavBar.vue'
import FooTer from '@/components/partials/FooTer.vue'

</script>

<template>
  <NavBar/>
  <div class="container mx-4">
    <router-view />
  </div>
  
<FooTer/>
</template>
