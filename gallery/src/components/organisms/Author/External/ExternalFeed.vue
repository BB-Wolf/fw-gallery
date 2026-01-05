<template>
    <div class="posts-feed">
        <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
</template>

<script setup>
import PostCard from './ExternalCard.vue';
defineProps({
    posts: {
        type: Array,
        required: true
    }
});
</script>

<style scoped>
.posts-feed {
    display: grid;
    grid-template-columns: repeat(5, minmax(300px, 1fr));
    gap: 16px;
}
</style>
