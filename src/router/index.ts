import { createRouter, createWebHistory } from 'vue-router'
import { userStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)',
      name: '404',
      component: () => import('../views/404Page.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LandingPage.vue')
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('../views/SignInPage.vue')
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('../views/SignUpPage.vue')
    },
    {
      path: '/user-profile/:username',
      name: 'user-profile',
      component: () => import('../views/UserProfilePage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user-settings',
      name: 'user-settings',
      component: () => import('../views/UserSettingsPage.vue')
    },
    {
      path: '/user-posts',
      name: 'user-posts',
      component: () => import('../views/UserAddPosts.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const store = userStore()
  try {
    if (to.params.username) await store.getUserInfo(String(to.params.username))
    next()
  } catch (e: any) {
    if (e.response.status === 404) {
      next('/:pathMatch(.*)')
    } else {
      next('/')
    }
    return
  }
})

export default router
