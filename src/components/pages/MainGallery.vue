<script setup>
import Tags from '../organisms/Tags.vue';
import GalleryBlock from '../organisms/GalleryBlock.vue';
import ComicBlock from '../organisms/ComicBlock.vue';

</script>
<script>
export default {
    data() {
        return {
            currentState: localStorage.getItem('galleryMode')
        }
    },
    created() {
        // console.log(this.currentState);
        // if (this.currentState == '' || this.currentState == null) {
        //     this.currentState = 'gallery';
        // }
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
            <div class="switch-item" :class="[{ ['switch-item--active']: this.currentState == 'gallery' }]"
                @click="switchGallery('gallery', $event)">Арты</div>
            <div class="switch-item" :class="[{ ['switch-item--active']: this.currentState == 'comics' }]"
                @click="switchGallery('comics', $event)">Комиксы</div>
        </div>
        <div class="gallery-container" id="main-gallery">
            <GalleryBlock v-if="currentState == 'gallery'" needInfinty="y" galleryType="main"
                galleryTitle="Новые работы художников" />
            <ComicBlock v-if="currentState == 'comics'" needInfinty="y" galleryType="main"
                galleryTitle="Новые и обновления в комиксах" />
        </div>
    </div>
</template>

<style scoped>
.gallery-switch {
    color: white;
    display: flex;
    gap: 10px;
    justify-content: space-evenly;
    padding: 0 15px;
}

.switch-item {
    width: 100%;
    box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.5);
    height: 40px;
    text-align: center;
    color: black;
    background-color: #4d4d4d;
    align-content: center;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: #f0f0f0;
        cursor: pointer;
        ;
    }
}

.switch-item--active {
    background-color: #d3d3d3;
}
</style>