<template>
  <AppLayout>
    <h4 class="mb-4">My Vacation Requests</h4>
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
