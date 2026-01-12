<template>
    <div class="section" id="latest-images">
        <a :href="galleryUrl" class="h2">{{ galleryTitle }}</a>
        <div class="gallery-wrapper">
            <masonry-wall v-if="newImages" :items="newImages" :ssr-columns="0" :column-width="300" :gap="16">
                <template #default="{ item, index }">
                    <div class="gallery-item">
                        <div class="gallery-item__hover--top">
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
        }
    },
    methods: {
        onLoadMore() {
            window.onscroll = async () => {
                if (!this.isLoading) {
                    let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                    if (bottomOfWindow && !this.isFinish) {
                        this.isLoading = true;
                        document.querySelector('.wait-container').classList.add('wait-container--active');
                        const getMore = await axios.get('//furry-world.ru/console/characters/get_adopts_list.php?offset=' + this.offset);
                        if (getMore.data) {
                            if (getMore.data.length == 0) {
                                this.isFinish = true;
                            }
                            this.offset += 1;
                            var currentImages = this.newImages;
                            this.newImages = [...currentImages, ...getMore.data];
                            document.querySelector('.wait-container').classList.remove('wait-container--active');
                            this.isLoading = false;
                        }
                    }
                }
            }
        }
    },
    data() {
        return {
            newImages: null,
            offset: 2,
            isFinish: false,
            isLoading: false,
        }
    },
    async created() {
        const gallery = await new axios.get('//furry-world.ru/console/characters/get_adopts_list.php',
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
        for (let i = 0; i < images.length; i++) {
            if (images[i].clientHeight < 300) {
                images[i].style.transform = "translate(0,-" + 300 - images[i].clientHeight + ")"
            }
        }
    },
    mounted() {
        if (this.needInfinty == 'y') {
            this.onLoadMore();
        }
    }
}

</script>
