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
    path: '/personal/folder/:name',
    component: () => import('./components/pages/PersonalFolder.vue'),
    meta: { transition: 'slide-right', requiresAuth: true }
  },
  {
    path: '/personal/folder/create/',
    component: () => import('./components/pages/PersonalFolderCreate.vue'),
    meta: { transition: 'slide-right', requiresAuth: true }
  },
  {
    path: '/author/:user',
    component: () => import('./components/pages/AuthorPage.vue'),
    meta: { transition: 'fade' }
  },
  {
    path: '/gallery/:user/',
    component: () => import('./components/pages/UserGallery.vue'),
    meta: { transition: 'fade' }
  },
  {
    path: '/gallery/:user/:image/',
    component: () => import('./components/pages/DetailImage.vue'),
    meta: { transition: 'fade' }
  },
  {
    path: '/upload/',
    component: () => import('./components/pages/Upload.vue'),
    meta: { transition: 'fade' }
  },

  {
    path: '/character/:character',
    component: () => import('./components/pages/CharacterPage.vue'),
    meta: { transition: 'fade' }
  },
  {
    path: '/todo/',
    component: () => import('./components/pages/TodoPage.vue'),
    meta: { transition: 'fade' }
  },
  {
    path: '/test/',
    component: () => import('./components/pages/TestPage.vue'),
    meta: { transition: 'fade' }
  },
  {
    path: '/comics/:name/',
    component: () => import('./components/pages/ComicsFolder.vue'),
    meta: { transition: 'slide-right' }
  },
  {
    path: '/comics/:name/:page/',
    component: () => import('./components/pages/ComicsDetailPage.vue'),
    meta: { transition: 'slide-right' }
  },
  {
    // path: "*",
    path: '/:catchAll(.*)/',
    name: 'NotFound',
    component: () => import('./components/pages/NotFound.vue'),
    meta: {
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: rts
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
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
