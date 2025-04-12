<script setup>
import Tags from '../organisms/Tags.vue';
import TagGallery from '../organisms/TagGallery.vue';

</script>

<template>
    <div>
        <Tags />
        <div class="gallery-container">
            <TagGallery galleryType="main" :galleryTitle="'Тег '+this.$route.params.tag" />
        </div>
    </div>
</template>

<style scoped></style>