<template>
    <div class="section" id="latest-images">
        <a :href="galleryUrl" class="h2">{{ galleryTitle }}</a>
        <div class="gallery-wrapper">
            <masonry-wall v-if="newImages" :items="newImages" :min-columns="minColumns" :max-columns="maxColumns"
                :column-width="300" :gap="10">
                <template #default="{ item, index }">
                    <div class="gallery-item">
                        <div class="gallery-item__hover--top">
                            <div class="fav-bookmark" :class="[{ ['fav-bookmark--active']: item.isFav }]"
                                @click="saveToFav($event.target, item.id)">
                                <svg fill="#000000" width="60px" height="60px" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z" />
                                </svg>
                            </div>
                        </div>
                        <a :href="item.link">
                            <Image imageClass="slide" :imageSrc=item.preview
                                :imageTitle="item.title + ' от ' + item.userName" imageAlt="">
                            </Image>
                        </a>
                        <div class="gallery-item__hover">
                            <div class="gallery-item__author"><a :href="item.link">{{ item.title
                                    }}</a></div>
                            <div class="gallery-item__title"><b>Автор:</b> <a
                                    :href="'/gallery/author/' + item.userName">{{
                                        item.userName }}</a></div>
                        </div>
                    </div>
                </template>
            </masonry-wall>
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

<script>
import axios from 'axios';
import Image from '../atoms/Image.vue';
import MasonryWall from '@yeger/vue-masonry-wall'
import { mobileDevice } from '@main/state';

export default {
    components: {
        Image,
        MasonryWall
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
        },
        needInfinty: {
            type: String,
            default: 'n'
        },
    },
    methods: {
        async saveToFav(elm, id) {
            const addImg = await axios.get('//furry-world.ru/console/get_save_to_fav.php?id=' + id,
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
                }
            );
            if (addImg.data) {
                elm.parentNode.parentNode.classList.toggle('fav-bookmark--active');
            } else {
                // handle global notifications
            }
        },
        onLoadMore() {
            window.onscroll = async () => {
                if (!this.isLoading) {
                    let scrollPosition = document.documentElement.scrollTop + window.innerHeight;
                    let threshold = document.documentElement.offsetHeight - 900;
                    let bottomOfWindow = scrollPosition >= threshold;

                    if (bottomOfWindow && !this.isFinish) {
                        this.isLoading = true;
                        document.querySelector('.wait-container').classList.add('wait-container--active');

                        const getMore = await axios.get('//furry-world.ru/console/get_gallery_picture.php?offset=' + this.offset);

                        if (getMore.data) {
                            if (getMore.data.length === 0) {
                                this.isFinish = true;
                            }

                            this.offset += 1;
                            var currentImages = this.newImages;
                            this.newImages = [...currentImages, ...getMore.data];
                        }

                        document.querySelector('.wait-container').classList.remove('wait-container--active');
                        this.isLoading = false;
                    }
                }
            };
        }
    },
    data() {
        return {
            newImages: null,
            offset: 2,
            isFinish: false,
            isLoading: false,
            isUserMobile: mobileDevice,
            minColumns: 0,
            maxColumns: 0,
        }
    },
    async created() {
        if (!mobileDevice) {
            this.minColumns = 4;
            this.maxColumns = 5;
        } else {
            this.minColumns = 0;
            this.maxColumns = 0;
        }
        const gallery = await new axios.get('//furry-world.ru/console/get_gallery_picture.php',
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

    },
    mounted() {
        if (this.needInfinty == 'y') {

            this.onLoadMore();

        }
    }
}

</script>
