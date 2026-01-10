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

@media (max-width:760px) {
    .posts-feed {
        grid-template-columns: repeat(2, minmax(150px, 1fr));
        gap: 16px;
    }
}

@media (min-width:761px) and (max-width:1200px) {
    .posts-feed {
        grid-template-columns: repeat(4, minmax(200px, 1fr));
        gap: 16px;
    }
}
</style>
