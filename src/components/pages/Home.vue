<script setup>
import Hero from '../organisms/Hero.vue';
import RatedSlider from '../organisms/RatedSlider.vue';
import NewGallery from '../organisms/NewGallery.vue';
import Contest from '../organisms/Contest.vue';
import Pallette from '../organisms/Pallette.vue';
</script>
<script>
import { modalState } from '../../state.js';
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
        <RatedSlider></RatedSlider>
        <div class="gallery-container">
            <NewGallery galleryUrl="/gallery/new/" galleryTitle="Новое" />
            <Contest></Contest>
            <NewGallery galleryUrl="gallery/top-rated/" galleryType="toprated"
                galleryTitle="Топ добавлений в избранное" />
        </div>
    </div>
</template>

<style scoped></style>