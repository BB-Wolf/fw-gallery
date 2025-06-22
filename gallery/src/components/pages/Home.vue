<script setup>
import RatedSlider from '@gallery/components/organisms/RatedSlider.vue';
import Pallette from '@gallery/components/organisms/Pallette.vue';
import ComicsPreview from '@gallery/components/organisms/ComicsPreview.vue';
import ComicsPreviewMobile from '@gallery/components/organisms/ComicsPreviewMobile.vue';
</script>
<script>
import { modalState, mobileDevice } from '@main/state.js';
import RatedSliderMobile from '@gallery/components/organisms/RatedSliderMobile.vue';
import AuthorsOfWeek from '@gallery/components/organisms/AuthorsOfWeek.vue';
import AuthorsOfWeekMobile from '@gallery/components/organisms/AuthorsOfWeekMobile.vue';
import GalleryBlock from '@gallery/components/organisms/GalleryBlock.vue';
import Seo from '@main/api/seo/Seo.js';
import ArtOfDay from '@gallery/components/organisms/ArtOfADay.vue';

export default
    {
        methods:
        {
            closeModal() {
                modalState.isModalVisible = false;
            }
        },
        created() {
            Seo.setPageSeo('Фурри Мир. Арты, комиксы, галерея',
                'Здесь вы можете найти все работы художников, а также подписаться и следить за работами.',
                '',
            );
            Seo.setPageCanonical('https://furry-world.ru/gallery/');
        }

    }</script>

<template>
    <div @click="closeModal()">
        <!--        <Hero></Hero> -->
        <section id="palette-block">
            <Pallette></Pallette>
        </section>
        <RatedSlider class="section-container" v-if="!mobileDevice.isMobile"></RatedSlider>
        <RatedSliderMobile class="section-container" v-if="mobileDevice.isMobile"></RatedSliderMobile>
        <section id="authors-block" class="section-container">
            <AuthorsOfWeek v-if="!mobileDevice.isMobile"></AuthorsOfWeek>
            <AuthorsOfWeekMobile v-if="mobileDevice.isMobile"></AuthorsOfWeekMobile>
        </section>
        <section id="artofday" class="section-container">
            <ArtOfDay></ArtOfDay>
        </section>
        <section id="comics" style="margin-bottom: 0;" class="section-container">
            <ComicsPreview v-if="!mobileDevice.isMobile"></ComicsPreview>
            <ComicsPreviewMobile v-if="mobileDevice.isMobile"></ComicsPreviewMobile>
        </section>
        <div class="gallery-container">
            <GalleryBlock class="section-container" :needInfinity="false" galleryUrl="/main/"
                galleryTitle="Последние работы" />
        </div>
    </div>
</template>

<style scoped>
section {}

#palette-block {
    margin-top: 40px;
}

.section-container {
    max-width: 95%;
    margin: 50px auto;
    background-color: #2b2b2b;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}
</style>
