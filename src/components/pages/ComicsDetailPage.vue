<template>
    <div class="comic-container">
        <!-- Comic Image -->
        <img src="http://img-fw.bb-wolf.site/upload/uf/782/r1xykcg1p3e6nv183f1knj1s22fw2m2j.jpg" alt="Comic Page"
            class="comic-image">

        <!-- Navigation -->
        <div class="navigation">
            <a href="#" id="prev-slide">&laquo; Назад</a>
            <span id="page-info">Страница 1 из 10</span>
            <a href="#" id="next-slide">Вперед &raquo;</a>
        </div>

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
    </div>
</template>
<style scoped>
.comic-container {
    width: 100%;
    max-width: 1800px;
    margin: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    overflow: hidden;
    margin: 0 auto;
    padding: 20px;
}

.comic-image {
    width: 100%;
    display: block;
}

.navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #333;
    color: #fff;
}

.navigation a {
    text-decoration: none;
    color: #61dafb;
    font-size: 16px;
}

.navigation a:hover {
    text-decoration: underline;
}

@media (max-width: 600px) {
    .navigation a {
        font-size: 14px;
    }
}
</style>