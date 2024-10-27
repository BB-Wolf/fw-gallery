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
                            <img :src=image alt="">

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
                    <span><strong>Автор:</strong> {{ $route.params.user }}</span>
                    <span><strong>Год:</strong> {{ imageData.imagePostDate }}</span>
                    <span><strong>Разрешение:</strong> {{ imageData.imageDimension.width }}x{{
                        imageData.imageDimension.height }}
                    </span>
                    <span><strong>Раздел:</strong> {{ imageData.imageFolder }}</span>
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
                <div class=" tags">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16px"
                            height="16px">
                            <path
                                d="M21.41 11.58L12.42 2.59C12.24 2.42 12.02 2.3 11.77 2.23C11.53 2.16 11.27 2.13 11.01 2.13H5C3.9 2.13 3 3.03 3 4.13V10.13C3 10.39 3.03 10.65 3.11 10.89C3.18 11.13 3.3 11.36 3.47 11.54L12.46 20.53C13.05 21.12 13.98 21.12 14.58 20.53L21.41 13.71C22 13.12 22 12.18 21.41 11.58ZM7.5 7.13C6.67 7.13 6 6.46 6 5.63C6 4.8 6.67 4.13 7.5 4.13C8.33 4.13 9 4.8 9 5.63C9 6.46 8.33 7.13 7.5 7.13Z" />
                        </svg>
                        Abstract</span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16px"
                            height="16px">
                            <path
                                d="M21.41 11.58L12.42 2.59C12.24 2.42 12.02 2.3 11.77 2.23C11.53 2.16 11.27 2.13 11.01 2.13H5C3.9 2.13 3 3.03 3 4.13V10.13C3 10.39 3.03 10.65 3.11 10.89C3.18 11.13 3.3 11.36 3.47 11.54L12.46 20.53C13.05 21.12 13.98 21.12 14.58 20.53L21.41 13.71C22 13.12 22 12.18 21.41 11.58ZM7.5 7.13C6.67 7.13 6 6.46 6 5.63C6 4.8 6.67 4.13 7.5 4.13C8.33 4.13 9 4.8 9 5.63C9 6.46 8.33 7.13 7.5 7.13Z" />
                        </svg>Modern Art</span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16px"
                            height="16px">
                            <path
                                d="M21.41 11.58L12.42 2.59C12.24 2.42 12.02 2.3 11.77 2.23C11.53 2.16 11.27 2.13 11.01 2.13H5C3.9 2.13 3 3.03 3 4.13V10.13C3 10.39 3.03 10.65 3.11 10.89C3.18 11.13 3.3 11.36 3.47 11.54L12.46 20.53C13.05 21.12 13.98 21.12 14.58 20.53L21.41 13.71C22 13.12 22 12.18 21.41 11.58ZM7.5 7.13C6.67 7.13 6 6.46 6 5.63C6 4.8 6.67 4.13 7.5 4.13C8.33 4.13 9 4.8 9 5.63C9 6.46 8.33 7.13 7.5 7.13Z" />
                        </svg>Colorful</span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16px"
                            height="16px">
                            <path
                                d="M21.41 11.58L12.42 2.59C12.24 2.42 12.02 2.3 11.77 2.23C11.53 2.16 11.27 2.13 11.01 2.13H5C3.9 2.13 3 3.03 3 4.13V10.13C3 10.39 3.03 10.65 3.11 10.89C3.18 11.13 3.3 11.36 3.47 11.54L12.46 20.53C13.05 21.12 13.98 21.12 14.58 20.53L21.41 13.71C22 13.12 22 12.18 21.41 11.58ZM7.5 7.13C6.67 7.13 6 6.46 6 5.63C6 4.8 6.67 4.13 7.5 4.13C8.33 4.13 9 4.8 9 5.63C9 6.46 8.33 7.13 7.5 7.13Z" />
                        </svg>Canvas</span>
                </div>

                <!-- Link to Original Size Image -->
                <div class="original-size">
                    <a :href="imageData.imageLink" target="_blank">Открыть оригинал</a>
                </div>

                <!-- Ratings Section -->
                <div class="ratings">
                    <label for="rating">Оцените конкурсную работу:</label>
                    <input type="radio" name="rating" value="1"> 1
                    <input type="radio" name="rating" value="2"> 2
                    <input type="radio" name="rating" value="3"> 3
                    <input type="radio" name="rating" value="4"> 4
                    <input type="radio" name="rating" value="5"> 5
                </div>

                <!-- Comments Section -->
                <div class="comments-section">
                    <h3>Комментарии</h3>

                    <!-- Comment Box -->
                    <div class="comment-box">
                        <textarea placeholder="Напишите комментарий..." rows="4"></textarea>
                        <button type="submit">Отправить сообщение</button>
                    </div>

                    <!-- Comments List -->
                    <div class="comments-list">
                        <div class="comment" v-for="comment in commentsData" :key="comment.id">
                            <div class="comment-author">{{ comment.author }}</div>
                            <div class="comment-text">{{ comment.text }}</div>
                        </div>

                    </div>
                </div>
            </div> <!-- End of Right Column -->

        </div>
    </div>
</template>

<script>
import axios from "axios";
import markdownit from 'markdown-it';
import { VueImageZoomer } from 'vue-image-zoomer'
import 'vue-image-zoomer/dist/style.css';

export default
    {
        data() {
            return {
                imageData: null,
                moreData: null,
                commentsData: null,
            }
        },
        async created() {
            const getImageData = await axios.get('//img-fw.bb-wolf.site/console/get_detail_image.php?user=' + this.$route.params.user + '&code=' + this.$route.params.image);
            const userTags = await axios.get(`//img-fw.bb-wolf.site/console/get_tags_user_list.php`);
            const md = markdownit();
            if (getImageData.data) {
                this.imageData = getImageData.data;
                this.imageData.imageDescription = md.renderInline(this.imageData.imageDescription);
                document.title = getImageData.data.imageTitle;
                console.log(this.imageData.imageColors);
            }

            if (userTags.data) {
                this.userTags = userTags.data;
            }
        },
        methods:
        {

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
</style>