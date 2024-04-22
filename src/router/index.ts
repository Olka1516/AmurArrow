import { createRouter, createWebHistory } from 'vue-router'
import { loverStore, userStore } from '@/stores'
import type { TRequestError } from '@/types'

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
      path: '/user-settings/:username',
      name: 'user-settings',
      component: () => import('../views/UserSettingsPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user-posts/:username',
      name: 'user-posts',
      component: () => import('../views/UserAddPosts.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/find-lover/:username',
      name: 'find-lover',
      component: () => import('../views/FindLoverPage.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const store = userStore()
  const LoverStore = loverStore()
  try {
    if (to.params.username) {
      await store.getUserInfo(String(to.params.username))
      if (store.userType === 'OWNER') await LoverStore.getAll(String(to.params.username))
    }
    if (
      (to.fullPath.includes('find-lover') ||
        to.fullPath.includes('user-settings') ||
        to.fullPath.includes('user-posts')) &&
      store.userType !== 'OWNER'
    ) {
      next(from.path)
      return
    }
    next()
  } catch (err) {
    const message = err as TRequestError
    const error = message.response
    if (error && error.status === 404) {
      next('/:pathMatch(.*)')
    } else {
      next('/')
    }
  }
})

export default router
