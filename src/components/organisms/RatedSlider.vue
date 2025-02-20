<script>
import axios from 'axios';
import Image from '../atoms/Image.vue';
export default
    {
        components: {
            Image
        },
        async created() {
            const sliders = await axios.get(`//furry-world.ru/console/get_mainpage_featured.php`);
            if (sliders.data) {
                this.sliders = sliders.data;
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
    <section id="featured-slider">
        <div class="h2">Изображения в палитре дня</div>
        <div class="text-muted">Совпадает 3 и более цветов с учетом небольшого отклонения</div>
        <ul class="rated-slider" v-if="sliders">
            <li class="rated-slide" v-for="slide in sliders" :key="slide">
                <a :href="slide.link">
                    <Image imageClass="slide" :imageSrc=slide.picture imageTitle="" imageAlt="">
                    </Image>
                </a>
            </li>
        </ul>
    </section>
</template>
<style scoped>
#featured-slider .text-muted {
    color: #a1a1a1;
    font-size: 14px;
    padding-left: 20px;
}
</style>