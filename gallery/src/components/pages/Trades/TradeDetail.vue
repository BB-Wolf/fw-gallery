<template>
    <div class="adopt-page" v-if="tradeData">
        <div class="hero-bg" :style="heroStyle">
            <div class="hero-inner">
                <img :src="tradeData.previewImage" alt="preview" class="hero-art" />
                <div class="meta">
                    <h1 class="name">{{ tradeData.title }}</h1>
                    <p class="by">Автор: <strong>{{ tradeData.userName }}</strong></p>
                    <p class="short">{{ tradeData.short }}</p>
                    <div class="actions">
                        <button @click="openGallery(0)">Открыть галерею</button>
                    </div>
                </div>
            </div>
        </div>

        <main class="content">
            <section class="adopt-panel preview">
                <h2 class="adopt-panel-title">Описание</h2>
                <div v-html="tradeData.description"></div>
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
        },
        resetPointer() {
            pointer.x = 0;
            pointer.y = 0;
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
    }
}
</script>

<style scoped>
.adopt-page {
    min-height: 100vh;
    background: #1a1a1a;
    color: #eee;
    padding-bottom: 50px;
}

.hero-bg {
    padding: 28px 40px;
    overflow: visible;
    perspective: 900px;
    background: linear-gradient(135deg, rgba(20, 20, 20, 0.8), rgba(40, 40, 40, 0.8));
    border-radius: 20px;
    margin-bottom: 30px;
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
    font-size: 1.2rem;
}

.short {
    margin: 8px 0 12px;
    opacity: .9;
}

.actions {
    margin-top: 20px;
    display: flex;
    gap: 15px;
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
    font-weight: bold;
}

.content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 24px;
    margin: 0 auto;
}

.adopt-panel {
    background: #292929;
    padding: 24px;
    border-radius: 10px;
    border: 2px solid rgba(255, 255, 255, 0.03);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.adopt-panel-title {
    font-weight: 700;
    margin-bottom: 15px;
    color: #ffd;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 2px;
    border-bottom: 2px solid #ff9a3c;
    display: inline-block;
}

.thumbs {
    display: flex;
    flex-wrap: wrap;
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
    top: -40px;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 30px;
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

@media (max-width:900px) {
    .content {
        grid-template-columns: 1fr;
    }

    .hero-inner {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .hero-art {
        width: 160px;
        height: 160px;
    }
}
</style>
