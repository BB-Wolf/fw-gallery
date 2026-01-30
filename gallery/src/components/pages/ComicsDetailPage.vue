<template>
    <div class="comic-container" v-if="this.currentPage">
        <!-- Comic Image -->
        <img :src="this.currentPage.imageLink" alt="Страница комикса" class="comic-image">

        <!-- Navigation -->
        <div class="navigation">
            <a :href="'/comics/' + this.currentPage.imageAuthor + '/' + this.currentPage.comicTitle + '/' + this.currentPage.prevpage.title + '/'"
                id="prev-slide" v-show="this.currentPage.prevpage">&laquo;
                Назад</a>
            <span id="page-info">Страница {{ this.currentPage.page }} из {{ this.currentPage.totalPages }}</span>
            <a :href="'/comics/' + this.currentPage.imageAuthor + '/' + this.currentPage.comicTitle + '/' + this.currentPage.nextpage.title + '/'"
                id="next-slide" v-if="this.currentPage.nextpage">Вперед
                &raquo;</a>
        </div>

        <!--
        <div class="comments-section">
            <h3>Комментарии</h3>
            
            <div class="comments-list">
                <div class="comment" v-for="comment in commentsData" :key="comment.id">
                    <div class="comment-author">{{ comment.author }}</div>
                    <div class="comment-text">{{ comment.text }}</div>
                </div>
            </div>

            <div class="comment-box">
                <textarea placeholder="Напишите комментарий..." rows="4" v-model="comment"></textarea>
                <button type="submit" class="send-comment" @click="sendComment">Отправить сообщение</button>
            </div>
        </div>-->
    </div>
</template>
<script>
import axios from "axios";
import Seo from '@main/api/seo/Seo.js';
import { notifications } from '@main/state';

export default {
    data() {
        return {
            totalPages: null,
            currentPage: null,
            currentPageNum: this.$route.params.page,
            comments: null,
            userComment: null
        }
    },
    async created() {
        let getComicsImage = await axios.get('//furry-world.ru/console/comics/get_comics_image.php?code=' + this.$route.params.name + '&page=' + this.$route.params.page)
        if (getComicsImage.data && typeof getComicsImage.data.status === 'undefined') {
            this.currentPage = getComicsImage.data;
            let pageTitle = 'Фурри Мир. Комикс ' + getComicsImage.data.comicName;
            Seo.setPageSeo(pageTitle,
                ' Комикс ' + getComicsImage.data.comicName + ' ' + getComicsImage.data.imageDescription + ' страница ' + this.$route.params.page,
                this.$route.params.author,
                '',
            );
            Seo.setPageCanonical('/comics/' + this.$route.params.author + '/' + this.$route.params.name + '/');


            let getComicsImageComments = await axios.get('//furry-world.ru/console/get_comics_comments.php?code=' + this.$route.params.name + '&page=' + this.$route.params.page);
            if (getComicsImageComments.data) {
                this.comments = getComicsImageComments.data;
            }
        } else {
            notifications.generateNotification('Ошибка', 'Ошибка загрузки данных');
        }
    },
    methods: {
        async sendComment() {
            let sendBtn = document.querySelector('.send-comment');
            sendBtn.disabled = true;
            sendBtn.style.backgroundColor = '#999';
            let formData = new FormData();
            formData.append('image', this.$route.params.image);
            formData.append('comment', this.comment);
            formData.append('user', localStorage.getItem('token'));

            let sendComment = await new axios.post('//furry-world.ru/console/post_comic_detail_comment.php', formData, {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token')
                }
            }
            )
            if (sendComment.data) {
                //
            }

        },
    }
}
</script>
