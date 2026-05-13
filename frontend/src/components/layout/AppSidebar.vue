<template>
  <aside class="app-sidebar d-flex flex-column">
    <div class="sidebar-profile">
      <div class="sidebar-avatar">
        {{ initials }}
      </div>
      <div class="sidebar-profile-info">
        <div class="sidebar-profile-name">{{ activeUser?.name }}</div>
        <div class="sidebar-profile-role">{{ activeUser?.role }}</div>
      </div>
    </div>

    <div class="sidebar-section-title">
      Navigation
    </div>

    <nav class="flex-grow-1">
      <ul class="nav flex-column">
        <li v-if="activeUser?.role === 'requester'" class="nav-item">
          <RouterLink to="/requester" class="nav-link" active-class="active">
            <i class="bi bi-send"></i>My Requests
          </RouterLink>
        </li>
        <li v-if="activeUser?.role === 'validator'" class="nav-item">
          <RouterLink to="/validator" class="nav-link" active-class="active">
            <i class="bi bi-clipboard-check"></i>All Requests
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '../../stores/userStore'

const store = useUserStore()
const activeUser = computed(() => store.activeUser)

const initials = computed(() => {
  const name = activeUser.value?.name ?? ''
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()
})
</script>
