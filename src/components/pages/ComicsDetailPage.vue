<template>
<div class="detailpage-container">
    <div class="detailpage-item">
        <div class="detailpage-item-header">
            <div class="h2">Комикс Тест, стр. {{this.$route.params.page }}</div>
        </div>
        <div class="detailpage-item-body"></div>
        <div class="detailpage-item-footer">
                <div class="comicdetail-release">01.01.10</div>
                <div class="comicdetail-pages">1/20</div>
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

    </div>
</div>
</template>
<style scoped>
.detailpage-container{
max-width: 100%;
    margin: 50px auto;
    background-color: #2b2b2b;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}
</style>