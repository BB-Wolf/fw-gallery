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
            }
        },
        async mounted() {
            let response = await new axios('//furry-world.ru/console/novel/get_novel_list.php'); // Замените на ваш API
            if (response.data && response.data.status != 'error') {
                this.novelList = response.data;
            } else {
                //console.error('Ошибка получения данных:', response.statusText);
            }
        },

    }</script>

<template>
    <main v-if="novelList != null" class="catalog">
        <div v-for="novel in novelList" :key="novel" class="novel-card" style="--i: 1;">
            <img class="novel-image" :src="novel.cover" alt="{{ novel.title }}">
            <div class="novel-content">
                <h2 class="novel-title">{{ novel.title }}</h2>
                <p class="novel-description" v-html="novel.description"></p>
                <a :href="'/novel/' + novel.author + '/' + novel.code + '/1/'" class="novel-link">Читать</a>
            </div>
        </div>
    </main>
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
                        <p class="mt-20">Возможно, что мы не смогли получить данные или же в библиотеке пока пусто.</p>
                        <p class="">Но Вы можете помочь проекту оставив свои работы</p>

                    </div>
                </div>
            </div>
        </section>
    </main>
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
    height: 200px;
    object-fit: cover;
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
    color: #b0b0b0;
    flex-grow: 1;
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
</style>

<style src="@vueform/multiselect/themes/default.css"></style>
