<script setup>
import Tags from '@gallery/components/organisms/Tags.vue';
import NewGallery from '@gallery/components/organisms/NewGallery.vue';
</script>

<template>
    <div>
        <Tags />
        <div class="gallery-container">
            <NewGallery galleryTitle="Новое" />
        </div>
    </div>
</template>

