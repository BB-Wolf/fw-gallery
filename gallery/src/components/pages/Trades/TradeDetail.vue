<template>
    <div class="adopt-page" v-if="this.tradeData">
        <div class="hero-bg" :style="heroStyle">
            <div class="hero-inner">
                <img :src="this.tradeData.previewImage" alt="preview" class="hero-art" />
                <div class="meta">
                    <h1 class="name">{{ this.tradeData.title }}</h1>
                    <p class="by">Автор: <strong>{{ this.tradeData.userName }}</strong></p>
                    <p class="short">{{ this.tradeData.short }}</p>
                    <div class="actions">
                        <button @click="openGallery(0)">Открыть галерею</button>
                    </div>
                </div>
            </div>
        </div>

        <main class="content">
            <section class="adopt-panel preview">
                <h2 class="adopt-panel-title">Описание</h2>
                <div v-html="this.tradeData.description"></div>
            </section>

            <section class="adopt-panel gallery" v-if="gallery.length > 0">
                <h2 class="adopt-panel-title">Галерея</h2>
                <div class="thumbs">
                    <div v-for="(img, i) in gallery" :key="i" class="thumb" @click="openGallery(i)"
                        :style="thumbStyle(i)">
                        <img :src="img" :alt="`img-${i}`" />
                    </div>
                </div>
            </section>

            <section class="adopt-panel info" v-if="prices">
                <h2 class="adopt-panel-title">Информация</h2>
                <div class="prices-info">
                    <div v-if="prices.min > 0">Мин. ставка: <strong>{{ prices.min }} ₽</strong></div>
                    <div v-if="prices.fix > 0">Фикс. цена: <strong>{{ prices.fix }} ₽</strong></div>
                    <div v-if="prices.ab > 0">Автовыкуп: <strong>{{ prices.ab }} ₽</strong></div>
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

<script>
import { reactive } from 'vue';
import axios from 'axios';

const pointer = reactive({ x: 0, y: 0 })

export default {
    data() {
        return {
            tradeData: null,
            gallery: [],
            prices: null,
            modal: reactive({ open: false, index: 0 }),
        }
    },
    methods: {
        openGallery(i = 0) {
            this.modal.open = true
            this.modal.index = i
        },
        closeGallery() { this.modal.open = false },
        nextImage() { this.modal.index = (this.modal.index + 1) % this.gallery.length },
        prevImage() { this.modal.index = (this.modal.index - 1 + this.gallery.length) % this.gallery.length },

        async getTradeData() {
            try {
                const response = await axios.get('https://furry-world.ru/console/trades/get_trades_detail.php?id=' + this.$route.params.id + '&code=' + this.$route.params.tradecode, {
                    headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
                });
                this.tradeData = response.data;
                this.gallery = this.tradeData.gallery || [];
                this.prices = this.tradeData.prices || { fix: 0, min: 0, ab: 0 }
            } catch (error) {
                console.log('Error fetching trade data:', error);
            }
        },
        thumbStyle(i) {
            const tilt = (i - 1) * 1
            const scale = 0.95 + Math.abs(Math.sin(i)) * 0.08
            return { transform: `rotate(${tilt}deg) scale(${scale})`, transition: 'transform .25s ease' }
        },
        onPointerMove(e) {
            const { clientX, clientY } = e
            const w = window.innerWidth
            const h = window.innerHeight
            pointer.x = (clientX / w - 0.5) * 30
            pointer.y = (clientY / h - 0.5) * 20
        }
    },
    computed: {
        heroStyle() {
            return {
                transform: `translate3d(${pointer.x / 6}px, ${pointer.y / 6}px, 0) rotateZ(${pointer.x / 20}deg)`,
                transition: 'transform 0.12s linear'
            }
        },
    },
    mounted() {
        this.getTradeData();
        window.addEventListener('mousemove', this.onPointerMove);
    },
    beforeUnmount() {
        window.removeEventListener('mousemove', this.onPointerMove);
    }
}
</script>

<style scoped>
/* Basic styles inherited or similar to AdoptDetail */
.adopt-page {
    padding-bottom: 50px;
}

.hero-bg {
    position: relative;
    padding: 60px 20px;
    background: linear-gradient(135deg, rgba(20, 20, 20, 0.8), rgba(40, 40, 40, 0.8));
    border-radius: 20px;
    margin-bottom: 30px;
    overflow: hidden;
}

.hero-inner {
    display: flex;
    gap: 40px;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

.hero-art {
    max-width: 400px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.meta .name {
    font-size: 3rem;
    margin-bottom: 10px;
}

.meta .by {
    font-size: 1.2rem;
    color: #ccc;
}

.actions {
    margin-top: 20px;
    display: flex;
    gap: 15px;
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background: #5c6bc0;
    color: white;
    cursor: pointer;
    font-weight: bold;
}

.content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.adopt-panel {
    background: rgba(255, 255, 255, 0.05);
    padding: 30px;
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.adopt-panel-title {
    margin-bottom: 20px;
    font-size: 1.5rem;
    border-bottom: 2px solid #5c6bc0;
    display: inline-block;
}

.thumbs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.thumb {
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 8px;
    cursor: pointer;
}

.thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-img {
    max-width: 90%;
    max-height: 90%;
    border-radius: 10px;
}

.close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 2rem;
    background: none;
}

.nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    font-size: 3rem;
}

.prev {
    left: 20px;
}

.next {
    right: 20px;
}
</style>
