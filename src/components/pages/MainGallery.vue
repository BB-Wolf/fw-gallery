<script setup>
import Tags from '../organisms/Tags.vue';
import MainGallery from '../organisms/MainGallery.vue';

</script>

<template>
    <div>
        <Tags />
        <div class="gallery-container">
            <MainGallery galleryType="main" galleryTitle="Новое" />
        </div>
    </div>
</template>

<style scoped></style>