<template>
    <div class="section" id="latest-images">
        <div>
            <SearchBar></SearchBar>
        </div>
        <div class="gallery-wrapper">
            <UniversalGalleryBlock :galleryTitle="'Результаты поиска'" :galleryUrl="combinedSearchUrl"
                :showFav="true" />
        </div>
    </div>
</template>

<script>
import SearchBar from '../molecules/SearchBar.vue';
import UniversalGalleryBlock from '../organisms/UniversalGalleryBlock.vue';

export default {
    components: {
        SearchBar,
        UniversalGalleryBlock
    },
    computed: {
        combinedSearchUrl() {
            const q = this.$route.query.q || '';
            const filter = this.$route.query.filter || '[]';
            // Using absolute URL as in original code or relative if infrastructure allows
            // Original code used //furry-world.ru/console/search/get_items.php
            return `https://furry-world.ru/console/search/get_items.php?q=${encodeURIComponent(q)}&filter=${encodeURIComponent(filter)}`;
        }
    }
}
</script>
