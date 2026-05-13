<template>
  <span class="badge" :class="`badge-${status}`">{{ label }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RequestStatus } from '../../types'

const props = defineProps<{ status: RequestStatus }>()

const label = computed(() => {
  const map: Record<RequestStatus, string> = {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
  }
  return map[props.status]
})
</script>
