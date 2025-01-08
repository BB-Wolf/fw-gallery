<script setup>
import Hero from '../organisms/Hero.vue';
import RatedSlider from '../organisms/RatedSlider.vue';
import NewGallery from '../organisms/NewGallery.vue';
import Contest from '../organisms/Contest.vue';
import Pallette from '../organisms/Pallette.vue';
import ComicsPreview from '../organisms/ComicsPreview.vue';
import ComicsPreviewMobile from '../organisms/ComicsPreviewMobile.vue';
</script>
<script>
import { modalState, mobileDevice } from '../../state.js';
import RatedSliderMobile from '../organisms/RatedSliderMobile.vue';
import AuthorsOfWeek from '../organisms/AuthorsOfWeek.vue';
import AuthorsOfWeekMobile from '../organisms/AuthorsOfWeekMobile.vue';
import GalleryBlock from '../organisms/GalleryBlock.vue';
export default
    {
        methods:
        {
            closeModal() {
                modalState.isModalVisible = false;
            }
        }

    }</script>

<template>
    <div @click="closeModal()">
        <Hero></Hero>
        <section id="authors-block" class="section-container">
            <AuthorsOfWeek v-if="!mobileDevice.isMobile"></AuthorsOfWeek>
        </section>
        <section id="palette-block"  class="section-container">
            <Pallette></Pallette>
            <RatedSlider v-if="!mobileDevice.isMobile"></RatedSlider>
            <RatedSliderMobile v-if="mobileDevice.isMobile"></RatedSliderMobile>
        </section>
        <section id="comics" style="margin-bottom: 0;"  class="section-container">
            <ComicsPreview v-if="!mobileDevice.isMobile"></ComicsPreview>
            <ComicsPreviewMobile v-if="mobileDevice.isMobile"></ComicsPreviewMobile>
        </section>
        <div class="gallery-container">
            <GalleryBlock  class="section-container" :needInfinity="false" galleryUrl="/gallery/new/" galleryTitle="Новые работы" />
            <GalleryBlock  class="section-container" galleryUrl="gallery/top-rated/" galleryType="toprated"
                galleryTitle="Топ добавлений в избранное" />
        </div>
    </div>
</template>

<style scoped>
section {
    margin-bottom: 80px;
}

.section-container{

    max-width: 100%;
    margin: 50px auto;
    background-color: #2b2b2b;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}
</style>