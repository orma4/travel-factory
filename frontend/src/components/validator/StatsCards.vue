<template>
  <div class="row g-3 mb-4">
    <div class="col-md-4">
      <div class="stat-card stat-pending" role="button" @click="$emit('select', 'pending')">
        <div class="stat-icon">
          <i class="bi bi-hourglass-split"></i>
        </div>
        <div class="stat-content">
          <div class="stat-label">Pending</div>
          <div class="stat-value">{{ counts.pending }}</div>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="stat-card stat-approved" role="button" @click="$emit('select', 'approved')">
        <div class="stat-icon">
          <i class="bi bi-check-circle"></i>
        </div>
        <div class="stat-content">
          <div class="stat-label">Approved</div>
          <div class="stat-value">{{ counts.approved }}</div>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="stat-card stat-rejected" role="button" @click="$emit('select', 'rejected')">
        <div class="stat-icon">
          <i class="bi bi-x-circle"></i>
        </div>
        <div class="stat-content">
          <div class="stat-label">Rejected</div>
          <div class="stat-value">{{ counts.rejected }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRequestStore } from '../../stores/requestStore'

defineEmits<{ select: [status: string] }>()

const store = useRequestStore()

const counts = computed(() => ({
  pending: store.requests.filter((r) => r.status === 'pending').length,
  approved: store.requests.filter((r) => r.status === 'approved').length,
  rejected: store.requests.filter((r) => r.status === 'rejected').length,
}))
</script>
