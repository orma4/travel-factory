<template>
  <nav class="app-navbar d-flex align-items-center px-4">
    <span class="navbar-brand-title me-auto">
      <i class="bi bi-calendar2-check me-2"></i>Vacation Manager
    </span>

    <div class="d-flex align-items-center gap-3">
      <span class="role-pill" :class="activeUser?.role">
        {{ activeUser?.role }}
      </span>

      <select
        class="user-switcher"
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

function onUserChange(event: Event) {
  const id = Number((event.target as HTMLSelectElement).value)
  const user = store.users.find((u) => u.id === id)
  if (user) {
    store.setActiveUser(user)
    router.push(user.role === 'validator' ? '/validator' : '/requester')
  }
}
</script>
