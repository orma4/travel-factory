<template>
  <div class="d-flex flex-column" style="min-height: 100vh">
    <AppNavbar />
    <div class="d-flex flex-grow-1">
      <AppSidebar />
      <main class="flex-grow-1 p-4">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppNavbar from './AppNavbar.vue'
import AppSidebar from './AppSidebar.vue'
</script>
