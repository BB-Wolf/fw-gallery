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


