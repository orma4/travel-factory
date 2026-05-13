import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: () => {
        const store = useUserStore()
        return store.activeUser?.role === 'validator' ? '/validator' : '/requester'
      },
    },
    {
      path: '/requester',
      name: 'requester',
      component: () => import('../views/RequesterView.vue'),
      meta: { role: 'requester' },
    },
    {
      path: '/validator',
      name: 'validator',
      component: () => import('../views/ValidatorView.vue'),
      meta: { role: 'validator' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const store = useUserStore()
  const user = store.activeUser
  const requiredRole = to.meta.role as string | undefined

  if (requiredRole && user && user.role !== requiredRole) {
    return user.role === 'validator' ? { name: 'validator' } : { name: 'requester' }
  }
})

export default router
