<template>
    <div class="comics-wrapper" v-show="this.activeComicsList">
        <div class="comics-container" style="justify-content: flex-start;">
            <div class="h2">Новые выпуски комиксов</div>
        </div>
        <swiper-container :slides-per-view="8" :space-between="spaceBetween" :centered-slides="false"
            :pagination="false" :breakpoints="{
                320: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 1
                },
                1024:
                {
                    slidesPerView: 4
                }
            }" @swiperprogress="onProgress" @swiperslidechange="onSlideChange">
            <swiper-slide v-for="slide in activeComicsList" :key="slide.name">
                <div class="card">
                    <div class="card__face card__face--front">
                        <img :src="slide.picture" />
                    </div>
                    <div class="card__face--overlay">
                        <div class="card__title">{{ slide.name }}</div>
                        <div class="card__short-desc">{{ slide.description }}</div>
                        <a class="card__link" :href="'/comics/' + slide.author + '/' + slide.code">Перейти к комиксу</a>
                    </div>
                </div>
            </swiper-slide>
        </swiper-container>
    </div>
</template>

<script>
import axios from 'axios';
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();
export default {
    setup() {
        const spaceBetween = 10;
        const onProgress = (e) => {
            const [swiper, progress] = e.detail;
        };

        const onSlideChange = (e) => {
            console.log('slide changed')
        }

        return {
            spaceBetween,
            onProgress,
            onSlideChange,
        };
    },
    data() {
        return {
            activeComicsList: null
        }
    },
    async mounted() {
        let getComics = await new axios.get('//furry-world.ru/console/get_comics_list.php');
        if (getComics.data) {
            this.activeComicsList = getComics.data;
        }
    }

}
</script>

