<template>
  <aside class="app-sidebar d-flex flex-column">
    <div class="py-3 px-3 border-bottom border-secondary">
      <small class="text-uppercase" style="color: #a7b1c2; letter-spacing: 0.08em; font-size: 0.7rem">
        Navigation
      </small>
    </div>

    <nav class="flex-grow-1">
      <ul class="nav flex-column mt-1">
        <li v-if="activeUser?.role === 'requester'" class="nav-item">
          <RouterLink to="/requester" class="nav-link" active-class="active">
            <i class="bi bi-send me-2"></i>My Requests
          </RouterLink>
        </li>
        <li v-if="activeUser?.role === 'validator'" class="nav-item">
          <RouterLink to="/validator" class="nav-link" active-class="active">
            <i class="bi bi-clipboard-check me-2"></i>All Requests
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
</script>
