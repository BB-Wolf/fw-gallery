<template>
    <div class="comics-container" style="justify-content: flex-start;">
        <div class="h2">Новые выпуски комиксов</div>
    </div>
    <swiper-container :slides-per-view="8" :space-between="spaceBetween" :centered-slides="false" :pagination="false"
        :breakpoints="{
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
        <swiper-slide v-for="slide in 10" :key="slide">
            <div class="card">
                <div class="card__face card__face--front">
                    <img src="https://i.loli.net/2019/11/16/FLnzi5Kq4tkRZSm.jpg" />
                </div>
                <div class="card__face--overlay">
                    <div class="card__title">Комикс 1</div>
                    <a class="card__link" href="">Перейти к комиксу</a>
                </div>
            </div>
        </swiper-slide>
    </swiper-container>
</template>

<script>

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
    height: 100%;
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
    max-width: 100%;
    -o-object-fit: cover;
    object-fit: cover;
}

.card__face--overlay {
    top: -800px !important;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    height: max-content
}

.card__title {
    padding: 20px 15px 0px 15px;
    font-weight: bold
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
    padding: 40px 15px 0px 15px;

}

swiper-container {
    height: 420px;
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
        width: 100%;
    }

}
</style>