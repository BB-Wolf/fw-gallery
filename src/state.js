import { reactive } from 'vue'
import axios from 'axios'
import { isMobile } from 'mobile-device-detect'
import { defineStore } from 'pinia';
import { get } from '@vueuse/core';


export const modalState = reactive({
  isModalLoginVisible: false,
  isModalRegisterVisible: false,
  isModalUploadVisible: false,
  isModalMobileUploadVisible: false
})

export const siteVersion = reactive({
  currentState: 'gallery'
})

export const galleryMode = reactive({
  mode: localStorage.getItem('view') ?? 'grid',
  setMode(newMode) {
    localStorage.setItem('view', newMode);
  }
})

export const mobileDevice = reactive({ isMobile })
export const notifications = reactive({
  notificationsCount: 0,
  notificationList: [],
  generateNotification(nTitle, nBody) {
    this.notificationsCount = this.notificationsCount + 1
    this.notificationList = [...this.notificationList, ...[{ title: nTitle, body: nBody }]]
  },
  async checkNotification() {
    const notifyData = await new axios.get('//furry-world.ru/console/get_notifications.php')
    if (notifyData.data) {
      this.notificationsCount = notifyData.data.length
    }
  },
  showNotificationModal: false
})

export const isUserLogged = reactive({
  userLogged: !!localStorage.getItem('token'),
  setLogin() {
    this.userLogged = true
  },
  async validate() {
    const tokenRequest = axios.get(
      '//furry-world.ru/console/get_validate_token.php?token=' + localStorage.getItem('token')
    )
    const response = await tokenRequest
    if (response.data) {
      if (response.data.valid == 'false') {
        localStorage.removeItem('token')
        isUserLogged.userLogged = false
      }

      if (response.data.valid == 'true') {
        isUserLogged.userLogged = true
      }
    } else {
      localStorage.removeItem('token')
      isUserLogged.userLogged = false
    }
    //return isLogged;
  }
})

export const pageTitle = reactive({
  title: ''
})

export const allowedCookie = reactive({ allowed: localStorage.getItem('allowcookie') })


export const userFolders = reactive({
  folders: [],
  async fetchFolders() {
    const foldersRequest = await axios.get('//furry-world.ru/console/get_user_folders.php',
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        }
      });
    this.folders = foldersRequest.data;
  }
});


export const isAgeAgreed = reactive({
  agreed: localStorage.getItem('ageagree') === 'true',
  setAgreed() {
    this.agreed = true;
    localStorage.setItem('ageagree', 'true');
  }
});

export const userSettings = reactive({
  folders: [],
  nswf: localStorage.getItem('nsfw') ?? '0+',
  setNSFW(mode) {
    this.nswf = mode;
  },
  async fetchSettings() {
    let foldersRequest = await new axios.get('//furry-world.ru/console/get_settings.php',
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        }
      });
    this.folders = foldersRequest.data.folders;
    return this.folders;
  }

});

// const foldersRequest = await axios.get('//furry-world.ru/console/get_settings.php',
//   {
//     headers: {
//       "Authorization": "Bearer " + localStorage.getItem("token"),
//     }
//   });

export const userSettingsStore = defineStore('userSettings', {
  state: () => ({
    folders: [],
    nswf: 7,
  }),

  getters: {
    getUserFolders(state) {
      return state.folders;
    }
  },

  actions: {
    setNSFW(mode) {
      this.nswf = mode;
    },

    async fetchSettings() {
      // проверяем именно this.folders
      if (this.folders.length === 0) {
        const response = await axios.get('//furry-world.ru/console/get_settings.php', {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
          }
        });

        this.folders = response.data || [];
      }

      return this.folders;
    }
  }
});

export const usePostsStore = [
  /* {  
     id: 1,
     published_at: '2025-12-12',
     is_pinned: true,
     content: `
       Новый арт почти закончен.
       Осталось не сойти с ума на финальном рендере.
     `,
     media: [
       { url: 'https://placekitten.com/600/400' }
     ]
   },
   {
     id: 2,
     published_at: '2025-12-10',
     is_pinned: false,
     content: `
       Думаю чаще делать посты с процессом.
       А то галерея выглядит слишком идеально.
     `,
     media: [
       { url: 'https://placekitten.com/400/400' },
       { url: 'https://placekitten.com/401/400' }
     ]
   },
   {
     id: 3,
     published_at: '2025-12-05',
     is_pinned: false,
     content: `
       Иногда полезно ничего не публиковать
       и просто работать.
     `,
     media: []
   },
   {
     id: 4,
     published_at: '2025-11-28',
     is_pinned: false,
     content: `
       Завтра будет новый пост с процессом.
       Не пропустите!
     `,
     media: [
       { url: 'https://placekitten.com/500/300' },
       { url: 'https://placekitten.com/501/300' },
       { url: 'https://placekitten.com/502/300' }
     ]
   },
   {
     id: 5,
     published_at: '2025-11-20',
     is_pinned: false,
     content: `
       Работа над новым проектом идет полным ходом.
       Скоро будут новости!
     `,
     media: []
   },
   {
     id: 1,
     published_at: '2025-12-12',
     is_pinned: true,
     content: `
       Новый арт почти закончен.
       Осталось не сойти с ума на финальном рендере.
     `,
     media: [
       { url: 'https://placekitten.com/600/400' }
     ]
   },
   {
     id: 2,
     published_at: '2025-12-10',
     is_pinned: false,
     content: `
       Думаю чаще делать посты с процессом.
       А то галерея выглядит слишком идеально.
     `,
     media: [
       { url: 'https://placekitten.com/400/400' },
       { url: 'https://placekitten.com/401/400' }
     ]
   },
   {
     id: 3,
     published_at: '2025-12-05',
     is_pinned: false,
     content: `
       Иногда полезно ничего не публиковать
       и просто работать.
     `,
     media: []
   },
   {
     id: 4,
     published_at: '2025-11-28',
     is_pinned: false,
     content: `
       Завтра будет новый пост с процессом.
       Не пропустите!
     `,
     media: [
       { url: 'https://placekitten.com/500/300' },
       { url: 'https://placekitten.com/501/300' },
       { url: 'https://placekitten.com/502/300' }
     ]
   },
   {
     id: 5,
     published_at: '2025-11-20',
     is_pinned: false,
     content: `
       Работа над новым проектом идет полным ходом.
       Скоро будут новости!
     `,
     media: []
   }*/
];