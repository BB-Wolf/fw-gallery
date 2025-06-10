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
<style scoped>
.section-container,
.character-gallery {
    width: 100%;
    max-width: 1900px;
    margin: 0 auto;
    padding: 20px;
}

.grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 20px;
    padding: 20px;
    width: 100%;
}

.character-container {
    width: 100%;
    max-width: 1900px;
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    color: white;
}

.character-image {
    width: 100%;
    max-height: 600px;
    height: 600px;
    object-fit: cover;
    object-position: 0% 10%;
}

.character-info {
    padding: 40px 20px 20px 20px;
    text-align: left;
    color: white;
}

.character-info h1 {
    margin: 10px 0;
    font-size: 24px;
    color: white;
}

.character-info p {
    margin: 5px 0;
    font-size: 16px;
    color: #ffffff;
}

.character-bio {
    width: 100%;
    padding: 20px;
    color: white;
}

.character-bio h2 {
    margin-bottom: 10px;
    font-size: 20px;
    color: white;
}

.character-bio p {
    font-size: 16px;
    color: white;
    line-height: 1.6;
}

@media (max-width: 600px) {
    .character-info h1 {
        font-size: 20px;
    }

    .character-info p,
    .character-bio p {
        font-size: 14px;
    }

    .character-bio h2 {
        font-size: 18px;
    }

    .author-image {
        display: none;
    }
}


.author-image__border {
    border-radius: 50%;
    overflow: hidden;
    width: 200px;
    height: 200px;
    border: 1px solid #ededed;
    margin: 10px auto;
    position: absolute;
    left: 60px;
    top: 480px;
}

.author-image__border img {

    max-width: 100%;
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
        min-width: 300px;
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

@media (max-width:760px) {
    .grid-container {
        display: grid;
        grid-template-columns: auto;
    }
}
</style>
