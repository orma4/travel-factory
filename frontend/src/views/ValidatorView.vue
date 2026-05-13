<template>
  <AppLayout>
    <h4 class="mb-4">Vacation Request Dashboard</h4>
    <RequestDashboard />
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRequestStore } from '../stores/requestStore'
import AppLayout from '../components/layout/AppLayout.vue'
import RequestDashboard from '../components/validator/RequestDashboard.vue'

const requestStore = useRequestStore()

onMounted(() => {
  requestStore.fetchRequests()
})
</script>
