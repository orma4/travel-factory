<template>
  <div class="btn-group mb-3" role="group">
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      class="btn btn-sm"
      :class="modelValue === opt.value ? 'btn-primary' : 'btn-outline-secondary'"
      @click="$emit('update:modelValue', opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()

const options = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
]
</script>
