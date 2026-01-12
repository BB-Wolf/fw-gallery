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
                        <a class="card__link" :href="'/comics/' + slide.code">Перейти к комиксу</a>
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
        let getComics = await new axios.get('//img-fw.bb-wolf.site/console/get_comics_list.php');
        if (getComics.data) {
            this.activeComicsList = getComics.data;
        }
    }

}
</script>

<style scoped>
.comics-container {
    margin: 0 auto;
    padding: 0 25px;
}

.card {
    position: relative;
    width: 420px;
    height: 480px;
    color: white;
    cursor: pointer;
    transition: 1s ease-in-out;
    transform-style: preserve-3d;
    overflow: hidden;
    justify-content: center;
    align-items: center;

}

.card:hover>.card__face--overlay {
    top: 0px !important;
    transition: 0.5s ease-in-out;

}

.card .card__face {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transition: 0.5s ease-in-out;
}

.card .card__face img {
    width: 420px;
    height: 480px;
    -o-object-fit: cover;
    object-fit: cover;
    padding: 10px;
}

.card__face--overlay {
    top: -800px !important;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    width: 420px;
    height: 480px;
}

.card__title {
    padding: 20px 15px 0px 15px;
    font-weight: bold;
    font-size: 32px;
    text-align: center;
}

.card__short-desc {
    padding: 20px 15px 0 15px;
    font-weight: 600;
    font-style: italic;
}

.card__link {
    color: rgb(255, 221, 72);
    font-weight: bold;
    display: block;
    padding: 60px 15px 0px 15px;
    text-align: center;
}

swiper-container {
    height: 480px;
    padding: 0 20px;
}

@media screen and (max-width:768px) {
    swiper-container {
        height: 120px;
        padding: 0 20px;
    }

    .card__face--overlay {
        top: -800px !important;
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        height: 120px !important;
    }

}
</style>