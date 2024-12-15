<template>
    <div class="section" id="latest-images">
        <a :href="galleryUrl" class="h2">{{ galleryTitle }}</a>
        <div class="gallery-wrapper">
            <div class="gallery-grid">
                <div class="gallery-item" v-for="galleryImage in newImages" :key="galleryImage.id" style="order:0">
                    <div class="gallery-item__hover--top">
                        <div class="fav-bookmark" @click="saveToFav($event.target, galleryImage.id)">
                            <svg fill="#000000" width="60px" height="60px" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z" />
                            </svg>
                        </div>
                    </div>
                    <a :href="galleryImage.link">
                        <Image imageClass="slide" :imageSrc=galleryImage.picture
                            :imageTitle="galleryImage.title + ' от ' + galleryImage.userName" imageAlt="">
                        </Image>
                    </a>
                    <div class="gallery-item__hover">
                        <div class="gallery-item__author"><a :href="galleryImage.link">{{ galleryImage.title
                                }}</a></div>
                        <div class="gallery-item__title"><b>Автор:</b> <a :href="'/author/' + galleryImage.userName">{{
                            galleryImage.userName }}</a></div>
                    </div>
                </div>
            </div>
            <div class="wait-container" style="margin:0 auto;">
                <div class="lds-roller" v-if="!this.responseData">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.h2 {
    padding-left: 20px;
}

.gallery-wrapper {
    max-width: 95%;
    margin: 0 auto;
}

.gallery-grid {
    /* columns: 250px;
    column-gap: 20px; */
    display:grid;
    grid-template-columns: repeat(auto-fit,minmax(250px,1fr));
    grid-gap:20px;

}

.gallery-item {
    width: 300px;
    position: relative;
    overflow: hidden;
    box-shadow: 0px 0px 10px 1px rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    height:fit-content;

}

.gallery-item img {
    max-width: 100%;
    object-fit: cover;

}

.gallery-item__hover--top,
.gallery-item__hover {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    width: 100%;
    text-align: center;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.gallery-item__hover--top {
    top: -1000px;
}

.gallery-item__hover {
    bottom: -1000px;

}

.gallery-item:hover>.gallery-item__hover--top {
    top: -10px;
}


.gallery-item:hover>.gallery-item__hover {
    bottom: 0;
}

.gallery-item__hover a {
    color: white;
}

@media only screen and (max-width:600px) {
    .gallery-item {
        width: 100%;
    }
}

.wait-container {
    flex: 100%;
    text-align: center;
    display: none;
}

.wait-container--active {
    display: block;
}
</style>
<script>
import axios from 'axios';
import Image from '../atoms/Image.vue';
import { VueMasonryPlugin } from "vue-masonry/src/masonry-vue3.plugin";

export default {
    components: {
        Image,VueMasonryPlugin 
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
            const addImg = await axios.get('//img-fw.bb-wolf.site/console/get_save_to_fav.php?id=' + id);
            if (addImg.data) {
                elm.parentNode.parentNode.classList.toggle('fav-bookmark--active');
                //
            } else {
                // handle global notifications
            }
        },
        onLoadMore() {
            window.onscroll = async () => {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                if (bottomOfWindow && !this.isFinish) {
                    document.querySelector('.wait-container').classList.add('wait-container--active');
                    const getMore = await axios.get('//img-fw.bb-wolf.site/console/get_gallery_picture.php?offset=' + this.offset);
                    if (getMore.data) {
                        if (getMore.data.length == 0) {
                            this.isFinish = true;
                        }
                        this.offset += 1;
                        var currentImages = this.newImages;
                        this.newImages = [...currentImages, ...getMore.data];
                        document.querySelector('.wait-container').classList.remove('wait-container--active');
                    }
                }
            }
        }
    },
    data() {
        return {
            newImages: null,
            offset: 2,
            isFinish: false
        }
    },
    async created() {
        const gallery = await new axios.get('//img-fw.bb-wolf.site/console/get_gallery_picture.php',
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            }
        );
        if (gallery.data) {
            this.newImages = gallery.data;
        }
        let images = document.querySelectorAll(".gallery-item");
        for(let i = 0; i < images.length; i++) {
            if(images[i].clientHeight < 300)
            {
                images[i].style.transform = "translate(0,-" + 300 - images[i].clientHeight + ")"
            }   
        }
    },
    mounted() {
        this.onLoadMore();
    }
}

</script>
