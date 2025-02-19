<template>
  <div class="comics-container">
    <div class="comics-title">
      <div class="h2">{{ this.comics.name }}</div>
    </div>
    <div class="comics-body">
      <div class="comics-layout" :style="getBackgrounds"></div>
      <div class="comics-preview">
        {{ this.comics.description }}
        <a :href="'/comics/' + this.$route.params.author + '/' + this.$route.params.name + '/' + this.comics.firstPage + '/'"
          class="btn btn--primary mt-20" style="display: block; color: white">Начать чтение</a>
      </div>
      <div class="comics-info" v-if="this.comics.listOfPreview">
        <div class="central-block">
          <div class="slide__title">Перейти к странице</div>
          <div class="slides-container">
            <div v-for="slide in this.comics.listOfPreview" :key="slide" class="pagepreview-slide"
              style="order:{{ slide.sort }}">

              <a :href="'/comics/' + this.$route.params.author + '/' + this.$route.params.name + '/' + slide.sort">
                <img :src=slide.picture />
                <span>{{ slide.sort }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="comics-container">
    <div class="comics-additions mt-20">
      <div class="left-block">
        <div class="comments-section">
          <h3>Комментарии</h3>

          <!-- Comment Box -->
          <div class="comment-box">
            <textarea placeholder="Напишите комментарий..." rows="4"></textarea>
            <button type="submit">Отправить сообщение</button>
          </div>

          <!-- Comments List -->
          <div class="comments-list">
            <div class="comment" v-for="comment in commentsData" :key="comment.id">
              <div class="comment-author">{{ comment.author }}</div>
              <div class="comment-text">{{ comment.text }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-block">
        <div class="comments-wrapper">
          <div class="publish-date">Последнее обновление: </div>
          <div class="publish-pages">Всего страниц: {{ this.comics.totalImages }}</div>
          <div class="publish-author">Автор: {{ this.comics.author }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { notifications } from '@/state'

export default {
  data() {
    return {
      comics: { description: null, name: null, picture: '' },

    }
  },
  computed: {
    getBackgrounds() {
      return {
        backgroundImage: 'url("' + this.comics.picture + '")'
      }
    }
  },
  async created() {
    let getComicsData = await new axios.get(
      '//furry-world.ru/console/get_comics_folder.php?code=' + this.$route.params.name
    )
    if (getComicsData.data) {
      this.comics = getComicsData.data
      document.title ="Фурри Мир. Комикс "+getComicsData.data.name;
    } else {
      notifications.generateNotification('bad', 'Ошибка получения данных')
    }
  }
}
</script>
<style scoped>
.comics-additions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.left-block {
  color: white;
}

.right-block {
  color: white;
}

.slides-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.pagepreview-slide a {
  display: flex;
  flex-direction: column;
  width: max-content;
}

.pagepreview-slide a span {
  text-align: center;
  color: white;
  font-size: 18px;
}

.pagepreview-slide img {
  max-width: 80px;
}

.h2 {
  padding: 10px 0px;
  font-size: 32px;
}

.comics-container {
  max-width: 100%;
  margin: 50px auto;
  background-color: #2b2b2b;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.comics-body {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.comics-layout {
  max-width: 620px;
  width: 100%;
  height: 800px;
  background-repeat: no-repeat;
  background-size: contain;
  padding: 0 15px;
  grid-area: 1 / 1 / 2 / 2;
}

.comics-preview {
  color: white;
  padding: 20px 15px;
  grid-area: 1 / 2 / 2 / 3;
}

.comics-info {
  color: white;
  font-style: normal;
  font-weight: bold;
  text-align: center;
  width: 100%;
  grid-area: 2 / 1 / 3 / 3;
}

.comics-info__wrapper {
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: repeat(3, 1fr);
}

.central-block {
  grid-area: 2 / 1 / 4 / 2;
}

@media screen and (max-width: 1200px) {
  .comics-body {
    grid-template-columns: 1fr;
    grid-area: unset !important;
  }

  .comics-layout {
    background-size: 100% auto;
    height: 50vh;
    grid-area: unset !important;
  }

  .comics-preview {
    grid-area: unset !important;
  }

  .comics-info {
    grid-area: unset;
  }

  .slides-container {
    display: grid;
    flex-direction: column;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .comics-additions {
    grid-template-columns: 1fr;
  }
}
</style>
<style>
.comments-section {
  margin: 0;
}
</style>
