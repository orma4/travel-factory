<template>
  <div class="text-center py-5 text-muted">
    <i class="bi bi-inbox fs-1 d-block mb-2"></i>
    <p class="mb-0">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ message?: string }>()
</script>
