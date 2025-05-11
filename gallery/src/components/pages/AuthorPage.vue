<template>
    <div>
        <div class="author-hero">
            <Image></Image>
        </div>
        <div id="author-container">
            <div class="author-block">
                <div class="author-info">
                    <div class="author-image">
                        <div class="author-image__border">
                            <img :src="this.userProfile.avatar">
                        </div>
                    </div>
                    <div class="author-name">{{ this.userProfile.user }}</div>
                    <div class="author-reg">Дата регистрации: {{ this.userProfile.registerDate }}</div>
                </div>
                <div class="author-stats">
                    <div class="author-followers"> 0
                        <div class="label">подписчиков</div>
                    </div>
                    <div class="author-follows">0
                        <div class="label">подписок</div>
                    </div>
                    <div class="author-publishes"> {{ this.userProfile.totalImages }}
                        <div class="label">работ</div>
                    </div>
                </div>
                <div class="author-status">
                    <div class="block-label">Статус</div>
                    <ul>
                        <li>Коммишны</li>
                        <li>Трейды</li>
                        <li>Реквесты</li>
                        <li>Розыгрыши</li>
                    </ul>
                </div>
                <div class="author-rewards">
                    <div class="block-label">Награды</div>
                    <div class="reward-block"></div>
                </div>
                <div class="infoFields mb-20">
                    <div class="info-field" v-for="userField in JSON.parse(userProfile.fields)" :key="userField">
                        <span style="font-weight: 700;">{{ userField.label }} :</span>
                        <span>{{ userField.value }}</span>
                    </div>
                </div>
            </div>
            <div class="author-tabs">
                <TabsRoot default-value="tab1" orientation="horizontal">
                    <TabsList aria-label="tabs">
                        <TabsTrigger value="tab1" class="tab-button"
                            :class="[{ [mobileBtnClass]: userDevice.isMobile }]">
                            Последние работы
                        </TabsTrigger>
                        <TabsTrigger value="tab2" class="tab-button"
                            :class="[{ [mobileBtnClass]: userDevice.isMobile }]">
                            Все работы
                        </TabsTrigger>
                        <TabsTrigger value="tab3" class="tab-button"
                            :class="[{ [mobileBtnClass]: userDevice.isMobile }]">
                            Избранное
                        </TabsTrigger>
                        <TabsTrigger value="tab4" class="tab-button"
                            :class="[{ [mobileBtnClass]: userDevice.isMobile }]">
                            Страничка автора
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">
                        <div class="section" id="author-latest-folders">
                            <div class="h2">Разделы</div>
                            <!--<div class="image-grid">
                                <div class="image-item" v-for="galleryImage in newImages" v-bind:key="galleryImage.id">
                                    <a :href="galleryImage.link">
                                        <Image imageClass="slide" :imageSrc=galleryImage.picture
                                            :imageTitle="galleryImage.title + ' от ' + galleryImage.userName"
                                            imageAlt="">
                                        </Image>
                                    </a>
                                </div>
                            </div>-->
                        </div>
                        <div class="section" id="author-latest-images">
                            <div class="h2">Изображения основной галереи</div>
                            <div class="image-grid">
                                <div class="image-item" v-for="galleryImage in newImages" v-bind:key="galleryImage.id">
                                    <a :href="galleryImage.link">
                                        <Image imageClass="slide" :imageSrc=galleryImage.picture
                                            :imageTitle="galleryImage.title + ' от ' + galleryImage.userName"
                                            imageAlt="">
                                        </Image>
                                    </a>
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

                    </TabsContent>
                    <TabsContent value="tab2">
                        <div class="section" id="author-latest-images">
                            <div class="image-grid" v-infinite-scroll="onLoadMore">
                                <div class="image-item" v-for="galleryImage in newImages" v-bind:key="galleryImage.id">
                                    <a :href="galleryImage.link">
                                        <Image imageClass="slide" :imageSrc=galleryImage.picture
                                            :imageTitle="galleryImage.title + ' от ' + galleryImage.userName"
                                            imageAlt="">
                                        </Image>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                </TabsRoot>
            </div>
        </div>
    </div>
</template>
<style scoped>
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

header {
    opacity: 0 !important;
    display: none;
}

h1 {
    color: white
}

#author-container {
    max-width: 100%;
    padding: 0 20px;
    display: flex;
    margin: 0 auto;
    gap: 20px;
    flex-wrap: wrap;
}

.author-tabs {
    display: flex;
    margin-top: 20px;
    width: 70%;

}

.author-block {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 400px;
    width: 420px;
    margin-top: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    color: white;
    text-align: left;
}

.author-info {
    padding-left: 20px;
    padding-right: 20px;
}

.author-image__border {
    border-radius: 50%;
    overflow: hidden;
    width: 200px;
    height: 200px;
    border: 1px solid #ededed;
    margin: 10px auto;

}

.author-image__border img {

    max-width: 100%;
}

.author-stats {
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin: 20px auto;
}

.author-followers,
.author-follows,
.author-publishes {
    background: #efefef;
    width: 120px;
    height: 60px;
    text-align: center;
    color: black;
    border-radius: 10px 10px;
}

.author-status ul {
    padding-left: 80px;
    text-align: left;
    display: flex;
    flex-direction: column;
}

.author-status ul li {
    height: 80px;
    display: block;
}

.block-label {
    padding-left: 20px;
}


#author-latest-images {
    margin-top: 20px;
}

.author-name {
    text-align: center;
    font-weight: bold;
}

@media (max-width:768px) {
    .author-block {
        width: 100%;
    }

    .author-stats {
        flex-wrap: wrap;
    }

    .author-followers,
    .author-follows,
    .author-publishes {
        width: 100%;
    }


}

.infoFields {
    padding: 0 20px;
}
</style>

<script>
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'radix-vue'
import axios from 'axios';
import Image from '../atoms/Image.vue';
import { notifications, mobileDevice } from '@main/state';
import Seo from '@main/api/seo/Seo.js';

export default {
    components:
    {
        TabsContent,
        TabsRoot,
        TabsList,
        TabsTrigger,
        Image

    },
    methods: {
        onLoadMore() {
            window.onscroll = async () => {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                if (bottomOfWindow && !this.isFinish) {
                    // document.querySelector('.wait-container').classList.add('wait-container--active');
                    const getMore = await axios.get('//furry-world.ru/console/get_author_gallery_picture.php?offset=' + this.offset + '&user=' + this.userProfile.id);
                    if (getMore.data) {
                        if (getMore.data.length == 0) {
                            this.isFinish = true;
                        }
                        this.offset += 1;
                        var currentImages = this.newImages;
                        this.newImages = [...currentImages, ...getMore.data];
                        //        document.querySelector('.wait-container').classList.remove('wait-container--active');
                    }
                }
            }
        }
    },
    data() {
        return {
            newImages: null,
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
            userProfile: null,
            offset: 1,
            userDevice: mobileDevice,
            mobileBtnClass: 'btn btn--default'
        }
    },
    async created() {
        const userReq = await new axios.get('//furry-world.ru/console/get_author_info.php?user=' + this.$route.params.user);
        document.title = "Фурри Мир, Страничка художника " + this.$route.params.user;
        document.querySelector('meta[name="description"]').setAttribute("content", 'Художник, работы худржника, арты от ' + this.$route.params.user);

        if (userReq.data) {
            this.userProfile = userReq.data;
            const gallery = await new axios.get('//furry-world.ru/console/get_author_gallery_picture.php?offset=' + this.offset + '&user=' + this.userProfile.id,
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
                }
            );
            Seo.setPageSeo('Фурри Мир. Страничка художника ' + this.userProfile.user,
                'Страничка художника ' + this.userProfile.user + '. Здесь вы можете найти все работы художника, а также подписаться на него и следить за его работами.',
                this.userProfile.user,

            );
            Seo.setPageCanonical('https://furry-world.ru/author/' + this.userProfile.user + '/');
            if (gallery.data) {
                this.newImages = gallery.data;
            }
        }
    },
    async mounted() {

        this.onLoadMore();

    },

}

</script>