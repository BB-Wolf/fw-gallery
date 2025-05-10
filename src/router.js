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
      },
      {
        name: 'Personal',
        path: '/personal/',
        component: () => import('@main/components/pages/Personal.vue')
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
      },
      {
        path: '/gallery/main/',
        name: 'GalleryMain',
        component: () => import('@gallery/components/pages/MainGallery.vue')
      },
      {
        path: '/gallery/register/',
        component: () => import('@gallery/components/pages/Register.vue'),
        name: 'Register'
      },
      {
        path: '/gallery/tags/',
        name: 'GalleryTags',
        component: () => import('@gallery/components/pages/TagList.vue'),
        meta: { transition: 'slide-left' }
      },
      {
        path: '/gallery/tags/:filter',
        name: 'GalleryTagsFilter',
        component: () => import('@gallery/components/pages/TagDetail.vue')
      },
      {
        name: 'Personal',
        path: '/gallery/personal/',
        component: () => import('@gallery/components/pages/Personal.vue')
      },
      {
        path: '/gallery/personal/folder/:name',
        name: 'personalFolder',
        component: () => import('@gallery/components/pages/PersonalFolder.vue')
      },
      {
        name: 'personalFolderCreate',
        path: '/gallery/personal/folder/create/',
        component: () => import('@gallery/components/pages/PersonalFolderCreate.vue')
      },
      {
        name: 'personalFolderEdit',
        path: '/gallery/author/:user',
        component: () => import('@gallery/components/pages/AuthorPage.vue')
      },
      {
        name: 'GalleryUser',
        path: '/gallery/:user',
        component: () => import('@gallery/components/pages/UserGallery.vue')
      },
      {
        name: 'GalleryImage',
        path: '/gallery/:user/:image/',
        component: () => import('@gallery/components/pages/DetailImage.vue')
      },
      {
        name: 'GalleryUpload',
        path: 'upload',
        component: () => import('@gallery/components/pages/Upload.vue')
      },
      {
        name: 'GalleryAuthorChar',
        path: '/gallery/author/:owner/characters/:character',
        component: () => import('@gallery/components/pages/CharacterPage.vue')
      },
      {
        name: 'Comic',
        path: '/gallery/comics/',
        component: () => import('@gallery/components/pages/ComicGallery.vue')
      },
      {
        name: 'ComicsAuthor',
        path: '/comics/:author/:name/',
        component: () => import('@gallery/components/pages/ComicsFolder.vue')
      },
      {
        name: 'ComicsAuthorPage',
        path: '/comics/:author/:name/:page/',
        component: () => import('@gallery/components/pages/ComicsDetailPage.vue')
      },
      {
        name: 'Legal',
        path: 'legal',
        component: () => import('@gallery/components/pages/Legal.vue')
      }
    ],
    meta: { transition: 'fade' }
  },
  // ###### End of gallery section ######
  {
    path: '/novel/',
    component: () => import('@main/layouts/NovelLayout.vue'),
    children: [
      {
        name: 'Main',
        path: '/novel/',
        component: () => import('@novel/components/pages/Home.vue'),
        meta: { transition: 'slide-right' }
      },
      {
        name: 'MainPagination',
        path: '/novel/:page/',
        component: () => import('@novel/components/pages/Home.vue'),
        meta: { transition: 'slide-right' }
      },
      {
        name: 'Detail',
        path: '/novel/:author/:name/:page/',
        component: () => import('@novel/components/pages/StoryDetail.vue')
      },
      {
        name: 'PersonalNovel',
        path: '/novel/personal/',
        component: () => import('@novel/components/pages/Personal.vue')
      },
      {
        name: 'PersonalNovelAdd',
        path: '/novel/personal/add',
        component: () => import('@novel/components/pages/PersonalAddNovel.vue')
      },
      {
        name: 'PersonalNovelEdit',
        path: '/novel/personal/story/:code/',
        component: () => import('@novel/components/pages/PersonalEditNovel.vue')
      }
    ]
  },

  {
    path: '/:catchAll(.*)',
    component: () => import('@main/layouts/MainPageLayout.vue'),
    children: [
      {
        name: 'NotFound',
        path: '/:catchAll(.*)/',
        beforeEnter() {
          window.location.href = 'https://furry-world.ru/404'
        },
        component: () => import('@gallery/components/pages/NotFound.vue'),
        meta: {
          requiresAuth: false
        }
      }
    ]
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
