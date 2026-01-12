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


