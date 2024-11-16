<script setup>
import Hero from '../organisms/Hero.vue';
import RatedSlider from '../organisms/RatedSlider.vue';
import NewGallery from '../organisms/NewGallery.vue';
import Contest from '../organisms/Contest.vue';
import Pallette from '../organisms/Pallette.vue';
</script>
<script>
import { modalState, mobileDevice } from '../../state.js';
import RatedSliderMobile from '../organisms/RatedSliderMobile.vue';
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
        <Pallette></Pallette>
        <RatedSlider v-if="!mobileDevice.isMobile"></RatedSlider>
        <RatedSliderMobile v-if="mobileDevice.isMobile"></RatedSliderMobile>
        <div class="gallery-container">
            <NewGallery galleryUrl="/gallery/new/" galleryTitle="Новое" />
            <Contest></Contest>
            <NewGallery galleryUrl="gallery/top-rated/" galleryType="toprated"
                galleryTitle="Топ добавлений в избранное" />
        </div>
    </div>
</template>

<style scoped></style>