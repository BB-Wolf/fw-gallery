<template>
  <div class="mobile-upload-page">
    <form id="mobileUpload">
      <!-- Step 1 -->
      <section v-if="step === 1" class="step">
        <h2 class="title">Загрузка изображения</h2>

        <div class="image-preview" v-if="image">
          <img :src="image" alt="preview">
        </div>

        <label class="file-input">
          <input type="file" ref="file" @change="makePreview" accept="image/*">
          <span class="btn btn--default">Выбрать изображение</span>
        </label>

        <div class="actions">
          <button type="button" class="btn btn--info" @click="nextStep" :disabled="!image">Вперед</button>
        </div>
      </section>

      <!-- Step 2 -->
      <section v-if="step === 2" class="step">
        <ModalTitle v-model="title" />
        <ModalDescription v-model="description" />

        <div class="actions">
          <button type="button" class="btn btn--primary" @click="prevStep">Назад</button>
          <button type="button" class="btn btn--info" @click="nextStep">Вперед</button>
        </div>
      </section>

      <!-- Step 3 -->
      <section v-if="step === 3" class="step">
        <ModalTags v-model="this.tags" :suggestedTags="this.suggestedTags"></ModalTags>
        <ModalCharactersMobile v-model="chars" />

        <div class="actions">
          <button type="button" class="btn btn--primary" @click="prevStep">Назад</button>
          <button type="button" class="btn btn--info" @click="nextStep">Вперед</button>
        </div>
      </section>

      <!-- Step 4 -->
      <section v-if="step === 4" class="step">
        <ModalFolders v-model="folder" />
        <ModalRate v-model="rate" />

        <div class="actions">
          <button type="button" class="btn btn--primary" @click="prevStep">Назад</button>
          <button type="button" class="btn btn--info" @click="nextStep">Вперед</button>
        </div>
      </section>

      <!-- Step 5 -->
      <section v-if="step === 5" class="step">
        <h2 class="title">Предпросмотр</h2>

        <div class="preview">
          <img :src="image" alt="preview" v-if="image">
          <div class="preview-info">
            <strong>{{ title }}</strong>
            <p>{{ description }}</p>
            <div><b>Рейтинг:</b> {{ rate }}</div>
            <div><b>Папка:</b> {{ folder }}</div>
          </div>
        </div>

        <div class="tags" v-if="tags">
          <span v-for="tag in JSON.parse(tags)" :key="tag.value" class="tag">{{ tag.value }}</span>
        </div>

        <div class="actions">
          <button type="button" class="btn btn--primary" @click="prevStep">Назад</button>
          <button type="button" class="btn btn--success" @click="finishStep" :disabled="sending">
            {{ sending ? 'Загрузка...' : 'Загрузить' }}
          </button>
        </div>
      </section>
    </form>
  </div>
</template>

<script>
import { notifications } from '@main/state.js'
import axios from 'axios'
import ModalTitle from '@gallery/components/molecules/ModalTitle.vue'
import ModalDescription from '@gallery/components/molecules/ModalDescription.vue'
import ModalRate from '@gallery/components/molecules/ModalRate.vue'
import ModalTags from '@gallery/components/molecules/ModalTags.vue'
import ModalFolders from '@gallery/components/molecules/ModalFolders.vue'
import ModalCharactersMobile from '@gallery/components/molecules/ModalCharactersMobile.vue'

export default {
  components: {
    ModalTitle,
    ModalDescription,
    ModalRate,
    ModalTags,
    ModalFolders,
    ModalCharactersMobile
  },
  data() {
    return {
      step: 1,
      image: null,
      imageRaw: null,
      title: '',
      description: '',
      tags: '',
      folder: '',
      rate: '',
      chars: '',
      sending: false,
      suggestedTags: null,
    }
  },
  methods: {
    async setSuggestionTags() {
      let formData = new FormData();
      formData.append('file', this.imageRaw);
      let request = await axios.post('//furry-world.ru/console/tools/post_tags_suggestions.php', formData, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        }
      });
      if (request.data) {
        this.suggestedTags = request.data.suggestions;
      }
    },
    makePreview(e) {
      const file = e.target.files?.[0]
      if (!file) return
      this.imageRaw = file
      this.image = URL.createObjectURL(file)
      this.setSuggestionTags();
    },
    nextStep() {
      if (this.step < 5) this.step++
    },
    prevStep() {
      if (this.step > 1) this.step--
    },
    async finishStep() {
      try {
        this.sending = true
        const formData = new FormData()
        formData.append('title', this.title)
        formData.append('description', this.description)
        formData.append('folder', this.folder)
        formData.append('tags', this.tags)
        formData.append('file', this.imageRaw)
        formData.append('rate', this.rate)

        const { data } = await axios.post('//furry-world.ru/console/post_image_create.php', formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })

        if (data.status === 'success') {
          notifications.generateNotification('good', 'Загрузка прошла успешно')
          this.step = 1
          this.image = null
        } else {
          notifications.generateNotification('bad', 'Ошибка при загрузке')
        }
      } catch (err) {
        notifications.generateNotification('bad', 'Ошибка соединения')
      } finally {
        this.sending = false
      }
    }
  }
}
</script>

<style scoped>
.mobile-upload-page {
  background: #1c1c1c;
  color: #fff;
  min-height: 100vh;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  text-align: center;
}

.image-preview {
  width: 100%;
  margin: 10px 0;
  display: flex;
  justify-content: center;
}

.image-preview img {
  max-width: 90%;
  border-radius: 12px;
  object-fit: cover;
}

.file-input {
  display: block;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}

.file-input input {
  display: none;
}

.btn {
  padding: 12px;
  border-radius: 12px;
  background: #444;
  color: white;
  border: none;
  font-size: 16px;
}

.btn--default {
  background: #555;
}

.btn--info {
  background: #0084ff;
}

.btn--primary {
  background: #6c757d;
}

.btn--success {
  background: #28a745;
}

.actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.step {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  background: #444;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 14px;
}
</style>
<style>
.title-input {
  padding: 20px;
  font-size: 17px;
}

.preview img {
  max-width: 100%;
}
</style>