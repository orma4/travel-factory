import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '../types'
import { fetchUsers } from '../api/usersApi'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const activeUser = ref<User | null>(null)

  async function loadUsers() {
    users.value = await fetchUsers()
    if (!activeUser.value && users.value.length > 0) {
      activeUser.value = users.value[0]
    }
  }

  function setActiveUser(user: User) {
    activeUser.value = user
  }

  return { users, activeUser, loadUsers, setActiveUser }
})
