<script setup>
import Tags from '../organisms/Tags.vue';
import TagGallery from '../organisms/TagGallery.vue';

</script>

<template>
    <div>
        <Tags />
        <div class="gallery-container">
            <TagGallery galleryType="main" :galleryTitle="'Фильтр по тегу ' + $route.params.filter"
                :galleryTag="$route.params.filter" />
        </div>
    </div>
</template>

<style scoped></style>