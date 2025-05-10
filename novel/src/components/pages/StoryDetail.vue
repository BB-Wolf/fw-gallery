<script>
import axios from 'axios';

export default
    {
        data() {
            return {
                novelTitle: '',
                nextPage: null,
                prevPage: null,
                novelText: '',
                novelChars: '',
                novelGenre: '',
                novelTags: '',
            }
        },
        async created() {
            let novelData = await new axios('//furry-world.ru/console/novel/get_novel.php?code=' + this.$route.params.name + '&page=' + this.$route.params.page);
            if (novelData.data) {
                this.novelTitle = novelData.data.title;
                this.novelGenre = novelData.data.genre;
                this.novelTags = novelData.data.tags;
                this.novelText = novelData.data.text;
                this.nextPage = novelData.data.next;
                this.prevPage = novelData.data.prev;
                this.novelChars = novelData.data.characters;
            }
        },
    }
</script>
<template>
    <div class="content">
        <div class="story-title">{{ novelTitle }}</div>
        <div class="story-block section-container" v-if="this.$route.params.page == 1">
            <div class="story-chars">
                <span class="">Персонажи: </span>
                <span class="">{{ novelChars }}</span>
            </div>
            <div class="story-genre">
                <span class="">Жанр: </span>
                {{ novelGenre }}
            </div>
            <div class="story-tags">
                <span class="">Теги: </span>
                <span class="">{{ novelTags }}</span>
            </div>

        </div>

        <div class="story-text" v-html="novelText"></div>
    </div>
    <div class="pagination">
        <a v-if="this.prevPage"
            :href="'/novel/' + this.$route.params.author + '/' + this.$route.params.name + '/' + this.prevPage + '/'">&laquo;
            Назад</a>
        <a v-if="this.title" href="#" class="current">{{ this.$route.params.page }}</a>
        <a v-if="this.nextPage"
            :href="'/novel/' + this.$route.params.author + '/' + this.$route.params.name + '/' + this.nextPage + '/'">Вперёд
            &raquo;</a>
    </div>
</template>

<style scoped>
.content {
    max-width: 1800px;
    margin: 40px auto;
    padding: 20px;
    background-color: #2a2a2a;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}

.story-title {
    font-size: 2em;
    margin-bottom: 20px;
    color: #ffffff;
    text-align: center;
}

.story-text {
    font-size: 1.1em;
    margin-bottom: 40px;
    white-space: pre-wrap;
    color: rgb(208, 208, 208);
}

.story-block {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    gap: 10px;
    justify-content: space-between;
    flex-wrap: wrap;

}

.story-chars,
.story-chars a {
    font-size: 1.1em;
    margin-bottom: 20px;
    color: #e0e0e0;

}

.pagination {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.pagination a {
    padding: 10px 15px;
    background-color: #3a3a3a;
    color: #e0e0e0;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.pagination a:hover {
    background-color: #505050;
}

.pagination .current {
    background-color: #666;
    cursor: default;
}

footer {
    margin-top: 40px;
    text-align: center;
    font-size: 0.9em;
    color: #777;
}

@media (max-width: 600px) {
    .story-title {
        font-size: 1.5em;
    }

    .story-text {
        font-size: 1em;
    }
}
</style>