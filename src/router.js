import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './components/pages/Home.vue'

const rts = [
  { path: '/', component: HomeView, meta: { transition: 'fade' } },
  {
    path: '/main/',
    component: () => import('./components/pages/MainGallery.vue'),
    meta: { transition: 'fade' }
  },
  {
    path: '/register/',
    component: () => import('./components/pages/Register.vue'),
    meta: { transition: 'fade' }
  },
  {
    path: '/tags/',
    component: () => import('./components/pages/TagList.vue'),
    meta: { transition: 'slide-left' }
  },
  {
    path: '/tags/:tag',
    component: () => import('./components/pages/TagDetail.vue'),
    meta: { transition: 'slide-left' }
  },
  {
    path: '/personal/',
    component: () => import('./components/pages/Personal.vue'),
    meta: { transition: 'slide-right', requiresAuth: true }
  },
  {
    path: '/profile/:user',
    component: () => import('./components/pages/Personal.vue'),
    meta: { transition: 'slide-right' }
  },
  {
    path: '/gallery/:user/:image/',
    component: () => import('./components/pages/DetailImage.vue'),
    meta: { transition: 'slide-right' }
  },
  {
    path: '/upload/',
    component: () => import('./components/pages/Upload.vue'),
    meta: { transition: 'slide-right' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: rts
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    console.log(token)
    if (token) {
      // User is authenticated, proceed to the route
      next()
    } else {
      // User is not authenticated, redirect to login
      next('/login')
    }
  } else {
    // Non-protected route, allow access
    next()
  }
})

export default router
