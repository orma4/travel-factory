<template>
  <AppLayout>
    <h1 class="page-title">My Vacation Requests</h1>
    <p class="page-subtitle">Submit a new request and track the status of your previous requests.</p>
    <RequestForm />
    <RequestList />
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRequestStore } from '../stores/requestStore'
import AppLayout from '../components/layout/AppLayout.vue'
import RequestForm from '../components/requester/RequestForm.vue'
import RequestList from '../components/requester/RequestList.vue'

const userStore = useUserStore()
const requestStore = useRequestStore()

onMounted(() => {
  if (userStore.activeUser) {
    requestStore.fetchRequests({ userId: userStore.activeUser.id })
  }
})
</script>
