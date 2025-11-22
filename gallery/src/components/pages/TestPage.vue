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

<style scoped>
.adopt-page {
  min-height: 100vh;
  background: #1a1a1a;
  color: #eee;
}

.hero-bg {
  padding: 28px 40px;
  overflow: visible;
  perspective: 900px;
}

.hero-inner {
  display: flex;
  gap: 24px;
  align-items: center;
}

.hero-art {
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 12px;
  border: 4px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  transform-origin: center;
}

.meta {
  max-width: 720px;
}

.name {
  margin: 0 0 6px;
  font-size: 28px;
  letter-spacing: 0.6px;
}

.by {
  margin: 0 0 8px;
  color: rgb(220, 220, 220);
}

.short {
  margin: 8px 0 12px;
  opacity: .9;
}

.actions button {
  margin-right: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  background: #ff9a3c;
  color: #1a1a1a;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(255, 154, 60, 0.15);
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 24px;
}

.panel {
  background: #292929;
  padding: 16px;
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.03);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.panel-title {
  font-weight: 700;
  margin-bottom: 12px;
  color: #ffd;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 2px;
}

.preview-img {
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
  transition: transform .35s cubic-bezier(.2, .9, .3, 1);
}

.preview-img:hover {
  transform: scale(1.02) rotate(-1deg);
}

.thumbs {
  display: flex;
  gap: 12px;
}

.thumb {
  width: 140px;
  height: 240px;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  border: 3px solid rgba(255, 255, 255, 0.03);
  box-shadow: 4px 8px 20px rgba(0, 0, 0, 0.6);
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform-origin: center;
  transition: transform .4s cubic-bezier(.2, .9, .3, 1);
}

.thumb:hover img {
  transform: scale(1.08) rotate(-2deg);
}

.comment-list {
  max-height: 200px;
  overflow: auto;
  padding-right: 8px;
}

.comment {
  padding: 8px;
  margin-bottom: 6px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent);
  border-radius: 6px;
}

.comment .author {
  font-weight: 700;
  font-size: 13px;
  color: #ffc;
}

.comment .text {
  font-size: 14px;
}

.comment-form,
.bid-form {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.comment-form input,
.bid-form input {
  flex: 1;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.03);
  padding: 8px 10px;
  color: #fff;
  border-radius: 8px;
}

.comment-form button,
.bid-form button {
  padding: 8px 12px;
  border-radius: 8px;
  background: #f0f0f0;
  border: none;
  color: #111;
  cursor: pointer;
}

.bid-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 200px;
  overflow: auto;
}

.bid {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 6px;
}

/* Modal */
.modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  z-index: 60;
}

.modal-inner {
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
}

.modal-img {
  max-width: 80vw;
  max-height: 80vh;
  border-radius: 10px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
}

.close {
  position: absolute;
  right: 8px;
  top: 8px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}

.nav {
  background: rgba(0, 0, 0, 0.3);
  border: none;
  color: #fff;
  padding: 12px 16px;
  font-size: 28px;
  border-radius: 8px;
  cursor: pointer;
}

/* responsive */
@media (max-width:900px) {
  .content {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  .panel {
    width: 90vw;
  }

  .hero-inner {
    flex-direction: column;
    align-items: flex-start
  }

  .hero-art {
    width: 160px;
    height: 160px
  }
}
</style>