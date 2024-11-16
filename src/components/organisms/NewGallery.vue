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
        var gallery;
        if (this.galleryType !== 'main') {
            gallery = await new axios.get('//img-fw.bb-wolf.site/console/get_gallery_by_type.php?type=' + this.galleryType, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
        } else {
            gallery = await new axios.get('//img-fw.bb-wolf.site/console/get_gallery_picture.php', {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
        }
        if (gallery.data) {
            this.newImages = gallery.data;
        }

    },
}

</script>