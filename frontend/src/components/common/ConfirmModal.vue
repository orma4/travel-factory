<template>
  <div class="modal fade show d-block" style="background: rgba(0,0,0,0.5)" @click.self="$emit('cancel')">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Reject Request</h5>
          <button type="button" class="btn-close" @click="$emit('cancel')"></button>
        </div>
        <div class="modal-body">
          <p class="text-muted mb-3">Please provide a reason for rejection.</p>
          <textarea
            v-model="comment"
            class="form-control"
            rows="3"
            placeholder="Enter rejection reason..."
            maxlength="1000"
            autofocus
          ></textarea>
          <div v-if="showError" class="text-danger mt-1" style="font-size: 0.85rem">
            A comment is required when rejecting.
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="$emit('cancel')">Cancel</button>
          <button class="btn btn-danger" @click="confirm">Reject</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  confirm: [comment: string]
  cancel: []
}>()

const comment = ref('')
const showError = ref(false)

function confirm() {
  if (!comment.value.trim()) {
    showError.value = true
    return
  }
  emit('confirm', comment.value.trim())
}
</script>
