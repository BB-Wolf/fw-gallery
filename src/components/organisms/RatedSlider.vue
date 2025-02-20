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
    <div class="h2">Изображения в палитре дня</div>
    <ul class="rated-slider" v-if="sliders">
        <li class="rated-slide" v-for="slide in sliders" :key="slide">
            <a :href="slide.link">
                <Image imageClass="slide" :imageSrc=slide.picture imageTitle="" imageAlt="">
                </Image>
            </a>
        </li>
    </ul>
</template>
<style scoped></style>