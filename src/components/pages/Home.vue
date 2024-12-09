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
        <section id="authors-block">
            <AuthorsOfWeek v-if="!mobileDevice.isMobile"></AuthorsOfWeek>
        </section>
        <section id="palette-block">
            <Pallette></Pallette>
            <RatedSlider v-if="!mobileDevice.isMobile"></RatedSlider>
            <RatedSliderMobile v-if="mobileDevice.isMobile"></RatedSliderMobile>
        </section>
        <section id="comics" style="margin-bottom: 0;">
            <ComicsPreview v-if="!mobileDevice.isMobile"></ComicsPreview>
            <ComicsPreviewMobile v-if="mobileDevice.isMobile"></ComicsPreviewMobile>
        </section>
        <div class="gallery-container">
            <NewGallery galleryUrl="/gallery/new/" galleryTitle="Новые работы" />
            <Contest></Contest>
            <NewGallery galleryUrl="gallery/top-rated/" galleryType="toprated"
                galleryTitle="Топ добавлений в избранное" />
        </div>
    </div>
</template>

<style scoped>
section {
    margin-bottom: 80px;
}
</style>