<template>
  <div class="text-center py-5 text-muted">
    <i class="bi bi-inbox d-block mb-3 empty-state-icon" style="font-size: 3rem"></i>
    <p class="mb-0" style="font-size: 0.9rem">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ message?: string }>()
</script>
