<script setup>
import Hero from '../organisms/Hero.vue';
</script>
<script>
import { modalState, mobileDevice } from '@main/state.js';
import Multiselect from '@vueform/multiselect';
import axios from 'axios';

export default
    {
        components: {
            Multiselect
        },
        data() {
            return {
                novelList: '',
                paginationData: false,
            }
        },
        methods:
        {
            async search() {
                let url = '//furry-world.ru/console/novel/get_novel_list_search.php?search=' + this.searchQuery; // Замените на ваш API
                let response = await new axios(url,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token'),
                        }
                    }
                ); // Замените на ваш API
                if (response.data && response.data.status != 'error') {
                    this.novelList = response.data.items;
                    this.paginationData = response.data.pagination;
                } else {
                    this.novelList = 'NF';
                }
            },
        },
        async mounted() {
            let url;
            if (this.$route.params.page == undefined) {
                url = '//furry-world.ru/console/novel/get_novel_list.php'; // Замените на ваш API
            } else {
                url = '//furry-world.ru/console/novel/get_novel_list.php?page=' + this.$route.params.page; // Замените на ваш API
            }
            let response = await new axios(url,
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    }
                }
            ); // Замените на ваш API
            if (response.data && response.data.status != 'error') {
                this.novelList = response.data.items;
                this.paginationData = response.data.pagination;
            } else {
                this.novelList = null;
            }
        },

    }</script>

<template>
    <main v-if="novelList != null && novelList != 'NF'" class="catalog">
        <div v-for="novel in novelList" :key="novel" class="novel-card" :style="'--i:' + novel.inc">
            <img class="novel-image" :src="novel.cover" alt="{{ novel.title }}">
            <div class="novel-content">
                <h2 class="novel-title">{{ novel.title }}</h2>
                <p class="novel-tags" v-show="novel.tags">{{ novel.tags }}</p>
                <p class="novel-genre" v-show="novel.genre">{{ novel.genre }}</p>
                <p class="novel-description" v-html="novel.description"></p>
                <a :href="'/novel/' + novel.author + '/' + novel.code + '/1/'" class="novel-link">Читать</a>
            </div>
        </div>
    </main>
    <div class="pagination" v-if="paginationData.totalPages > 1">
        <a :href="'/novel/' + paginationData.prevPage + '/'" v-if="paginationData.prevPage">&laquo;</a>
        <slot name="" v-for="page in paginationData.totalPages" :key="page">
            <a :href="'/novel/' + page + '/'" :class="{ 'active': paginationData.currentPage == page }"
                v-if="page <= parseInt(paginationData.currentPage) + 5">{{ page
                }}</a>
        </slot>

        <a :href="'/novel/' + paginationData.nextPage + '/'" v-if="paginationData.nextPage">&raquo;</a>
    </div>
    <main v-if="novelList == null" class="catalog">
        <section id="author-week" class="mt-20">
            <div class="portrait-container--empty" style="justify-content: unset;">
                <div class="portrait-options-noone">
                    <div class="portrait-dragon">
                        <img style="max-width: 200px;" src="@gallery/assets/images/drakon6.png">
                    </div>
                </div>
                <div class="portrait-container--empty" style="width:60%;justify-content: unset;">

                    <div>
                        <div class="h2" style="padding: 0;"> Увы, кажется произошла какая-то ошибка. </div>
                        <p class="mt-20">Возможно, что мы не смогли получить данные или же в библиотеке пока пусто.
                        </p>
                        <p class="">Но Вы можете помочь проекту оставив свои работы</p>

                    </div>
                </div>
            </div>
        </section>
    </main>
    <main v-if="novelList == 'NF'" class="catalog">
        <section id="author-week" class="mt-20">
            <div class="portrait-container--empty" style="justify-content: unset;">
                <div class="portrait-options-noone">
                    <div class="portrait-dragon">
                        <img style="max-width: 200px;" src="@gallery/assets/images/drakon6.png">
                    </div>
                </div>
                <div class="portrait-container--empty" style="width:60%;justify-content: unset;">

                    <div>
                        <div class="h2" style="padding: 0;"> Увы, кажется по Вашему запросу ничего не найдено </div>
                        <p class="mt-20">Попробуйте уточнить Ваш запрос.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <div class="section-container">
        <div class="h1">Поиск</div>
        <div class="search-block">
            <input type="text" v-model="searchQuery" placeholder="Поиск по названию или персонажам" />
            <a class="btn" @click="search">Поиск</a>
        </div>
    </div>
</template>

<style scoped>
section {
    color: white;
}

input[type="file"] {
    display: none;
}

.multiselect {
    color: black;
}

.catalog {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
    animation: fadeIn 2s ease forwards;
}

.novel-card {
    background-color: #292929;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    opacity: 0;
    transform: translateY(30px);
    animation: slideUp 1s ease forwards;
    animation-delay: calc(var(--i) * 0.2s);
}

.novel-card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.8);
}

.novel-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    object-position: 0px 0%;
}

@keyframes backgroundImageSlide {
    0% {
        object-positionn: 0px 0%;
    }

    50% {
        object-position: 0px 100%;
    }

    100% {
        object-position: 0px 0%;
    }

}

.novel-content {
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.novel-title {
    font-size: 1.3rem;
    margin: 0 0 0.5rem;
    color: #e0e0e0;
}

.novel-description {
    font-size: 0.95rem;
    color: #bfbfbf;
    flex-grow: 1;
    padding-top: 10px;
}

.novel-tags,
.novel-genre {
    font-size: 0.95rem;
    color: #bfbfbf;
    flex-grow: 1;
    color: #9a9a9a;
    text-decoration: underline;
}


.novel-link {
    margin-top: 1rem;
    display: inline-block;
    background-color: #444;
    color: #f0f0f0;
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    text-decoration: none;
    text-align: center;
    transition: background-color 0.3s;
}

.novel-link:hover {
    background-color: #666;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 600px) {
    header {
        font-size: 1.6rem;
    }
}

#author-week {
    padding-left: 20px;
    padding-right: 20px;
}

.portrait-container,
.portrait-container--empty {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 10px;
}

.portrait-container--empty {
    margin: 40px 0px 0px 0px;
}

.portrait-card {
    color: white;
    text-align: center;
}

.portrait-border {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    box-shadow: 0px 0px 1px 5px rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    overflow: hidden;

}

.portrait-border img {
    max-width: 100%;
}

.portrait-card-author {
    padding-top: 10px;
    font-weight: bold;
}

.pagination {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.pagination a {
    color: #fff;
    background-color: #333;
    padding: 0.6rem 1rem;
    text-decoration: none;
    border-radius: 6px;
    transition: background-color 0.3s;
}

.pagination .active {
    font-weight: bold;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>
