<template>
    <section class="profile-posts">
        <PostsFeed v-if="posts.length" :posts="posts" />

        <div v-else class="posts-empty">
            <span class="h2">Автор пока молчит</span>
        </div>
    </section>
</template>

<script setup>
import { usePostsStore } from '@main/state';
import PostsFeed from '@gallery/components/organisms/Author/External/ExternalFeed.vue';

const postsStore = usePostsStore;
const posts = postsStore;
</script>
