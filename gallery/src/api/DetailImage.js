import axios from 'axios'

export default {
  getDetailImage(user, code, token) {
    return axios.get(
      '//furry-world.ru/console/get_detail_image.php?user=' + user + '&code=' + code,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
  }
}
