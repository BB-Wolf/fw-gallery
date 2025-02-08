<template>
    <section id="author-week" class="mt-20 mb-20" v-if="authorList">
        <div class="h2">Художники недели</div>
        <div class="portrait-container">
            <swiper-container :slides-per-view="3" :space-between="spaceBetween" :centered-slides="false"
                :pagination="false" :breakpoints="{
                    768: {
                        slidesPerView: 6,
                    },
                }" @swiperprogress="onProgress" @swiperslidechange="onSlideChange">
                <swiper-slide v-for="author in authorList" :key="author">
                    <div class="portrait-card">
                        <a class="portrait-border" :href="'/author/' + author.login"><img :src=author.picture>
                        </a>
                        <div class="portrait-card-author">{{ author.login }}</div>
                    </div>
                </swiper-slide>
            </swiper-container>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import { register } from 'swiper/element/bundle';
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
            authorList: null,
        }
    },
    async created() {
        const authorListGet = await new axios.get('//furry-world.ru/console/get_ranked_author_list.php');
        if (authorListGet.data) {
            this.authorList = authorListGet.data;
        }
    }
}
</script>

<style scoped>
#author-week {
    padding-left: 20px;
    padding-right: 20px;
}

.portrait-container {
    padding-top: 20px;
}

.portrait-card {
    color: white;
    text-align: center;
}

.portrait-border {
    width: 120px;
    margin-top: 10px;
    margin-left: 10px;
    height: 120px;
    border-radius: 50%;
    box-shadow: 0px 0px 1px 5px rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    overflow: hidden;

}

.portrait-border img {
    max-width: 100%;
}

.portrait-card-author {
    padding-top: 10px;
    font-weight: bold;
}
</style>