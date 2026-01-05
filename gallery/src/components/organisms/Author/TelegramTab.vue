<template>
    <section class="profile-posts-preview">
        <ExternalTelegramPosts />
    </section>
</template>

<script setup>
import ExternalTelegramPosts from '@gallery/components/organisms/Author/External/ExternalPosts.vue';


function formatDate(date) {
    return new Date(date).toLocaleDateString('ru-RU');
}
</script>

<style scoped>
.profile-posts-preview {
    max-width: 720px;
    margin: 0 auto;
}

.posts-feed {
    display: grid;
    grid-template-columns: repeat(5, minmax(300px, 1fr));
    gap: 16px;
}

/* CARD */
.post-card {
    background: #1e1e1e;
    border-radius: 14px;
    padding: 16px;
    border: 1px solid #2a2a2a;
    transition: border-color 0.2s;
}

.post-card:hover {
    border-color: #3a3a3a;
}

/* META */
.post-meta {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #aaa;
    margin-bottom: 8px;
}

/* CONTENT */
.post-content {
    line-height: 1.6;
    white-space: pre-line;
    color: #e0e0e0;
}

/* MEDIA */
.post-media {
    margin-top: 12px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 8px;
}

.post-media img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 10px;
}
</style>
