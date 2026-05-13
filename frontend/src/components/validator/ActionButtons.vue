<template>
  <div class="d-flex gap-2">
    <button
      class="btn btn-sm btn-success"
      :disabled="processing"
      @click="approve"
    >
      <i class="bi bi-check-lg me-1"></i>Approve
    </button>
    <button
      class="btn btn-sm btn-danger"
      :disabled="processing"
      @click="showModal = true"
    >
      <i class="bi bi-x-lg me-1"></i>Reject
    </button>

    <ConfirmModal
      v-if="showModal"
      @confirm="reject"
      @cancel="showModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRequestStore } from '../../stores/requestStore'
import ConfirmModal from '../common/ConfirmModal.vue'

const props = defineProps<{ requestId: number }>()

const store = useRequestStore()
const showModal = ref(false)
const processing = ref(false)

async function approve() {
  processing.value = true
  try {
    await store.updateRequestStatus(props.requestId, { status: 'approved' })
  } finally {
    processing.value = false
  }
}

async function reject(comment: string) {
  showModal.value = false
  processing.value = true
  try {
    await store.updateRequestStatus(props.requestId, { status: 'rejected', comments: comment })
  } finally {
    processing.value = false
  }
}
</script>
