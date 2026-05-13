<template>
  <div class="card mb-4">
    <div class="card-header">New Vacation Request</div>
    <div class="card-body">
      <form @submit.prevent="submit">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Start Date <span class="text-danger">*</span></label>
            <input
              v-model="form.startDate"
              type="date"
              class="form-control"
              :min="today"
              required
            />
          </div>

          <div class="col-md-6">
            <label class="form-label">End Date <span class="text-danger">*</span></label>
            <input
              v-model="form.endDate"
              type="date"
              class="form-control"
              :min="form.startDate || today"
              required
            />
          </div>

          <div class="col-12">
            <label class="form-label">Reason <span class="text-muted">(optional)</span></label>
            <textarea
              v-model="form.reason"
              class="form-control"
              rows="3"
              maxlength="500"
              placeholder="Briefly describe your reason..."
            ></textarea>
          </div>

          <div class="col-12">
            <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>
            <button type="submit" class="btn btn-primary" :disabled="submitting">
              <span v-if="submitting" class="spinner-border spinner-border-sm me-1"></span>
              Submit Request
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRequestStore } from '../../stores/requestStore'
import { useUserStore } from '../../stores/userStore'

const requestStore = useRequestStore()
const userStore = useUserStore()

const today = new Date().toISOString().split('T')[0]

const form = ref({ startDate: '', endDate: '', reason: '' })
const submitting = ref(false)
const error = ref<string | null>(null)

async function submit() {
  error.value = null
  if (form.value.endDate < form.value.startDate) {
    error.value = 'End date must be on or after start date.'
    return
  }

  submitting.value = true
  try {
    await requestStore.createRequest({
      userId: userStore.activeUser!.id,
      startDate: form.value.startDate,
      endDate: form.value.endDate,
      reason: form.value.reason || null,
    })
    form.value = { startDate: '', endDate: '', reason: '' }
  } catch {
    error.value = 'Failed to submit request. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>
