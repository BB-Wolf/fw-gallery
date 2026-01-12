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

// Using uploaded local images (paths from upload history)
const preview = 'https://furry-world.ru/upload/characters/1/f39/9jnjku5nv7r6zte61ptg53w9vdwg6vw6/NewCanvas1sdfgsdasdafdgga.jpg'
const gallery = reactive([
  'https://furry-world.ru/upload/folder_resize/Sian/b28f941e96d2c3020c3f042fe612d7b1.png',
  'https://furry-world.ru/upload/folder_resize/Sian/56e87ebe49e3b6298454380800b0ce4e.png',
  'https://furry-world.ru/upload/folder_resize/Sian/b28f941e96d2c3020c3f042fe612d7b1.png' // placeholder — add real files if available
])

const name = 'Имя Адопта'
const author = 'Sian'
const description = 'Кусочек хаотичного описания: яркий, немного дерзкий персонаж, нарисованный вручную.'

// UI state
const comments = ref([
  { user: 'Volk', text: 'Люблю эту цветовую палитру!' },
  { user: 'Arti', text: 'Крутая анатомия, респект автору.' }
])

const bids = ref([
  { user: 'Guest42', amount: 1200 },
  { user: 'Sian', amount: 1500 }
])

const newComment = ref('')
const newBid = ref(null)
const bidInput = ref(null)

const modal = reactive({ open: false, index: 0 })

function openGallery(i = 0) {
  modal.open = true
  modal.index = i
  // small delay to allow CSS entrance
  requestAnimationFrame(() => { })
}
function closeGallery() { modal.open = false }
function nextImage() { modal.index = (modal.index + 1) % gallery.length }
function prevImage() { modal.index = (modal.index - 1 + gallery.length) % gallery.length }

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
  const { clientX, clientY } = e
  const w = window.innerWidth
  const h = window.innerHeight
  pointer.x = (clientX / w - 0.5) * 30
  pointer.y = (clientY / h - 0.5) * 20
}
function resetPointer() { pointer.x = 0; pointer.y = 0 }

const heroStyle = computed(() => ({
  transform: `translate3d(${pointer.x / 6}px, ${pointer.y / 6}px, 0) rotateZ(${pointer.x / 20}deg)`,
  transition: 'transform 0.12s linear'
}))

// Chaotic panel offsets generator
function rand(min = -6, max = 6) { return Math.random() * (max - min) + min }
const panelSeeds = Array.from({ length: 8 }).map(() => ({ r: rand(-6, 6), t: rand(-8, 8) }))
function panelRandomStyle(i) {
  /* const s = panelSeeds[i] || { r: 0, t: 0 }
   return {
     transform: `rotate(${s.r}deg) translateY(${s.t}px)`,
     transition: 'transform 0.6s cubic-bezier(.2,.8,.3,1)'
   }*/
}

function thumbStyle(i) {
  const tilt = (i - 1) * 1
  const scale = 0.95 + Math.abs(Math.sin(i)) * 0.08
  return { transform: `rotate(${tilt}deg) scale(${scale})`, transition: 'transform .25s ease' }
}

onMounted(() => {
  // gentle random wiggle to make page feel alive
  setInterval(() => {
    panelSeeds.forEach(p => { p.r += rand(-0.6, 0.6); p.t += rand(-1, 1) })
  }, 2500)
})
</script>

