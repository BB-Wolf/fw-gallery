<script setup>
import Tags from '../organisms/Tags.vue';
import GalleryBlock from '../organisms/GalleryBlock.vue';

</script>

<template>
    <div>
        <Tags />
        <div class="gallery-container" id="main-gallery">
            <GalleryBlock needInfinty="y" galleryType="main" galleryTitle="Новое" />
        </div>
    </div>
</template>

<style scoped>
</style>