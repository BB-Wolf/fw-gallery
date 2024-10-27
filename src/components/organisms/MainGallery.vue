<template>
    <div class="section" id="latest-images">
        <a :href="galleryUrl" class="h2">{{ galleryTitle }}</a>
        <div class="image-grid">
            <div class="image-item" v-for="galleryImage in newImages" v-bind:key="galleryImage.id">
                <a :href="galleryImage.link">
                    <Image imageClass="slide" :imageSrc=galleryImage.picture
                        :imageTitle="galleryImage.title + ' от ' + galleryImage.userName" imageAlt="">
                    </Image>
                </a>
                <div class="image-item__hover">
                    <div class="image-item__author"><a :href="galleryImage.link">{{ galleryImage.title }}</a></div>
                    <div class="image-item__title"><b>Автор:</b> {{ galleryImage.userName }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Image from '../atoms/Image.vue';

export default {
    components: {
        Image
    },
    props: {
        galleryTitle: {
            type: String,
            default: 'Галерея'
        },
        galleryUrl: String,
        galleryType:
        {
            type: String,
            default: 'new'
        }
    },
    data() {
        return {
            newImages: null
        }
    },
    async created() {
        const gallery = await new axios.get('//img-fw.bb-wolf.site/console/get_gallery_picture.php');
        if (gallery.data) {
            this.newImages = gallery.data;
        }

    },
}

</script>

<style scoped>
.image-grid {
    gap: 90px;
}

.image-item {
    width: 480px;
    overflow: hidden;
    position: relative;

}

.image-item:hover>.image-item__hover {
    bottom: 0px;
}

.image-item__hover {
    display: flex;
    position: absolute;
    bottom: -1000px;
    background-color: rgba(0, 0, 0, .4);
    max-width: 460px;
    width: 100%;
    margin: 0 auto;
    height: auto;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    color: white;
    transition: bottom 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.image-item a {
    color: white;
    font-weight: bold;
}
</style>