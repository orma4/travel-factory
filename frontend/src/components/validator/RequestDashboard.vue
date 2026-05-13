<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <span><i class="bi bi-clipboard-data me-2"></i>Vacation Requests</span>
      <span class="badge bg-light text-dark" style="font-weight: 600; border: 1px solid var(--color-border);">
        {{ filtered.length }} shown
      </span>
    </div>
    <div class="card-body">
      <StatusFilter v-model="activeFilter" />

      <LoadingSpinner v-if="loading" />
      <EmptyState v-else-if="filtered.length === 0" message="No requests found for this filter." />
      <div v-else class="table-responsive">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Duration</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="req in filtered" :key="req.id">
              <td>{{ req.userName ?? '—' }}</td>
              <td>{{ formatDate(req.startDate) }}</td>
              <td>{{ formatDate(req.endDate) }}</td>
              <td>{{ duration(req.startDate, req.endDate) }} day(s)</td>
              <td>{{ req.reason ?? '—' }}</td>
              <td><StatusBadge :status="req.status" /></td>
              <td>{{ req.comments ?? '—' }}</td>
              <td>
                <ActionButtons v-if="req.status === 'pending'" :request-id="req.id" />
                <span v-else class="text-muted" style="font-size: 0.8rem">Processed</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRequestStore } from '../../stores/requestStore'
import StatusBadge from '../common/StatusBadge.vue'
import LoadingSpinner from '../common/LoadingSpinner.vue'
import EmptyState from '../common/EmptyState.vue'
import StatusFilter from './StatusFilter.vue'
import ActionButtons from './ActionButtons.vue'

const store = useRequestStore()
const loading = computed(() => store.loading)
const activeFilter = ref('all')

const filtered = computed(() => {
  if (activeFilter.value === 'all') return store.requests
  return store.requests.filter((r) => r.status === activeFilter.value)
})

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function duration(start: string, end: string) {
  const ms = new Date(end).getTime() - new Date(start).getTime()
  return Math.round(ms / 86400000) + 1
}
</script>
