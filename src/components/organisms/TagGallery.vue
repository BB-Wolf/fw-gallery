<template>
    <div class="section" id="latest-images">
        <a :href="galleryUrl" class="h2">{{ galleryTitle }}</a>
        <div class="image-grid">
            <div class="image-item" v-for="galleryImage in newImages" v-bind:key="galleryImage.id">
                <div class="image-item__hover--top">
                    <div class="image-item__author" style="height:0px; position: relative;">
                        <div class="fav-bookmark" @click="saveToFav($event.target, galleryImage.id)"></div>

                    </div>
                </div>
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

export default {
    components: {
        Image,

    },
    props: {
        galleryTitle: {
            type: String,
            default: 'Галерея'
        },
        galleryUrl: String,
    },
    methods: {
        async saveToFav(elm, id) {
            const addImg = await axios.get('//furry-world.ru/console/get_save_to_fav.php?id=' + id);
            if (addImg.data) {
                elm.classList.toggle('fav-bookmark--active');
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
                    const getMore = await axios.get('//furry-world.ru/console/get_gallery_picture.php?offset=' + this.offset)+'&tag='+this.$route.params.tag;
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
    async mounted() {
        const gallery = await new axios.get('//furry-world.ru/console/get_gallery_picture.php?tag='+this.$route.params.tag,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            }
        );
        if (gallery.data) {
            this.newImages = gallery.data;
        }

        this.onLoadMore();
    }
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

.fav-bookmark {
    width: 40px;
    height: 120px;
    background-color: rgba(255, 0, 0, 0.3);
    position: absolute;
    right: 10px;
    cursor: pointer;
}

.fav-bookmark:hover {
    background-color: rgba(255, 0, 0, 0.7);
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.365, 1);

}

.fav-bookmark--active {
    background-color: red;
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

.wait-container {
    flex: 100%;
    text-align: center;
    display: none;
}

.wait-container--active {
    display: block;
}



.lds-roller div:after {
    content: ' ';
    display: block;
    position: absolute;
    width: 7.2px;
    height: 7.2px;
    border-radius: 50%;
    background: rgb(149 149 149);
    margin: -3.6px 0 0 -3.6px;
}
</style>