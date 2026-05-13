<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <span><i class="bi bi-list-ul me-2"></i>My Requests</span>
      <span class="badge bg-light text-dark" style="font-weight: 600; border: 1px solid var(--color-border);">
        {{ requests.length }} total
      </span>
    </div>
    <div class="card-body no-padding">
      <LoadingSpinner v-if="loading" />
      <EmptyState v-else-if="requests.length === 0" message="You have no vacation requests yet." />
      <div v-else class="table-responsive">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Duration</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="req in requests" :key="req.id">
              <td>{{ formatDate(req.startDate) }}</td>
              <td>{{ formatDate(req.endDate) }}</td>
              <td>{{ duration(req.startDate, req.endDate) }} day(s)</td>
              <td>{{ req.reason ?? '—' }}</td>
              <td><StatusBadge :status="req.status" /></td>
              <td>{{ req.comments ?? '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRequestStore } from '../../stores/requestStore'
import StatusBadge from '../common/StatusBadge.vue'
import LoadingSpinner from '../common/LoadingSpinner.vue'
import EmptyState from '../common/EmptyState.vue'

const store = useRequestStore()
const requests = computed(() => store.requests)
const loading = computed(() => store.loading)

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function duration(start: string, end: string) {
  const ms = new Date(end).getTime() - new Date(start).getTime()
  return Math.round(ms / 86400000) + 1
}
</script>
