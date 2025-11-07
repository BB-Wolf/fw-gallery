import { reactive } from 'vue'
import axios from 'axios'
import { isMobile } from 'mobile-device-detect'

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