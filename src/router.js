import { createWebHistory, createRouter } from 'vue-router'
let rts = []

rts = [
  {
    path: '/',
    component: () => import('@main/layouts//MainPageLayout.vue'),
    children: [
      {
        name: 'Home',
        path: '',
        component: () => import('@main/components/pages/HomePage.vue')
      }
    ],
    meta: { transition: 'fade' }
  },
  {
    path: '/gallery/',
    component: () => import('@main/layouts/GalleryLayout.vue'),
    children: [
      {
        path: '',
        name: 'GalleryHome',
        component: () => import('@gallery/components/pages/Home.vue')
      }
    ],
    meta: { transition: 'fade' }
  },
  {
    path: '/gallery/',
    component: () => import('@main/layouts/GalleryLayout.vue'),
    children: [
      {
        path: 'main',
        name: 'GalleryMain',
        component: () => import('@gallery/components/pages/MainGallery.vue')
      }
    ],
    meta: { transition: 'fade' }
  },

  {
    path: '/gallery/',
    component: () => import('@main/layouts/GalleryLayout.vue'),
    children: [
      {
        path: 'register',
        component: () => import('@gallery/components/pages/Register.vue'),
        name: 'Register'
      }
    ],
    meta: { transition: 'fade' }
  },
  {
    path: '/gallery/',
    component: () => import('@main/layouts/GalleryLayout.vue'),
    children: [
      {
        path: 'tags',
        name: 'GalleryTags',
        component: () => import('@gallery/components/pages/TagList.vue')
      }
    ],
    meta: { transition: 'slide-left' }
  },
  {
    path: '/gallery/',
    component: () => import('@main/layouts/GalleryLayout.vue'),
    children: [
      {
        path: 'tags/:filter',
        name: 'GalleryTagsFilter',
        component: () => import('@gallery/components/pages/TagDetail.vue')
      }
    ],
    meta: { transition: 'slide-left' }
  },
  {
    path: '/gallery/',
    component: () => import('@main/layouts/GalleryLayout.vue'),
    children: [
      {
        name: 'Personal',
        path: 'personal/',
        component: () => import('@gallery/components/pages/Personal.vue')
      }
    ],
    meta: { transition: 'slide-right', requiresAuth: true }
  },
  {
    path: '/gallery/',
    component: () => import('@main/layouts/GalleryLayout.vue'),
    children: [
      {
        path: 'personal/folder/:name',
        name: 'personalFolder',
        component: () => import('@gallery/components/pages/PersonalFolder.vue')
      }
    ],
    meta: { transition: 'slide-right', requiresAuth: true }
  },
  {
    path: '/gallery/',
    component: () => import('@main/layouts/GalleryLayout.vue'),
    children: [
      {
        name: 'personalFolderCreate',
        path: 'personal/folder/create/',
        component: () => import('@gallery/components/pages/PersonalFolderCreate.vue')
      }
    ],
    meta: { transition: 'slide-right', requiresAuth: true }
  },
  {
    path: '/gallery/',
    component: () => import('@main/layouts/GalleryLayout.vue'),
    children: [
      {
        name: 'personalFolderEdit',
        path: '/author/:user',
        component: () => import('@gallery/components/pages/AuthorPage.vue')
      }
    ],
    meta: { transition: 'fade' }
  },
  {
    path: '/gallery/',
    component: () => import('@main/layouts/GalleryLayout.vue'),
    children: [
      {
        name: 'GalleryUser',
        path: ':user',
        component: () => import('@gallery/components/pages/UserGallery.vue')
      }
    ],
    meta: { transition: 'fade' }
  },
  {
    path: '/gallery/',
    component: () => import('@main/layouts/GalleryLayout.vue'),
    children: [
      {
        name: 'GalleryImage',
        path: ':user/:image/',
        component: () => import('@gallery/components/pages/DetailImage.vue')
      }
    ],
    meta: { transition: 'fade' }
  },
  {
    path: '/gallery/',
    component: () => import('@main/layouts/GalleryLayout.vue'),
    children: [
      {
        name: 'GalleryUpload',
        path: 'upload',
        component: () => import('@gallery/components/pages/Upload.vue')
      }
    ],
    meta: { transition: 'fade' }
  },

  {
    path: '/gallery/',
    component: () => import('@main/layouts/GalleryLayout.vue'),
    children: [
      {
        name: 'GalleryAuthorChar',
        path: 'author/:owner/characters/:character',
        component: () => import('@gallery/components/pages/CharacterPage.vue')
      }
    ],
    meta: { transition: 'fade' }
  },
  {
    path: '/gallery/',
    component: () => import('@main/layouts/GalleryLayout.vue'),
    children: [
      {
        name: 'Comic',
        path: 'comics',
        component: () => import('@gallery/components/pages/ComicGallery.vue')
      }
    ],
    meta: { transition: 'slide-right' }
  },
  {
    path: '/gallery/',
    component: () => import('@main/layouts/GalleryLayout.vue'),
    children: [
      {
        name: 'ComicsAuthor',
        path: '/comics/:author/:name/',
        component: () => import('@gallery/components/pages/ComicsFolder.vue')
      }
    ],
    meta: { transition: 'slide-right' }
  },
  {
    path: '/gallery/',
    component: () => import('@main/layouts/GalleryLayout.vue'),
    children: [
      {
        name: 'ComicsAuthorPage',
        path: '/comics/:author/:name/:page/',
        component: () => import('@gallery/components/pages/ComicsDetailPage.vue')
      }
    ],
    meta: { transition: 'slide-right' }
  },
  {
    path: '/gallery/',
    component: () => import('@main/layouts/GalleryLayout.vue'),
    children: [
      {
        name: 'Legal',
        path: 'legal',
        component: () => import('@gallery/components/pages/Legal.vue')
      }
    ],
    meta: { transition: 'slide-right' }
  },

  // ###### End of gallery section ######
  {
    path: '/novel/',
    component: () => import('@novel/components/pages/Home.vue'),
    meta: { transition: 'slide-right' }
  },

  {
    path: '/gallery/:catchAll(.*)/',
    name: 'NotFound',
    component: () => import('@gallery/components/pages/NotFound.vue'),
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
      next('/gallery/login')
    }
  } else {
    // Non-protected route, allow access
    next()
  }
})

export default router
