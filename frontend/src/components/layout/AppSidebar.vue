<template>
  <aside class="app-sidebar d-flex flex-column">
    <div class="sidebar-brand-section">
      <small class="text-uppercase" style="color: #6c7a89; letter-spacing: 0.1em; font-size: 0.7rem; font-weight: 600">
        Navigation
      </small>
    </div>

    <nav class="flex-grow-1">
      <ul class="nav flex-column mt-2">
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

    <div class="px-3 py-3" style="border-top: 1px solid rgba(255,255,255,0.05)">
      <small style="color: #6c7a89; font-size: 0.7rem">
        <i class="bi bi-person-circle me-1"></i>
        {{ activeUser?.name }}
      </small>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '../../stores/userStore'

const store = useUserStore()
const activeUser = computed(() => store.activeUser)
</script>
