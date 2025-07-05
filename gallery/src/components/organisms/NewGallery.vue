<template>
    <div class="section" id="latest-images">
        <a :href="galleryUrl" class="h2">{{ galleryTitle }}</a>
        <div class="image-grid">
            <div class="image-item" v-for="galleryImage in newImages" v-bind:key="galleryImage.id">
                <div class="image-item__hover--top">
                    <div class="fav-bookmark" @click="saveToFav($event.target, galleryImage.id)">
                        <svg fill="#000000" width="60px" height="60px" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z" />
                        </svg>
                    </div>
                </div>
                <a :href="galleryImage.link">
                    <Image imageClass="slide" :imageSrc=galleryImage.preview
                        :imageTitle="galleryImage.title + ' от ' + galleryImage.userName" imageAlt="">
                    </Image>
                </a>
                <div class="image-item__hover">
                    <div class="image-item__author"><a :href="galleryImage.link">{{ galleryImage.title
                    }}</a></div>
                    <div class="image-item__title"><b>Автор:</b> <a :href="'/author/' + galleryImage.userName">{{
                        galleryImage.userName }}</a></div>
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
    methods: {
        async saveToFav(elm, id) {
            const addImg = await axios.get('//furry-world.ru/console/get_save_to_fav.php?id=' + id, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            if (addImg.data) {
                elm.parentNode.parentNode.classList.toggle('fav-bookmark--active');
                //
            } else {
                // handle global notifications
            }
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
            gallery = await new axios.get('//furry-world.ru/console/get_gallery_by_type.php?type=' + this.galleryType, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
        } else {
            gallery = await new axios.get('//furry-world.ru/console/get_gallery_picture.php', {
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



<style scoped>
.image-grid {
    gap: 10px;
}

.image-item {
    width: 480px;
    overflow: hidden;
    position: relative;

}

.image-item:hover>.image-item__hover {
    bottom: 0px;
}

.image-item:hover>.image-item__hover--top {
    bottom: unset;
    top: -50px;
}

.image-item__hover--top:hover {
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.365, 1);
    top: -10px !important;
}

.image-item__hover,
.image-item__hover--top {
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
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}




.image-item a {
    color: white;
    font-weight: bold;
}
</style>