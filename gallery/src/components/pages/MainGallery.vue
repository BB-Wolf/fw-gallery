<script setup>
import Tags from '../organisms/Tags.vue';
import AdoptsBlock from '../organisms/AdoptsBlock.vue';
import MasonryGalleryInfinite from '../organisms/MasonryGalleryInfinite.vue';
import UniversalGalleryBlock from '../organisms/UniversalGalleryBlock.vue';

</script>
<script>
export default {
    data() {
        return {
            currentState: localStorage.getItem('galleryMode')
        }
    },
    created() {
        if (this.currentState == '' || this.currentState == null) {
            this.currentState = 'gallery';
        }
        document.title = "Фурри Мир, Галерея новых работ";

    },
    methods:
    {
        switchGallery(state, e) {
            if (this.currentState !== state) {
                this.currentState = state;
                let switchButtons = document.querySelectorAll('.switch-item');
                for (let i = 0; i < switchButtons.length; i++) {
                    if (switchButtons[i].classList.contains('switch-item--active')) {
                        switchButtons[i].classList.remove('switch-item--active');
                    }
                }
                e.target.classList.add('switch-item--active');
                localStorage.setItem('galleryMode', state);
            }
        }
    }
}
</script>

<template>
    <div>
        <Tags />
        <div class="gallery-switch">
            <div class="tags-wrapper">
                <div class="tags-scroll">
                    <div class="switch-item" :class="[{ ['switch-item--active']: currentState == 'gallery' }]"
                        @click="switchGallery('gallery', $event)">Арты</div>
                    <div class="switch-item" :class="[{ ['switch-item--active']: currentState == 'comics' }]"
                        @click="switchGallery('comics', $event)">Комиксы</div>
                    <div class="switch-item" :class="[{ ['switch-item--active']: currentState == 'trades' }]"
                        @click="switchGallery('trades', $event)">Трейды</div>
                    <div class="switch-item" :class="[{ ['switch-item--active']: currentState == 'ych' }]"
                        @click="switchGallery('ych', $event)">YCH</div>
                    <div class="switch-item" :class="[{ ['switch-item--active']: currentState == 'adopts' }]"
                        @click="switchGallery('adopts', $event)">Адопты</div>
                    <div class="switch-item" :class="[{ ['switch-item--active']: currentState == 'chars' }]"
                        @click="switchGallery('chars', $event)">Персонажи</div>
                </div>
            </div>
        </div>
        <div class="gallery-container" id="main-gallery">
            <MasonryGalleryInfinite v-if="currentState == 'gallery'" needInfinty="y" galleryType="main"
                galleryTitle="Новые работы художников" />
            <UniversalGalleryBlock galleryUrl="https://furry-world.ru/console/comics/get_comics_list.php"
                v-if="currentState == 'comics'" needInfinty="y" galleryType="main"
                galleryTitle="Новые и обновления в комиксах" />
            <UniversalGalleryBlock galleryUrl="https://furry-world.ru/console/characters/get_characters_list.php"
                v-if="currentState == 'chars'" needInfinty="y" galleryType="main" galleryTitle="Персонажи" />
            <UniversalGalleryBlock galleryUrl="https://furry-world.ru/console/trades/get_trades_list.php"
                v-if="currentState == 'trades'" needInfinty="y" galleryType="main" galleryTitle="Трейды" />
            <UniversalGalleryBlock galleryUrl="https://furry-world.ru/console/ych/get_ych_list.php"
                v-if="currentState == 'ych'" needInfinty="y" galleryType="main" galleryTitle="YCH" />
            <UniversalGalleryBlock galleryUrl="https://furry-world.ru/console/adopts/get_adopts_list.php"
                v-if="currentState == 'adopts'" needInfinty="y" galleryType="main" galleryTitle="Адопты" />
        </div>
    </div>
</template>
