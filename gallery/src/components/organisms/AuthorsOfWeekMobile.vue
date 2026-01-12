<template>
    <section id="author-week" class="mt-20 mb-20">
        <div class="h2">Художники недели</div>
        <div class="portrait-container" v-if="authorList.length != 0 && this.isLoading == false">
            <swiper-container :slides-per-view="3" :space-between="spaceBetween" :centered-slides="false"
                :pagination="false" :breakpoints="{
                    768: {
                        slidesPerView: 6,
                    },
                }" @swiperprogress="onProgress" @swiperslidechange="onSlideChange">
                <swiper-slide v-for="author in authorList" :key="author">
                    <div class="portrait-card">
                        <a class="portrait-border" :href="'/gallery/author/' + author.login"><img :src=author.picture>
                        </a>
                        <div class="portrait-card-author">{{ author.login }}</div>
                    </div>
                </swiper-slide>
            </swiper-container>
        </div>
        <div v-if="authorList.length == 0 && this.isLoading == false" class="portrait-container--empty"
            style="width:90%;justify-content: unset;">
            <div class="portrait-options-noone">
                <div class="portrait-dragon">
                    <img src="../../assets/images/drakon6.png">
                </div>
                <div>
                    <div class="h2" style="padding: 0;"> Увы, но пока здесь нет никого. </div>
                    <p class="mt-20">Как попасть в этот блок? Есть несколько способов.</p>
                    <ul style="display: flex; flex-direction: column;">
                        <li>1. Оставлять больше работ за прошлую неделю</li>
                        <li> 2. Каждый арт совпадающий с палитрой дня - приносит баллы. По результату баллов прошлого
                            дня -
                            можно
                            попасть в этот блок.</li>
                        <li>3. Участвовать в конкурсах от администрации</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import { register } from 'swiper/element/bundle';
register();
export default {
    setup() {
        const spaceBetween = 80;
        const onProgress = (e) => {
            const [swiper, progress] = e.detail;
        };

        const onSlideChange = (e) => {
        }

        return {
            spaceBetween,
            onProgress,
            onSlideChange,
        };
    },
    data() {
        return {
            authorList: [],
            isLoading: true,
        }
    },
    async created() {
        const authorListGet = await new axios.get('//furry-world.ru/console/get_ranked_author_list.php');
        if (authorListGet.data) {
            this.authorList = authorListGet.data;
        }
        this.isLoading = false;
    }
}
</script>

