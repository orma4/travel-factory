<template>
  <nav class="app-navbar d-flex align-items-center px-4 shadow-sm">
    <span class="fw-bold text-dark me-auto" style="font-size: 1.1rem">
      <i class="bi bi-calendar2-check me-2 text-success"></i>Vacation Manager
    </span>

    <div class="d-flex align-items-center gap-3">
      <span class="badge rounded-pill" :class="roleBadgeClass">
        {{ activeUser?.role }}
      </span>

      <select
        class="form-select form-select-sm"
        style="width: auto"
        :value="activeUser?.id"
        @change="onUserChange"
      >
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/userStore'

const store = useUserStore()
const router = useRouter()

const users = computed(() => store.users)
const activeUser = computed(() => store.activeUser)

const roleBadgeClass = computed(() =>
  activeUser.value?.role === 'validator' ? 'bg-primary' : 'bg-success'
)

function onUserChange(event: Event) {
  const id = Number((event.target as HTMLSelectElement).value)
  const user = store.users.find((u) => u.id === id)
  if (user) {
    store.setActiveUser(user)
    router.push(user.role === 'validator' ? '/validator' : '/requester')
  }
}
</script>
