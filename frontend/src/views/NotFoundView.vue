<template>
  <AppLayout>
    <div class="text-center py-5">
      <h1 class="display-4 text-muted">404</h1>
      <p class="text-muted">Page not found.</p>
      <RouterLink to="/" class="btn btn-primary">Go Home</RouterLink>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '../components/layout/AppLayout.vue'
</script>
