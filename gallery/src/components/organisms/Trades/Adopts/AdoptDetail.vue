<template>
  <div class="adopt-page">
    <div class="hero-bg" :style="heroStyle">
      <div class="hero-inner">
        <img :src="preview" alt="preview" class="hero-art" />
        <div class="meta">
          <h1 class="name">{{ name }}</h1>
          <p class="by">Автор: <strong>{{ author }}</strong></p>
          <p class="short">{{ description }}</p>
          <div class="actions">
            <button @click="openGallery(0)">Открыть галерею</button>
            <button @click="focusBid">Сделать ставку</button>
          </div>
        </div>
      </div>
    </div>

    <main class="content">
      <section class="panel preview" :style="panelRandomStyle(0)">
        <h2 class="panel-title">Описание</h2>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus dolor officia ullam magnam, cum, modi
          et eum numquam tenetur, sint odit reprehenderit tempore cumque. Eaque quos natus totam delectus officia.
        </div>
      </section>

      <section class="panel gallery" :style="panelRandomStyle(1)">
        <h2 class="panel-title">Галерея</h2>
        <div class="thumbs">
          <div v-for="(img, i) in gallery" :key="i" class="thumb" @click="openGallery(i)" :style="thumbStyle(i)">
            <img :src="img" :alt="`img-${i}`" />
          </div>
        </div>
      </section>

      <section class="panel comments" :style="panelRandomStyle(2)">
        <h2 class="panel-title">Комментарии</h2>
        <div class="comment-list">
          <div v-for="(c, i) in comments" :key="i" class="comment">
            <div class="author">{{ c.user }}</div>
            <div class="text">{{ c.text }}</div>
          </div>
        </div>
        <div class="comment-form">
          <input v-model="newComment" placeholder="Оставить комментарий..." @keyup.enter="postComment" />
          <button @click="postComment">Отправить</button>
        </div>
      </section>

      <section class="panel bids" :style="panelRandomStyle(3)">
        <h2 class="panel-title">Ставки</h2>
        <div class="prices-info" v-if="prices">
          <div v-if="prices.min > 0">Мин. ставка: <strong>{{ prices.min }} ₽</strong></div>
          <div v-if="prices.fix > 0">Фикс. цена: <strong>{{ prices.fix }} ₽</strong></div>
          <div v-if="prices.ab > 0">Автовыкуп: <strong>{{ prices.ab }} ₽</strong></div>
        </div>
        <div class="bid-list">
          <div v-for="(b, i) in bids" :key="i" class="bid">
            <span class="who">{{ b.user }}</span>
            <span class="amount">{{ b.amount }}₽</span>
          </div>
        </div>
        <div class="bid-form">
          <input ref="bidInput" v-model.number="newBid" type="number" placeholder="Ваша ставка" />
          <button @click="placeBid">Сделать ставку</button>
        </div>
      </section>
    </main>

    <!-- Gallery modal -->
    <div v-if="modal.open" class="modal" @click.self="closeGallery">
      <button class="close" @click="closeGallery">✕</button>
      <div class="modal-inner">
        <button class="nav prev" @click.stop="prevImage">‹</button>
        <img :src="gallery[modal.index]" class="modal-img" :alt="`modal-${modal.index}`" />
        <button class="nav next" @click.stop="nextImage">›</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const loading = ref(true)
const adopt = ref(null)

// Data refs
const preview = ref('')
const name = ref('')
const author = ref('')
const description = ref('')
const fullDescription = ref('')
const prices = ref({ fix: 0, min: 0, ab: 0 })
const gallery = ref([])

// UI state
const comments = ref([])
const bids = ref([])

const newComment = ref('')
const newBid = ref(null)
const bidInput = ref(null)

const modal = reactive({ open: false, index: 0 })

const adoptId = route.params.id
const adoptCode = route.params.code // Assuming route has code, or we just use ID

async function fetchAdopt() {
  try {
    const response = await axios.get(`//furry-world.ru/console/adopts/get_adopts_detail.php?id=${adoptId}&code=${adoptCode || ''}`)
    const data = response.data

    if (data.error) {
      console.error(data.error)
      return
    }

    adopt.value = data
    name.value = data.title
    author.value = data.userName || 'Unknown'
    description.value = data.short || '' // Short desc
    fullDescription.value = data.description || ''
    preview.value = data.preview
    prices.value = data.prices || { fix: 0, min: 0, ab: 0 }

    // Gallery - mostly placeholder logic in backend for now, but if image is there:
    if (data.picture) {
      gallery.value = [data.picture]
    }

    loading.value = false
  } catch (e) {
    console.error(e)
    loading.value = false
  }
}

function openGallery(i = 0) {
  modal.open = true
  modal.index = i
  requestAnimationFrame(() => { })
}
function closeGallery() { modal.open = false }
function nextImage() { modal.index = (modal.index + 1) % gallery.value.length }
function prevImage() { modal.index = (modal.index - 1 + gallery.value.length) % gallery.value.length }

function postComment() {
  const text = newComment.value && newComment.value.trim()
  if (!text) return
  comments.value.unshift({ user: 'Вы', text })
  newComment.value = ''
}

function placeBid() {
  const val = Number(newBid.value)
  if (!val || val <= 0) return
  bids.value.unshift({ user: 'Вы', amount: val })
  newBid.value = null
}

function focusBid() { bidInput.value && bidInput.value.focus() }

// Parallax / floatiness
const pointer = reactive({ x: 0, y: 0 })
function onPointerMove(e) {
  // ... existing logic if you want to keep mouse tracking, 
  // but usually needs window listener or container listener
}

const heroStyle = computed(() => ({
  // transform: ... (simplified for now as pointer logic wasn't fully hooked up in template)
  transition: 'transform 0.12s linear'
}))

function panelRandomStyle(i) { }
function thumbStyle(i) { }

onMounted(() => {
  fetchAdopt()
})
</script>
