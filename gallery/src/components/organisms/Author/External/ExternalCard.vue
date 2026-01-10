<template>
    <article class="post-card">
        <PostMeta :date="post.published_at" :pinned="post.is_pinned" />
        <PostMedia v-if="post.media?.length" :media="post.media" />
        <div class="post-content" v-html="post.content"></div>
    </article>
</template>

<script setup>
import PostMeta from './ExternalMeta.vue';
import PostMedia from './ExternalMedia.vue';

defineProps({
    post: Object
});
</script>

<style scoped>
.post-card {
    background: #1e1e1e;
    border-radius: 12px;
    padding: 16px;
    border: 1px solid #2a2a2a;
}

.post-content {
    margin-top: 8px;
    line-height: 1.6;
    white-space: pre-line;
    color: white;
}
</style>
