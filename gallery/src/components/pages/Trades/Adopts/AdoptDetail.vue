<template>
    <div class="adopt-page" v-if=this.adoptData>
        <div class="hero-bg" :style="heroStyle">
            <div class="hero-inner">
                <img :src="this.adoptData.previewImage" alt="preview" class="hero-art" />
                <div class="meta">
                    <h1 class="name">{{ this.adoptData.title }}</h1>
                    <p class="by">Автор: <strong>{{ this.adoptData.userName }}</strong></p>
                    <p class="short">{{ this.adoptData.short }}</p>
                    <div class="actions">
                        <button @click="openGallery(0)">Открыть галерею</button>
                        <button @click="focusBid">Сделать ставку</button>
                    </div>
                </div>
            </div>
        </div>

        <main class="content">
            <section class="adopt-panel preview" :style="panelRandomStyle(0)">
                <h2 class="adopt-panel-title">Описание</h2>
                <div>{{ this.adoptData.description }}
                </div>
            </section>

            <section class="adopt-panel gallery" :style="panelRandomStyle(1)">
                <h2 class="adopt-panel-title">Галерея</h2>
                <div class="thumbs">
                    <div v-for="(img, i) in gallery" :key="i" class="thumb" @click="openGallery(i)"
                        :style="thumbStyle(i)">
                        <img :src="img" :alt="`img-${i}`" />
                    </div>
                </div>
            </section>

            <section class="adopt-panel comments" :style="panelRandomStyle(2)">
                <h2 class="panel-title">Комментарии</h2>
                <div class="comment-list">
                    <div v-for="(c, i) in comments" :key="i" class="comment">
                        <div class="author">{{ c.userName }} в {{ c.datetime }}</div>
                        <div class="text mt-20">{{ c.comment }}</div>
                    </div>
                </div>
                <div class="comment-form">
                    <input v-model="newComment" placeholder="Оставить комментарий..." @keyup.enter="postComment" />
                    <button @click="postComment">Отправить</button>
                </div>
            </section>

            <section class="adopt-panel bids" :style="panelRandomStyle(3)">
                <h2 class="adopt-panel-title">Ставки</h2>
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

<script>
import { ref, reactive, computed } from 'vue';
import axios from 'axios';
const pointer = reactive({ x: 0, y: 0 })

export default {
    data() {
        return {
            adoptData: null,
            comments: [],
            gallery: [],
            newComment: '',
            modal: reactive({ open: false, index: 0 }),
            panelSeeds: Array.from({ length: 8 }).map(() => ({ r: this.rand(-6, 6), t: this.rand(-8, 8) }))

        }
    },
    methods: {
        openGallery(i = 0) {
            modal.open = true
            modal.index = i
            // small delay to allow CSS entrance
            requestAnimationFrame(() => { })
        },
        closeGallery() { modal.open = false },
        nextImage() { modal.index = (modal.index + 1) % gallery.length },
        prevImage() { modal.index = (modal.index - 1 + gallery.length) % gallery.length },

        async getComments() {
            try {
                const adoptId = this.$route.params.id;
                const response = await axios.get('https://furry-world.ru/console/adopts/comments/get_comments.php?id=' + adoptId, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                if (response.data && response.data.success !== false) {
                    // Обрабатываем разные форматы ответа
                    if (Array.isArray(response.data)) {
                        this.comments = response.data;
                    } else if (response.data.comments) {
                        this.comments = response.data.comments;
                    } else if (response.data.data) {
                        this.comments = response.data.data;
                    } else {
                        this.comments = [];
                    }
                }
            } catch (error) {
                console.log('Error fetching comments:', error);
                this.comments = [];
            }
        },
        async postComment() {
            const text = this.newComment && this.newComment.trim();
            if (!text) return;

            try {
                const adoptId = this.$route.params.id;
                const response = await axios.post('https://furry-world.ru/console/adopts/comments/post_comment.php', {
                    text: text,
                    id: adoptId
                }, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                        "Content-Type": "application/json"
                    }
                });

                if (response.data && response.data.success !== false) {
                    // Очищаем поле ввода
                    this.newComment = '';
                    // Обновляем список комментариев
                    await this.getComments();
                } else {
                    console.log('Error posting comment:', response.data);
                }
            } catch (error) {
                console.log('Error posting comment:', error);
            }
        },

        placeBid() {
            const val = Number(newBid.value)
            if (!val || val <= 0) return
            bids.value.unshift({ user: 'Вы', amount: val })
            newBid.value = null
        },

        focusBid() { bidInput.value && bidInput.value.focus() },

        // Parallax / floatiness
        onPointerMove(e) {
            const { clientX, clientY } = e
            const w = window.innerWidth
            const h = window.innerHeight
            pointer.x = (clientX / w - 0.5) * 30
            pointer.y = (clientY / h - 0.5) * 20
        },
        resetPointer() { pointer.x = 0; pointer.y = 0 },

        // Chaotic panel offsets generator
        rand(min = -6, max = 6) { return Math.random() * (max - min) + min },
        panelRandomStyle(i) {
            /* const s = panelSeeds[i] || { r: 0, t: 0 }
             return {
               transform: `rotate(${s.r}deg) translateY(${s.t}px)`,
               transition: 'transform 0.6s cubic-bezier(.2,.8,.3,1)'
             }*/
        },

        thumbStyle(i) {
            const tilt = (i - 1) * 1
            const scale = 0.95 + Math.abs(Math.sin(i)) * 0.08
            return { transform: `rotate(${tilt}deg) scale(${scale})`, transition: 'transform .25s ease' }
        },
        async getAdoptData() {
            try {
                const response = await axios.get('https://furry-world.ru/console/adopts/get_adopts_detail.php?id=' + this.$route.params.id + '&code=' + this.$route.params.adoptcode); // Example API endpoint
                this.adoptData = response.data;
                this.gallery = this.adoptData.gallery;
                // Получаем комментарии отдельно
                await this.getComments();
            } catch (error) {
                console.log('Error fetching adopt data:', error);
            }
        },

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
        this.getAdoptData();
        setInterval(() => {
            this.panelSeeds.forEach(p => { p.r += this.rand(-0.6, 0.6); p.t += this.rand(-1, 1) })
        }, 2500)
    }
}

</script>
