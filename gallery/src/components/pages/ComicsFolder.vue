<template>
  <div class="comics-folder-container">
    <div class="comics-title">
      <div class="h2">{{ this.comics.name }}</div>
    </div>
    <div class="comics">
      <div class="comics-wrapper">
        <div class="comics-image-preview">
          <img :src="this.comics.picture" class="comics-image-preview comics-image">
        </div>
        <div class="comics-description">
          {{ this.comics.description }}
          <a v-if="this.comics.totalImages > 0"
            :href="'/comics/' + this.$route.params.author + '/' + this.$route.params.name + '/' + this.comics.firstPage + '/'"
            class="btn btn--primary mt-20" style="display: block; color: white">Начать чтение</a>
        </div>
      </div>
    </div>

    <div class="pagination mt-20" v-if="this.comics.totalImages > 0">
      <div class="pagination-wrapper">
        <div class="pagiation-title">Перейти к странице</div>
        <div class=" tags-scroll">
          <div class="tags-wrapper">
            <div class="tag-container">
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

  </div>
  <div class="comics-folder-container">
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
import { notifications } from '@main/state'
import Seo from '@main/api/seo/Seo.js';

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
    let pageUrl = new URL('https://furry-world.ru/console/comics/get_comics_folder.php');
    pageUrl.searchParams.append('author', this.$route.params.author);
    pageUrl.searchParams.append('code', this.$route.params.name);
    let getComicsData = await new axios.get(
      pageUrl
    )
    if (getComicsData.data && getComicsData.data.status != 'error') {
      this.comics = getComicsData.data
      let pageTitle = 'Фурри Мир. Комикс ' + getComicsData.data.name + ' от ' + this.$route.params.author;
      Seo.setPageSeo(pageTitle,
        ' Комикс ' + getComicsData.data.name + ' ' + getComicsData.data.description,
        this.$route.params.author,
        '',
      );
      Seo.setPageCanonical('/comics/' + this.$route.params.author + '/' + this.$route.params.name);
    } else {
      notifications.generateNotification('bad', 'Ошибка получения данных');
      //   window.location.href = '//furry-world.ru/gallery/comics/';
    }
  }
}
</script>

<style scoped>
.comics-folder-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.comics-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comics-image-preview {
  width: 100%;
  max-width: 100%;
}

.comics-image {
  width: 100%;
  height: auto;
  object-fit: contain;
}
</style>
