import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { VacationRequest, CreateRequestPayload, UpdateRequestPayload } from '../types'
import * as api from '../api/requestsApi'

export const useRequestStore = defineStore('request', () => {
  const requests = ref<VacationRequest[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchRequests(params?: { userId?: number }) {
    loading.value = true
    error.value = null
    try {
      requests.value = await api.fetchRequests(params)
    } catch {
      error.value = 'Failed to load requests.'
    } finally {
      loading.value = false
    }
  }

  async function createRequest(payload: CreateRequestPayload) {
    const created = await api.createRequest(payload)
    requests.value.unshift(created)
  }

  async function updateRequestStatus(id: number, payload: UpdateRequestPayload) {
    const updated = await api.updateRequest(id, payload)
    const index = requests.value.findIndex((r) => r.id === id)
    if (index !== -1) requests.value[index] = updated
  }

  return { requests, loading, error, fetchRequests, createRequest, updateRequestStatus }
})
