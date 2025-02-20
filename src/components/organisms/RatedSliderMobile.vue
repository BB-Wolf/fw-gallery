<script>
import axios from 'axios';
import Image from '../atoms/Image.vue';
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();
export default
    {
        components: {
            Image
        },
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

        async created() {
            const sliders = await axios.get(`//furry-world.ru/console/get_mainpage_featured.php`);
            if (sliders.data) {
                this.sliders = sliders.data;
                if (sliders.data.length < 10 && sliders.data != '') {
                    for (let i = 1; i <= 10; i++) {
                        sliders.data.push({
                            picture: sliders.data[0].picture,
                            link: sliders.data[0].link,
                            title: ''
                        })
                    }

                }
            }
        },
        data() {
            return {
                sliders: null
            }
        },
    }
</script>

<template>
    <div class="mt-20 mb-20" style="max-height:200px;">

        <div class="h2">Изображения в палитре дня</div>
        <swiper-container :slides-per-view="3" :space-between="spaceBetween" :centered-slides="false"
            :pagination="false" :breakpoints="{
                768: {
                    slidesPerView: 6,
                },
            }" @swiperprogress="onProgress" @swiperslidechange="onSlideChange">
            <swiper-slide v-for="slide in sliders" :key="slide">
                <a :href="slide.link">
                    <Image style="max-width: 100%;max-height: 200px;" :imageSrc=slide.picture imageTitle="" imageAlt="">
                    </Image>
                </a>
            </swiper-slide>
        </swiper-container>
    </div>
</template>

<style scoped>
swiper-slide {
    max-height: 200px;
}
</style>