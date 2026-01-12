<template>
    <div class="section" id="latest-images">
        <a :href="galleryUrl" class="h2">{{ galleryTitle }}</a>
        <div class="gallery-wrapper">
            <masonry-wall v-if="worksList" :items="worksList" :column-width="300" :gap="16">
                <template #default="{ item }">
                    <div class="gallery-item">
                        <a :href="item.link">
                            <Image imageClass="slide" :imageSrc=item.picture
                                :imageTitle="item.title + ' от ' + item.userName" imageAlt="">
                            </Image>
                        </a>
                        <div class="gallery-item__hover">
                            <div class="gallery-item__author"><a :href="item.link">{{ item.title
                            }}</a></div>
                            <div class="gallery-item__title"><b>В избранном: </b> {{ item.likes }}
                                <p></p>
                                <b>Просмотров:</b> {{ item.watches }}
                            </div>
                        </div>
                    </div>
                </template>
            </masonry-wall>
            <div class="wait-container" style="margin:0 auto;">
                <div class="lds-roller" v-if="!this.worksList">
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
import MasonryWall from '@yeger/vue-masonry-wall';
import Image from '../atoms/Image.vue';

export default {
    components: {
        Image,
        MasonryWall
    },
    data() {
        return {
            worksList: []
        }
    },
    async mounted() {
        let getWorks = await new axios('https://furry-world.ru/console/stats/get_image_details.php',
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            }
        );
        if (getWorks.data) {
            this.worksList = getWorks.data;
        }
    },
}
</script>

