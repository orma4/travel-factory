<template>
  <AppLayout>
    <h1 class="page-title">Vacation Request Dashboard</h1>
    <p class="page-subtitle">Review pending requests and manage employee vacation approvals.</p>
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
