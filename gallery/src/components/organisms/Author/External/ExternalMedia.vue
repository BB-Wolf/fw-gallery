<template>
    <div class="post-media">
        <img v-for="item in media" :key="item.url" :src="item.url" loading="lazy" />
    </div>
</template>

<script setup>
defineProps({
    media: Array
});
</script>

<style scoped>
.post-media {
    margin-top: 12px;
    display: grid;
    gap: 8px;
}

.post-media img {
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
}
</style>
