<template>
    <section id="all-images-list" v-if="this.$route.params.name == 'all'">
        <div class="profile-container">
            <h2>Все изображения</h2>
        </div>
    </section>
    <section id="all-images-list" v-if="this.$route.params.name != 'all'">
        <div class="profile-container">
            <h2>Альбом {{ this.$route.params.name }}</h2>
        </div>
    </section>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            imagesList: []
        }
    },
    async created() {
        const imagesList = await new axios.get('//img-fw.bb-wolf.site/console/get_gallery_picture.php?user=y', {});
    }
}
</script>
<style scoped>
h2 {
    text-align: left;
    color: #fff;
    margin-bottom: 20px;
}

.profile-container {
    max-width: 100%;
    margin: 50px auto;
    background-color: #2b2b2b;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}
</style>