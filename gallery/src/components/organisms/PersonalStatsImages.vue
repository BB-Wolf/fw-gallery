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

<style scoped>
.h2 {
    padding-left: 20px;
}

.gallery-wrapper {
    padding: 0 20px;
    margin: 0 auto;
}

.gallery-grid {
    /* columns: 250px;
    column-gap: 20px; */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 20px;

}

.gallery-item {
    width: 300px;
    position: relative;
    overflow: hidden;
    box-shadow: 0px 0px 10px 1px rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    height: fit-content;

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

    .gallery-wrapper {
        padding: 0;
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