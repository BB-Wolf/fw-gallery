import { reactive } from 'vue'
import axios from 'axios'
import { isMobile } from 'mobile-device-detect'

export const modalState = reactive({
  isModalLoginVisible: false,
  isModalRegisterVisible: false,
  isModalUploadVisible: false
})

export const mobileDevice = reactive({ isMobile })
export const isUserLogged = reactive({
  userLogged: !!localStorage.getItem('token'),
  async validate() {
    const tokenRequest = axios.get(
      '//img-fw.bb-wolf.site/console/get_validate_token.php?token=' + localStorage.getItem('token')
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
