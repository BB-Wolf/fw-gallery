<template>
    <div class="image-detail-container">
        <div class="image-detail" v-if="imageData">

            <!-- Left Column (70%): Image Preview Section -->
            <div class="image-preview" style="flex-direction: column;">
                <img :src="imageData.imageLink" :title="imageData.imageTitle" :alt="imageData.imageTitle">
                <!-- More by Author Section -->
                <div class="more-by-author">
                    <h3>Случайные работы от {{ $route.params.user }}</h3>
                    <div class="artworks" v-if="imageData">
                        <div class="artwork-item" v-for="image in imageData.imageOther" :value="image.value"
                            :key="image.value">
                            <a :href="image.link">
                                <img :src=image.picture alt="">
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column (30%): Image Info Section -->
            <div class="image-info">
                <h2>{{ imageData.imageTitle }}</h2>
                <p v-html="imageData.imageDescription"></p>
                <!-- Meta Information (e.g., artist, year, dimensions) -->
                <div class="meta-info">
                    <span><strong>Автор:</strong> <a class="author-link" :href="'/author/' + imageData.imageAuthor">{{
                        $route.params.user }}</a></span>
                    <span><strong>Дата:</strong> {{ imageData.imagePostDate }}</span>
                    <span><strong>Разрешение:</strong> {{ imageData.imageDimension.width }}x{{
                        imageData.imageDimension.height }}
                    </span>
                    <span><strong>Раздел:</strong> {{ imageData.imageFolder }}</span>
                    <span><strong>Просмотров: </strong> {{ imageData.watches }}</span>
                    <span><strong>В избранном у: </strong> {{ imageData.likes }}</span>
                </div>

                <div class="palette">
                    <div class="h2  ">Палитра</div>
                    <ul>
                        <li class="palette__sample" v-for="palette in imageData.imageColors" :key="palette"
                            :style="{ backgroundColor: '#' + palette }">

                        </li>
                    </ul>
                </div>
                <!-- Tags Section -->
                <div class="tags">
                    <span v-for="tag in imageData.tags" :key="tag" @click="goToTag(tag.code)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16px"
                            height="16px">
                            <path
                                d="M21.41 11.58L12.42 2.59C12.24 2.42 12.02 2.3 11.77 2.23C11.53 2.16 11.27 2.13 11.01 2.13H5C3.9 2.13 3 3.03 3 4.13V10.13C3 10.39 3.03 10.65 3.11 10.89C3.18 11.13 3.3 11.36 3.47 11.54L12.46 20.53C13.05 21.12 13.98 21.12 14.58 20.53L21.41 13.71C22 13.12 22 12.18 21.41 11.58ZM7.5 7.13C6.67 7.13 6 6.46 6 5.63C6 4.8 6.67 4.13 7.5 4.13C8.33 4.13 9 4.8 9 5.63C9 6.46 8.33 7.13 7.5 7.13Z" />
                        </svg>
                        {{ tag.name }}</span>
                </div>

                <!-- Link to Original Size Image -->
                <div class="original-size">
                    <a :href="imageData.imageLink" target="_blank">Открыть оригинал</a>
                </div>
                <div class="form-group mt-20">
                    <div class="btn btn--default add-to-fav" v-show="!this.imageData.isFav" @click="addToFav">В
                        избранное
                    </div>
                    <div class="btn btn--update add-to-fav" v-show="this.imageData.isFav" @click="removeFav">Удалить
                        из
                        избранного</div>
                    <!--<div class="btn btn--info">Подписаться</div>-->
                </div>

                <!-- Comments Section -->
                <div class="comments-section">
                    <h3>Комментарии</h3>

                    <!-- Comments List -->
                    <div class="comments-list">
                        <div class="comment" v-for="comment in commentsData" :key="comment.id">
                            <div class="comment-author">{{ comment.author }} </div>
                            <div class="comment-text">{{ comment.time }}</div>
                            <div class="comment-text"></div>
                            <div class="comment-text"></div>
                            <div class="comment-text">{{ comment.text }}</div>
                        </div>

                    </div>
                    <!-- Comment Box -->
                    <div class="comment-box">
                        <textarea placeholder="Напишите комментарий..." rows="4" v-model="comment"></textarea>
                        <button type="submit" class="send-comment" @click="sendComment">Отправить сообщение</button>
                    </div>

                </div>
            </div> <!-- End of Right Column -->

        </div>
    </div>
</template>

<script>
import axios from 'axios';
import markdownit from 'markdown-it';
import 'vue-image-zoomer/dist/style.css';
import DetailImageApi from '@gallery/api/DetailImage.js';
import { notifications } from '@main/state';
export default
    {
        data() {
            return {
                imageData: null,
                moreData: null,
                commentsData: null,
                comment: null,
            }
        },
        async created() {
            let comments = await new axios.get('//furry-world.ru/console/get_image_comment.php?image=' + this.$route.params.image)
            if (comments.data) {
                this.commentsData = comments.data;
            }
        },
        mounted() {
            const md = markdownit();
            DetailImageApi.getDetailImage(this.$route.params.user, this.$route.params.image, localStorage.getItem("token")).then(
                data => {
                    console.log(data);
                    this.imageData = data.data;
                    this.imageData.imageDescription = md.renderInline(this.imageData.imageDescription);
                    document.title = this.imageData.imageTitle + ', ' + this.imageData.imageDescription;
                    let keywords = this.imageData.tags.map(function (elem) {
                        return elem.name;
                    }).join(",");
                    document.querySelector('meta[name="keywords"]').setAttribute("content", 'автор ' + this.imageData.imageAuthor + ', ' + keywords);
                    document.querySelector('meta[name="description"]').setAttribute("content", 'Автор: ' + this.imageData.imageAuthor + ' ' + this.imageData.imageDescription);
                }
            );

        },
        methods:
        {
            async sendComment() {
                let sendBtn = document.querySelector('.send-comment');
                sendBtn.disabled = true;
                sendBtn.style.backgroundColor = '#999';
                let formData = new FormData();
                formData.append('image', this.$route.params.image);
                formData.append('comment', this.comment);
                formData.append('user', localStorage.getItem('token'));

                let sendComment = await new axios.post('//furry-world.ru/console/post_image_comment.php', formData, {
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem('token')
                    }
                }
                )
                if (sendComment.data) {
                    //
                }

            },
            goToTag(code) {
                location.href = "/gallery/tags/" + code;
            },
            async addToFav() {
                let addImg = await new axios.get('//furry-world.ru/console/get_save_to_fav.php?id=' + this.imageData.imageID, {
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem('token')
                    }
                }
                );
                if (addImg.data) {
                    let favBtn = document.querySelector('.add-to-fav')
                    favBtn.innerHTML = 'Добавлено';
                    favBtn.classList.add('btn--success');
                    favBtn.classList.remove('btn--default');
                    //
                } else {
                    notifications.generateNotifications('bad', 'Ошибка добавления в избранное');
                }
            },
            async removeFav() {
                let removeImg = await new axios.get('//furry-world.ru/console/get_remove_fav.php?id=' + this.imageData.imageID,
                    {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem('token')
                        }
                    }
                );
                if (removeImg.data) {
                    let favBtn = document.querySelector('.add-to-fav')
                    favBtn.innerHTML = 'Добавлено';
                    favBtn.classList.add('btn--success');
                    favBtn.classList.remove('btn--default');
                    //
                } else {
                    notifications.generateNotifications('bad', 'Ошибка удаления из избранного');
                }
            }
        }
    }
</script>

<style scoped>
.palette ul {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: space-between;
}

.palette__sample {
    width: 80px;
    height: 80px;
    border: 2px solid white;
    border-radius: 5px;
}

.meta-info .author-link {
    color: white;
    font-weight: normal;
}

.form-group {
    display: flex;
    gap: 20px;
    justify-content: space-between;
}

.tags {
    align-content: center;
}

.tags span {
    cursor: pointer;
}
</style>