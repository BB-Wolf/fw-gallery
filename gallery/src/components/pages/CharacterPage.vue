<script>
import axios from 'axios';
import MasonryWall from '@yeger/vue-masonry-wall'
import Image from '@gallery/components/atoms/Image.vue';
import { mobileDevice } from '@main/state';

export default {
    components: {
        MasonryWall,
        Image
    },
    data() {
        return {
            charData: null,
            minColumns: 4,
            responseData: false,
            offset: 1,
            isFinish: false,
            isLoading: false,

        }
    },
    async created() {
        if (mobileDevice) {
            this.minColumns = 4;
        } else {
            this.minColumns = 0;
        }
        let characterData = await new axios.get('//furry-world.ru/console/get_character_info.php?user=' + this.$route.params.owner + '&character=' + this.$route.params.character,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            }
        );
        if (characterData.data) {
            document.title = "Фурри Мир, Персонаж " + characterData.data.char.name;
            this.charData = characterData.data
            this.responseData = true;
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
                        const getMore = await axios.get('//furry-world.ru/console/get_character_info.php?user=' + this.$route.params.owner + '&character=' + this.$route.params.character + '&offset=' + this.offset);
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
    mounted() {
        this.onLoadMore();
    }
}
</script>
<template>

    <section id="character">

        <div class="character-container" v-if="this.charData">
            <!-- Character Image -->
            <img :src=this.charData.header alt="Character Image" class="character-image">

            <div class="author-image">
                <div class="author-image__border">
                    <img :src="this.charData.picture">
                </div>
            </div>
            <div class="grid-container">
                <!-- Character Info -->
                <div class="section-container">
                    <div class="character-info">
                        <h1 id="character-name">{{ this.charData.char.name }}</h1>
                        <p id="character-age">Вид: {{ this.charData.char.specie }}</p>
                        <p id="character-age">Возраст: {{ this.charData.char.age }}</p>
                        <p id="character-short-bio">{{ this.charData.char.short }}</p>
                    </div>
                </div>
                <!-- Character Full Bio -->
                <div class="section-container">

                    <div class="character-bio">
                        <h2>Полное Био</h2>
                        <p id="character-full-bio">
                            {{ this.charData.char.full }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="character-gallery">
                <div class="section-container">
                    <div class="h2">Галерея персонажа</div>
                    <div class="gallery-wrapper">
                        <masonry-wall v-if="this.charData.images" :items="this.charData.images"
                            :min-columns="this.minColumns" :column-width="300" :gap="16">
                            <template #default="{ item }">
                                <div class="gallery-item">
                                    <div class="gallery-item__hover--top">
                                    </div>
                                    <a :href="item.link">
                                        <Image imageClass="slide" :imageSrc=item.picture
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
            </div>
        </div>
    </section>

</template>

