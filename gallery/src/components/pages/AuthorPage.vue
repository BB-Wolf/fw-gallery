<template>
    <div>
        <div id="author-container" v-if="this.userProfile">
            <div class="author-block">
                <div class="author-info">
                    <div class="author-image">
                        <div v-if="this.userProfile.avatar" class="author-image__border">
                            <img :src="this.userProfile.avatar">
                        </div>
                    </div>
                    <div class="author-name">{{ this.userProfile.user }}</div>
                    <div class="author-reg">Дата регистрации: {{ this.userProfile.registerDate }}</div>
                </div>
                <div class="author-stats">
                    <div class="author-followers"> {{ this.userProfile.totalSubscribers }}
                        <div class="label">подписаны</div>
                    </div>
                    <div class="author-follows"> {{ this.userProfile.totalSubs }}
                        <div class="label">подписок</div>
                    </div>
                    <div class="author-publishes"> {{ this.userProfile.totalImages }}
                        <div class="label">работ</div>
                    </div>
                </div>
                <div class="author-status">
                    <div class="block-label">Статус</div>
                    <ul>
                        <li><img class="paw paw--stop" :class="[{ ['paw--ready']: userComms == true }]"
                                src="@gallery/assets/icons/paw.svg">Коммишны</li>
                        <li><img class="paw paw--stop" :class="[{ ['paw--ready']: userTrades == true }]"
                                src="@gallery/assets/icons/paw.svg">Трейды</li>
                        <li><img class="paw paw--stop" :class="[{ ['paw--ready']: userRequests == true }]"
                                src="@gallery/assets/icons/paw.svg">Реквесты</li>
                        <li><img class="paw paw--stop" :class="[{ ['paw--ready']: userDrawNsfw == true }]"
                                src="@gallery/assets/icons/paw.svg">NSFW</li>
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
                <div v-if="!this.userProfile.subscribed && this.userProfile.subscribed != 'self'" @click="addToWatch"
                    class="btn btn--success mt-20 mb-20"
                    style="width: 80%; align-self: safe center; text-align:center;">Подписаться</div>
                <div v-if="this.userProfile.subscribed && this.userProfile.subscribed != 'self'"
                    @click="removeFromWatch" class="btn btn--alert mt-20 mb-20"
                    style="width: 80%; align-self: safe center; text-align:center;">
                    Отписаться</div>
            </div>
            <div class="author-tabs">
                <TabsRoot default-value="tab1" orientation="horizontal">
                    <TabsList aria-label="tabs example" class="tags">
                        <div class="tags-wrapper" style="">
                            <div class="tags-scroll">
                                <TabsTrigger value="tab1" class="tab-button"
                                    :class="[{ [mobileBtnClass]: userDevice.isMobile }]">
                                    Все работы
                                </TabsTrigger>
                                <TabsTrigger value="tab3" class="tab-button"
                                    :class="[{ [mobileBtnClass]: userDevice.isMobile }]">
                                    Избранное
                                </TabsTrigger>
                                <TabsTrigger value="tab4" class="tab-button"
                                    :class="[{ [mobileBtnClass]: userDevice.isMobile }]">
                                    Telegram
                                </TabsTrigger>
                            </div>
                        </div>
                    </TabsList>
                    <TabsContent value="tab1">
                        <div class="section" id="author-latest-images">
                            <div class="h2">Изображения основной галереи</div>
                            <div class="gallery-wrapper">
                                <masonry-wall v-if="newImages" :items="newImages" :min-columns="this.minColumns"
                                    :column-width="300" :gap="16">
                                    <template #default="{ item, index }">
                                        <div class="gallery-item">
                                            <div class="gallery-item__hover--top">
                                                <div class="fav-bookmark" @click="saveToFav($event.target, item.id)">
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
                                                <div class="gallery-item__author"><a :href="item.link">{{
                                                    item.title
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

                    </TabsContent>
                    <TabsContent value="tab4">
                        <TelegramTab :userId="this.userProfile.id" />
                    </TabsContent>
                </TabsRoot>
            </div>
        </div>
    </div>
</template>


<script>
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'radix-vue'
import axios from 'axios';
import Image from '../atoms/Image.vue';
import { notifications, mobileDevice } from '@main/state';
import Seo from '@main/api/seo/Seo.js';
import MasonryWall from '@yeger/vue-masonry-wall'
import TelegramTab from '../organisms/Author/TelegramTab.vue';

export default {
    components:
    {
        TabsContent,
        TabsRoot,
        TabsList,
        TabsTrigger,
        Image,
        TelegramTab,
        MasonryWall

    },
    methods: {
        async removeFromWatch() {
            let addUserToWatch = await new axios('//furry-world.ru/console/get_unwatch_user.php?id=' + this.userProfile.id, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            if (addUserToWatch.data) {
                notifications.generateNotification('Успех', 'Вы успешно отписались от уведомлений');
                this.userProfile.subscribed = false;
            } else {
                notifications.generateNotification('Ошибка', 'Что-то пошло не так');
            }
        },
        async addToWatch() {
            let addUserToWatch = await new axios('//furry-world.ru/console/get_watch_user.php?id=' + this.userProfile.id, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            if (addUserToWatch.data.status == 'success') {
                this.userProfile.subscribed = true;
                notifications.generateNotification('Успех', 'Вы успешно подписались на уведомления');
            } else {
                notifications.generateNotification('Ошибка', 'Что-то пошло не так');
            }
        },
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
            mobileBtnClass: 'btn btn--default',
            userStatus: null,
            userComms: false,
            userTrades: false,
            userRequests: false,
            userDrawNsfw: false,
            minColumns: 4,
        }
    },
    async created() {
        if (!mobileDevice) {
            this.minColumns = 4;
        } else {
            this.minColumns = 4;
            this.maxColumns = 0;
        }
        const userReq = await new axios.get('//furry-world.ru/console/get_author_info.php?user=' + this.$route.params.user,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token") ?? '',
                }
            }
        );

        if (userReq.data) {
            this.userProfile = userReq.data;
            this.userStatus = JSON.parse(userReq.data.status);
            if (this.userStatus && this.userStatus.types.length > 0) {
                for (let i = 0; i < this.userStatus.types.length; i++) {
                    if (this.userStatus.types[i] == 'comm') {
                        this.userComms = true;
                    } else if (this.userStatus.types[i] == 'trades') {
                        this.userTrades = true;
                    } else if (this.userStatus.types[i] == 'requests') {
                        this.userRequests = true;
                    } else if (this.userStatus.types[i] == 'nsfw') {
                        this.userDrawNsfw = true;
                    }
                }

            }
            const gallery = await new axios.get('//furry-world.ru/console/get_author_gallery_picture.php?offset=' + this.offset + '&user=' + this.userProfile.id,
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token") ?? '',
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